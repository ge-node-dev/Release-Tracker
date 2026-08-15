#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CATALOG_DUMP = join(ROOT, 'supabase', 'seeds', 'catalog_data.sql');
// Not npx: execFileSync can't launch a .cmd shim, and a shell would expose the password in argv.
const SUPABASE_BIN = join(
   ROOT,
   'node_modules',
   'supabase',
   'bin',
   process.platform === 'win32' ? 'supabase.exe' : 'supabase',
);

const CATALOG_TABLES = [
   'artists',
   'genres',
   'release_artists',
   'release_genres',
   'release_tracks',
   'releases',
   'track_artists',
   'tracks',
];

const USER_TABLES = ['comments', 'profiles', 'release_ratings', 'user_activity'];

// execFileSync puts the full argv in error.message, which would print the DB password on failure.
const run = (command, args, label) => {
   try {
      execFileSync(command, args, { cwd: ROOT, stdio: 'inherit' });
   } catch {
      throw new Error(`${label} failed — see the CLI output above.`);
   }
};

// Dashboard passwords are pasted raw, and unescaped @ ? # % = break the URL parser. Only a URL that
// fails to parse gets encoded — a parseable one is passed through, so a raw password that happens to
// contain a valid escape (p%20x) still reaches the driver decoded, exactly as psql would read it.
const encodePassword = (url) => {
   try {
      new URL(url);
      return url;
   } catch {
      // Not parseable — fall through and encode.
   }

   const match = url.match(/^(postgres(?:ql)?:\/\/[^:/@]+:)(.*)(@[^@]+)$/);

   return match ? `${match[1]}${encodeURIComponent(match[2])}${match[3]}` : url;
};

const readProdUrl = () => {
   const envPath = join(ROOT, '.env.local');

   if (!existsSync(envPath)) {
      throw new Error('.env.local not found — copy .env.example and fill in the prod credentials.');
   }

   const match = readFileSync(envPath, 'utf8').match(/^[ \t]*SUPABASE_DB_URL[ \t]*=[ \t]*(.*)$/m);
   const value = (match?.[1] ?? '').trim().replace(/^["']|["']$/g, '');

   if (!value) {
      throw new Error(
         'SUPABASE_DB_URL is empty or missing in .env.local. Copy it from Supabase Dashboard -> Project Settings -> Database -> Connection string (URI).',
      );
   }

   if (!/^postgres(ql)?:\/\//.test(value)) {
      throw new Error('SUPABASE_DB_URL must be a postgresql:// connection string.');
   }

   return encodePassword(value);
};

const dumpCatalog = (dbUrl) => {
   mkdirSync(dirname(CATALOG_DUMP), { recursive: true });

   const excludes = USER_TABLES.flatMap((table) => ['-x', `public.${table}`]);

   console.log(`Dumping catalog tables from prod (${CATALOG_TABLES.length} tables, user tables excluded)...`);

   // Never --use-copy: the seeder parses the file as statements and chokes on COPY ... FROM stdin.
   run(
      SUPABASE_BIN,
      ['db', 'dump', '--db-url', dbUrl, '--data-only', '--schema', 'public', ...excludes, '-f', CATALOG_DUMP],
      'supabase db dump',
   );
};

// pg_dump quotes identifiers as "public"."releases", so this must tolerate the quotes.
const dumpedTables = (dump) => [
   ...new Set([...dump.matchAll(/INSERT INTO "?public"?\."?([a-z_]+)"?/gi)].map(([, table]) => table.toLowerCase())),
];

// pg_dump has already written the file by this point, so anything unexpected must be deleted, not
// just reported. Checking the dump itself rather than USER_TABLES means a user-data table added by a
// future migration is caught here instead of silently landing on every developer's laptop.
const assertDumpIsUsable = () => {
   const tables = dumpedTables(readFileSync(CATALOG_DUMP, 'utf8'));
   const unexpected = tables.filter((table) => !CATALOG_TABLES.includes(table));

   const reason = unexpected.length
      ? `Dump contained non-catalog tables (${unexpected.join(', ')})`
      : tables.includes('releases')
        ? null
        : 'Dump has no releases — prod may be empty or unreachable';

   if (reason) {
      rmSync(CATALOG_DUMP, { force: true });
      throw new Error(`${reason}; the file has been deleted and the local DB left untouched.`);
   }
};

try {
   if (!existsSync(SUPABASE_BIN)) {
      throw new Error(`Supabase CLI not found at ${SUPABASE_BIN}. Run yarn install first.`);
   }

   const dbUrl = readProdUrl();

   dumpCatalog(dbUrl);
   assertDumpIsUsable();

   console.log('Resetting local database (migrations + seed)...');
   run(SUPABASE_BIN, ['db', 'reset'], 'supabase db reset');

   console.log('\nLocal database now matches prod schema with prod catalog data and synthetic users.');
} catch (error) {
   console.error(`\ndb:sync failed — ${error.message}`);
   process.exit(1);
}
