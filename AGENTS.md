<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# Release Tracker — AGENTS.md

## Overview

Music release tracker built with **Next.js 16 App Router**, React 19, TypeScript, Supabase (PostgreSQL), SCSS Modules, Yarn.

## Commands

```bash
yarn dev                    # Start development server
yarn build                  # Production build
yarn lint                   # ESLint (TS/TSX) with auto-fix, zero warnings allowed
yarn lint:styles            # Stylelint (SCSS/CSS) with auto-fix
yarn format                 # Prettier format all TS/JS files
yarn test:queries           # Run Supabase query tests (local DB, .env.development.local)
yarn test:auth              # Run Supabase auth tests (local DB)
yarn test:ratings           # Run rating/cooldown tests (local DB)

# Database (requires Supabase CLI + Docker)
supabase start              # Boot the local stack; prints URL and keys
yarn db:sync                # Pull prod catalog, reset local DB, run seeds
yarn db:reset               # Reset local DB from migrations + seeds (no network)
yarn db:export-types        # Export local DB types to supabase/types/database.ts
yarn db:pull                # Pull schema from remote Supabase
yarn db:push                # Push local migrations to remote
yarn db:create-migration    # Create migration from schema diff
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Pages with site header
│   │   ├── (public)/             # Public pages (homepage, releases, etc.)
│   │   │   ├── page.tsx          # Homepage (/)
│   │   │   ├── [page]/           # Paginated homepage (/2, /3, ...)
│   │   │   ├── this-month/       # This month's releases
│   │   │   ├── all-time/         # All-time releases
│   │   │   └── release/[url]/    # Individual release detail
│   │   ├── (protected)/          # Auth-guarded pages
│   │   │   └── profile/          # User profile (/profile)
│   │   ├── @authModal/           # Parallel route — auth modal overlay
│   │   └── layout.tsx
│   ├── (no-header)/              # Standalone pages (no site header)
│   │   ├── auth/                 # Direct auth page (/auth)
│   │   └── reset-password/       # Password reset (/reset-password)
│   ├── api/
│   │   ├── auth/login/           # POST /api/auth/login
│   │   ├── auth/register/        # POST /api/auth/register
│   │   └── revalidateByTag/      # POST /api/revalidateByTag
│   ├── layout.tsx                # Root layout
│   ├── robots.ts                 # Robots.txt generation
│   └── sitemap.ts                # Sitemap generation
│
├── lib/
│   └── supabase/
│       ├── client.ts             # createSupabaseStaticClient() — for 'use cache' functions
│       ├── server.ts             # createSupabaseServerClient() — SSR/actions/middleware
│       └── admin.ts              # Admin client
│
├── modules/                      # Feature modules
│   ├── auth/                     # Authentication (components, services, utils)
│   ├── errorPage/                # Error page UI
│   ├── layout/                   # Site header, navigation
│   ├── profile/                  # User profile (components, services)
│   ├── release/                  # Release listings (components, services, types, utils)
│   └── releaseByExternalKey/     # Release detail page (components, services, types, utils)
│
├── shared/                       # Shared/reusable code
│   ├── hooks/                    # useFormValidation
│   ├── providers/                # ThemeProvider
│   ├── styles/                   # _variables, _mixins, _breakpoints, _typography, _buttons, globals
│   ├── ui/                       # Reusable UI components (see below)
│   └── utils/
│       ├── browser/              # Browser utilities
│       ├── data/                 # Data utilities (getAuthenticatedUser, etc.)
│       ├── date/                 # Date utilities
│       ├── integrations/         # External integrations
│       └── constants.ts          # Cache configs, routes, regex
│
├── proxy.ts                      # Next.js middleware (auth guards, URL validation)
└── tests/                        # Test files
```

## Architecture

### Path Aliases

- `@/*` → `src/*`
- `@db/*` → `supabase/*`

### Supabase Client Duality

- `createSupabaseStaticClient()` (`client.ts`) — browser client via `createBrowserClient`, used inside `'use cache'` server functions where cookie auth isn't needed
- `createSupabaseServerClient()` (`server.ts`) — cookie-aware SSR client via `createServerClient`, used in middleware, server actions, and auth-sensitive routes

### Caching Strategy

Service functions use Next.js `'use cache'` directive with `cacheLife` and `cacheTag` (from `next/cache`).

Release listings use Next's built-in `'hours'` profile (stale 5min / revalidate 1h / expire 1d).
Custom presets live in `src/shared/constants.ts`:
- `CACHE_10MIN` — stale: 300s, expire: 3600s, revalidate: 600s

Cache tag: `RELEASES_CACHE_TAG`. External invalidation via `POST /api/revalidateByTag` (requires `Authorization: <REVALIDATION_SECRET>` header).

### Middleware

`src/proxy.ts` — validates/sanitizes URL search params, enforces auth guards:
- Unauthenticated → redirected away from `/profile`
- Authenticated → redirected away from `/auth`

### Auth Flow

- Server Actions in `src/modules/auth/services/authActions.ts` — login, register, logout via `useActionState`
- API routes `/api/auth/login` and `/api/auth/register` wrap the same actions
- Auth modal via intercepted routes: `(main)/@authModal/(.)auth/`
- Password reset via `/reset-password`

### Album ratings

Release detail pages support **album ratings** (scale **0–10**, integer). Logged-in users rate via the `AlbumRating` block inside `ReleaseInfo`; guests see a sign-in link.

**Data (Supabase)**

- `release_ratings` — one row per user per release (`UNIQUE (user_id, release_id)`): `rating`, `created_at`, `updated_at`.
- `user_activity` — optional feed-style linkage (`activity_type`: `rating` | `comment`) with references to `release_ratings` / `comments` / `releases`.
- RPC `check_rating_cooldown(p_user_id, p_release_id)` — returns `can_rate`, `last_rated_at`, `cooldown_until`. Cooldown is **24 hours** from the **last rating action**: `GREATEST(created_at, updated_at)` on the user’s row (so changing a rating updates the window; inserts and updates share the same rule).

**Server**

- `src/modules/releaseByExternalKey/services/ratingServices.ts` — server actions: `submitRating` (cooldown check → insert or update → flash + `revalidatePath` for `/release/[url]`), `checkRatingCooldown`, `getUserRating`.
- Cooldown violations and DB errors use `setFlash` (`FlashToaster`) with an error message; success uses a success flash.

**Client UI**

- `modules/releaseByExternalKey/components/AlbumRating/` — average score, vote count, progress bar vs. 10, **Rate this album** (opens `Modal` + `segments/RateAlbumModal` star picker). On successful submit the modal closes; on failure it stays open so the user can retry.
- `ReleaseInfo` is a client component; the release **page** loads `getProfile()` (wrapped in `cache` from `react`) and `getReleaseByExternalKey()` in parallel and passes `userProfile` into `ReleaseInfo` and `CommentsSection` so profile is fetched once per request.

**Query**

- `getReleaseByExternalKey` / `RELEASE_QUERY` includes `release_ratings ( id, rating )` for aggregates on the server-rendered release.

## Module Structure

Each module in `src/modules/<feature>/` follows:

```
modules/<module-name>/
├── components/     # UI components with co-located .module.scss
├── services/       # Data fetching / business logic
├── types/          # TypeScript types
├── utils/          # Feature-specific utilities
└── hooks/          # React hooks (if needed)
```

Not every folder is required — only create what the module actually needs.

### Layer Dependencies

```
app/ ──→ modules/ ──→ shared/
          │
          ╳ modules NEVER import from each other directly
```

## Component Conventions

### Folder Structure

- Flat components: single file directly in `components/`
- Multi-file components: subfolder with `index.tsx` containing the component
- Complex components with sub-components: group under `segments/`

```
components/
├── AudioPlayer/
│   └── index.tsx
├── CommentsSection/
│   ├── segments/                    # Private sub-components
│   │   ├── CommentForm.tsx
│   │   └── CommentsList.tsx
│   ├── index.tsx
│   └── CommentsSection.module.scss
└── SomeSimple.tsx
```

### SCSS File Naming

`<ComponentFolder>/<ComponentFolder>.module.scss` — name must match the folder.

### Server Components

Server Components by default. `'use client'` only when needed for event handlers, browser APIs, or client hooks.

## Shared UI Components

`src/shared/ui/`: Accordion, Avatar, AvatarCropModal, Badge, Buttons (ActionButton, LogoutButton), DeleteModal, FlashToaster, FormContainer, FormErrorText, Icons (includes `StarIcon` for ratings), Input, Modal, Pagination, Portal, ReleaseCard, SkeletonWrapper, Tabs, TextArea, ThemeToggle

## Code Conventions

- **Prettier:** 120-char line width, single quotes, semicolons, trailing commas, 3-space tab width
- **Imports:** Sorted by type then alphabetically (eslint-plugin-perfectionist). Order: external → internal → parent → sibling → index → style
- **Class names:** camelCase in SCSS Modules
- **`no-console`** enforced — only `console.error` permitted
- **React Compiler** enabled — no manual `useMemo`/`useCallback`
- **SCSS:** Global partials auto-prepended via `sassOptions.prependData` in `next.config.ts`

## Next.js Config

- React Compiler: `reactCompiler: true`
- Cache Components: `cacheComponents: true`
- Security headers: HSTS, X-Frame-Options (SAMEORIGIN), CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Remote images: `cdn-images.dzcdn.net`, `cdnt-preview.dzcdn.net`, `res.cloudinary.com`

## Environment Variables

See `.env.example`. Supabase is reached through server-side variables only — there are no
`NEXT_PUBLIC_SUPABASE_*` variables, so switching environments needs no rebuild.

`.env.local` — production:
- `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL` — Postgres connection string, read only by `yarn db:sync`
- `REVALIDATION_SECRET`, `CLOUDINARY_URL`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_SITE_URL`

`.env.development.local` — local Docker stack. Next.js loads it ahead of `.env.local` under
`yarn dev`, so `yarn dev` and every `test:*` script hit the local DB while production builds
keep using `.env.local`.

## Local Database Workflow

Each developer runs their own Postgres in Docker; there is no shared staging project. Schema
comes from `supabase/migrations`, catalog data from prod, users from a committed seed.

```bash
supabase start   # once per machine
yarn db:sync     # prod catalog -> local DB, then migrations + seeds
```

`yarn db:sync` dumps only catalog tables (releases, artists, tracks, genres and the join
tables). `profiles`, `comments`, `release_ratings` and `user_activity` are excluded, and the
script aborts if a user table shows up in the dump — prod PII never lands on a dev machine.

Seeds load in the order declared under `[db.seed]` in `config.toml`:
`seeds/catalog_data.sql` (generated, gitignored) then `seeds/users.sql` (committed).
`seeds/users.sql` creates `admin@local.dev`, `user@local.dev` and `critic@local.dev`,
all with password `password123`. Because the `on_auth_user_created` trigger already inserts
the `profiles` row, the seed updates profiles instead of inserting them.

Schema changes go through migrations only — never edit a remote DB by hand:

```bash
yarn db:create-migration <name>   # diff local changes into a migration
yarn db:reset                     # verify it applies from scratch
yarn db:export-types              # regenerate database.ts, commit with the migration
yarn db:push                      # apply to prod after merge
```

## Key Dependencies

- `next` ^16.2.1, `react` 19.2.4
- `@supabase/ssr` ^0.8.0, `@supabase/supabase-js` ^2.89.0
- `next-themes` ^0.4.6 — theme switching
- `react-easy-crop` ^5.5.6 — avatar cropping
- `react-loading-skeleton` ^3.5.0 — loading states
- `sharp` ^0.34.5 — image processing
- `sonner` ^1.7.1 — toast notifications
- `sass` ^1.97.3 — SCSS compilation
- `husky` ^9.1.7 — git hooks