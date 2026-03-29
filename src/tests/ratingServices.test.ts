/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';

import { createSupabaseStaticClient } from '@/lib/supabase/client';
import { RELEASE_BY_EXTERNAL_KEY_QUERY } from '@/modules/releaseByExternalKey/services/query';

interface TestFixtures {
   profileId: string;
   releaseId: string;
}

interface TestResult {
   name: string;
   error?: string;
   passed: boolean;
   duration: number;
}

const TEST_EMAIL = `rating_test_${Date.now()}@test.local`;
const TEST_PASSWORD = 'RatingTestPassword123!';

const supabase = createSupabaseStaticClient();

const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
   auth: { persistSession: false, autoRefreshToken: false },
});

let fixtures: null | TestFixtures = null;

const runTest = async (name: string, testFn: () => Promise<void>): Promise<TestResult> => {
   const startTime = performance.now();
   try {
      await testFn();
      const duration = performance.now() - startTime;
      return { name, duration, passed: true };
   } catch (error) {
      const duration = performance.now() - startTime;
      return {
         name,
         duration,
         passed: false,
         error: error instanceof Error ? error.message : String(error),
      };
   }
};

const createTestProfile = async (): Promise<string> => {
   const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: TEST_EMAIL,
      email_confirm: true,
      password: TEST_PASSWORD,
   });

   if (error || !data.user) {
      throw new Error(`createUser failed: ${error?.message ?? 'no user'}`);
   }

   const username = `rating_u_${Date.now()}`;

   const { error: profileError } = await supabaseAdmin.from('profiles').update({ username }).eq('id', data.user.id);

   if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(data.user.id);
      throw new Error(`profile username update failed: ${profileError.message}`);
   }

   return data.user.id;
};

const loadReleaseId = async (): Promise<string> => {
   const { data: release, error: releaseError } = await supabaseAdmin
      .from('releases')
      .select('id')
      .limit(1)
      .maybeSingle();

   if (releaseError || !release) {
      throw new Error(`Need at least one release in DB: ${releaseError?.message ?? 'no row'}`);
   }

   return release.id;
};

const deleteTestRating = async () => {
   if (!fixtures) return;
   await supabaseAdmin
      .from('release_ratings')
      .delete()
      .eq('user_id', fixtures.profileId)
      .eq('release_id', fixtures.releaseId);
};

const cleanupTestProfile = async (profileId: string) => {
   await supabaseAdmin.from('release_ratings').delete().eq('user_id', profileId);
   const { error } = await supabaseAdmin.auth.admin.deleteUser(profileId);
   if (error) {
      console.error(`   ⚠️  Failed to delete test auth user: ${error.message}`);
   }
};

const testReleaseByExternalKeyQueryIncludesReleaseRatings = async () => {
   const { data, error } = await supabase.from('releases').select(RELEASE_BY_EXTERNAL_KEY_QUERY).limit(1).maybeSingle();

   if (error) {
      throw new Error(`RELEASE_BY_EXTERNAL_KEY_QUERY failed: ${error.message}`);
   }

   if (!data) {
      throw new Error('No release row to validate release_ratings shape');
   }

   if (!('release_ratings' in data) || !Array.isArray(data.release_ratings)) {
      throw new Error('Expected nested release_ratings array on release');
   }

   const first = data.release_ratings[0];
   if (first !== undefined && (typeof first.id !== 'string' || typeof first.rating !== 'number')) {
      throw new Error('release_ratings entries should have id and rating');
   }
};

const testAnonCanSelectReleaseRatings = async () => {
   const { error } = await supabase.from('release_ratings').select('id, rating').limit(1);

   if (error) {
      throw new Error(`Public read on release_ratings failed: ${error.message}`);
   }
};

const testRpcCooldownNoRowAllowsRate = async () => {
   if (!fixtures) throw new Error('Fixtures not loaded');

   await deleteTestRating();

   const { data, error } = await supabaseAdmin.rpc('check_rating_cooldown', {
      p_user_id: fixtures.profileId,
      p_release_id: fixtures.releaseId,
   });

   if (error) {
      throw new Error(`check_rating_cooldown RPC failed: ${error.message}`);
   }

   if (!data?.length) {
      throw new Error('Expected RPC to return one row');
   }

   const row = data[0] as { can_rate: boolean; last_rated_at: null | string; cooldown_until: null | string };

   if (!row.can_rate) {
      throw new Error('Expected can_rate true when user has not rated this release');
   }

   if (row.last_rated_at !== null) {
      throw new Error('Expected last_rated_at null when no rating row exists');
   }
};

const testRpcCooldownBlocksWithin24Hours = async () => {
   if (!fixtures) throw new Error('Fixtures not loaded');

   await deleteTestRating();

   const { error: insertError } = await supabaseAdmin.from('release_ratings').insert({
      rating: 7,
      user_id: fixtures.profileId,
      release_id: fixtures.releaseId,
   });

   if (insertError) {
      throw new Error(`Insert rating failed: ${insertError.message}`);
   }

   const { data, error } = await supabaseAdmin.rpc('check_rating_cooldown', {
      p_user_id: fixtures.profileId,
      p_release_id: fixtures.releaseId,
   });

   if (error) {
      throw new Error(`check_rating_cooldown RPC failed: ${error.message}`);
   }

   const row = data?.[0] as undefined | { can_rate: boolean; cooldown_until: null | string };

   if (!row || row.can_rate) {
      throw new Error('Expected can_rate false immediately after rating');
   }

   if (!row.cooldown_until) {
      throw new Error('Expected cooldown_until when within cooldown window');
   }
};

const testRpcCooldownAllowsAfter24hFromGreatestTimestamp = async () => {
   if (!fixtures) throw new Error('Fixtures not loaded');

   const stale = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();

   const { error: updateError } = await supabaseAdmin
      .from('release_ratings')
      .update({ created_at: stale, updated_at: stale })
      .eq('user_id', fixtures.profileId)
      .eq('release_id', fixtures.releaseId);

   if (updateError) {
      throw new Error(`Failed to backdate rating timestamps: ${updateError.message}`);
   }

   const { data, error } = await supabaseAdmin.rpc('check_rating_cooldown', {
      p_user_id: fixtures.profileId,
      p_release_id: fixtures.releaseId,
   });

   if (error) {
      throw new Error(`check_rating_cooldown RPC failed: ${error.message}`);
   }

   const row = data?.[0] as undefined | { can_rate: boolean };

   if (!row?.can_rate) {
      throw new Error('Expected can_rate true when last activity was more than 24 hours ago');
   }
};

const testGreatestUsesUpdatedAtForCooldown = async () => {
   if (!fixtures) throw new Error('Fixtures not loaded');

   await deleteTestRating();

   const old = new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString();
   const recent = new Date().toISOString();

   const { error: insertError } = await supabaseAdmin.from('release_ratings').insert({
      rating: 5,
      user_id: fixtures.profileId,
      release_id: fixtures.releaseId,
   });

   if (insertError) {
      throw new Error(`Insert rating failed: ${insertError.message}`);
   }

   const { error: stampError } = await supabaseAdmin
      .from('release_ratings')
      .update({ created_at: old, updated_at: recent })
      .eq('user_id', fixtures.profileId)
      .eq('release_id', fixtures.releaseId);

   if (stampError) {
      throw new Error(`Failed to set created_at/updated_at: ${stampError.message}`);
   }

   const { data: blockedData, error: blockedErr } = await supabaseAdmin.rpc('check_rating_cooldown', {
      p_user_id: fixtures.profileId,
      p_release_id: fixtures.releaseId,
   });

   if (blockedErr) {
      throw new Error(`check_rating_cooldown RPC failed: ${blockedErr.message}`);
   }

   const blocked = blockedData?.[0] as undefined | { can_rate: boolean };

   if (!blocked || blocked.can_rate) {
      throw new Error('Expected cooldown when updated_at is recent even if created_at is old');
   }

   const stale = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString();

   await supabaseAdmin
      .from('release_ratings')
      .update({ updated_at: stale })
      .eq('user_id', fixtures.profileId)
      .eq('release_id', fixtures.releaseId);

   const { data: allowedData, error: allowedErr } = await supabaseAdmin.rpc('check_rating_cooldown', {
      p_user_id: fixtures.profileId,
      p_release_id: fixtures.releaseId,
   });

   if (allowedErr) {
      throw new Error(`check_rating_cooldown RPC failed: ${allowedErr.message}`);
   }

   const allowed = allowedData?.[0] as undefined | { can_rate: boolean };

   if (!allowed?.can_rate) {
      throw new Error('Expected can_rate true after moving updated_at beyond 24h');
   }
};

const testUniqueUserReleaseConstraint = async () => {
   if (!fixtures) throw new Error('Fixtures not loaded');

   await deleteTestRating();

   const { error: firstError } = await supabaseAdmin.from('release_ratings').insert({
      rating: 8,
      user_id: fixtures.profileId,
      release_id: fixtures.releaseId,
   });

   if (firstError) {
      throw new Error(`First insert should succeed: ${firstError.message}`);
   }

   const { error: duplicateError } = await supabaseAdmin.from('release_ratings').insert({
      rating: 9,
      user_id: fixtures.profileId,
      release_id: fixtures.releaseId,
   });

   if (!duplicateError) {
      throw new Error('Second insert for same (user_id, release_id) should violate unique constraint');
   }
};

const testRatingValueCheckConstraint = async () => {
   if (!fixtures) throw new Error('Fixtures not loaded');

   await deleteTestRating();

   const { error } = await supabaseAdmin.from('release_ratings').insert({
      rating: 11,
      user_id: fixtures.profileId,
      release_id: fixtures.releaseId,
   });

   if (!error) {
      await deleteTestRating();
      throw new Error('Insert with rating 11 should fail CHECK constraint');
   }
};

const main = async () => {
   if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set in .env.local\n');
      process.exit(1);
   }

   console.log('\n🧪 Running Rating / Supabase Tests...\n');
   console.log(`   Test user email: ${TEST_EMAIL}\n`);

   let testProfileId: null | string = null;
   let exitCode = 0;

   try {
      testProfileId = await createTestProfile();

      try {
         const releaseId = await loadReleaseId();
         fixtures = { releaseId, profileId: testProfileId };
      } catch (e) {
         await cleanupTestProfile(testProfileId);
         testProfileId = null;
         throw e;
      }

      console.log(
         `   Created test profile ${fixtures.profileId.slice(0, 8)}… / release ${fixtures.releaseId.slice(0, 8)}…\n`,
      );

      const tests = [
         {
            fn: testReleaseByExternalKeyQueryIncludesReleaseRatings,
            name: 'RELEASE_BY_EXTERNAL_KEY_QUERY includes release_ratings',
         },
         { fn: testAnonCanSelectReleaseRatings, name: 'anon can read release_ratings (RLS)' },
         { fn: testRpcCooldownNoRowAllowsRate, name: 'check_rating_cooldown: no row → can_rate' },
         { fn: testRpcCooldownBlocksWithin24Hours, name: 'check_rating_cooldown: fresh rating → blocked' },
         {
            fn: testRpcCooldownAllowsAfter24hFromGreatestTimestamp,
            name: 'check_rating_cooldown: stale timestamps → allowed',
         },
         { fn: testGreatestUsesUpdatedAtForCooldown, name: 'check_rating_cooldown: GREATEST(created_at, updated_at)' },
         { fn: testUniqueUserReleaseConstraint, name: 'UNIQUE (user_id, release_id) on insert' },
         { fn: testRatingValueCheckConstraint, name: 'CHECK rating in 0..10 rejects 11' },
      ];

      const results: TestResult[] = [];

      for (const test of tests) {
         const result = await runTest(test.name, test.fn);
         results.push(result);

         if (result.passed) {
            console.log(`✅ ${result.name} - ${result.duration.toFixed(2)}ms`);
         } else {
            console.log(`❌ ${result.name} - ${result.error}`);
         }
      }

      const passedCount = results.filter((r) => r.passed).length;
      const failedCount = results.filter((r) => !r.passed).length;
      const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);

      console.log('📊 Test Summary:');
      console.log(`   Total: ${results.length}`);
      console.log(`   Passed: ${passedCount}`);
      console.log(`   Failed: ${failedCount}`);
      console.log(`   Duration: ${totalDuration.toFixed(2)}ms\n`);

      exitCode = failedCount > 0 ? 1 : 0;
   } finally {
      if (testProfileId) {
         console.log('🗑️  Deleting test ratings and auth user...');
         await cleanupTestProfile(testProfileId);
         console.log('✅ Test profile removed\n');
      }
   }

   if (exitCode !== 0) {
      console.error('❌ Some rating tests failed.\n');
   } else {
      console.log('✅ All rating tests passed!\n');
   }

   process.exit(exitCode);
};

main().catch((error) => {
   console.error('\n❌ Test runner failed:', error);
   process.exit(1);
});
