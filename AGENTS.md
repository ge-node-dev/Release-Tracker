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
yarn test:queries           # Run Supabase query tests (requires .env.local)
yarn test:auth              # Run Supabase auth tests (requires .env.local)

# Database (requires Supabase CLI)
yarn db:export-types        # Export Supabase DB types to supabase/types/database.ts
yarn db:pull                # Pull schema from remote Supabase
yarn db:push                # Push local schema to remote
yarn db:create-migration    # Create migration from schema diff
yarn db:dump                # Reset local DB and re-import mock_data.sql
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

Cache presets in `src/shared/utils/constants.ts`:
- `CACHE_10MIN` — stale: 600s, expire: 3600s, revalidate: 600s
- `CACHE_12H` — stale: 43200s, expire: 86400s, revalidate: 43200s
- `CACHE_1W` — stale: 604800s, expire: 2592000s, revalidate: 604800s

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
- Standalone output: `output: 'standalone'`
- Cache Components: `cacheComponents: true`
- Security headers: HSTS, X-Frame-Options (SAMEORIGIN), CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- Remote images: `cdn-images.dzcdn.net`, `cdnt-preview.dzcdn.net`, `res.cloudinary.com`

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `REVALIDATION_SECRET`

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