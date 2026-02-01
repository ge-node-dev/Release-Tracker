drop extension if exists "pg_net";


  create table "public"."artists" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "image_url" text
      );


alter table "public"."artists" enable row level security;


  create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "release_id" uuid not null,
    "user_id" uuid not null,
    "parent_id" uuid,
    "content" text not null,
    "likes" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );


alter table "public"."comments" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null,
    "telegram_id" bigint,
    "is_admin" boolean default false,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."profiles" enable row level security;


  create table "public"."release_artists" (
    "release_id" uuid not null,
    "artist_id" uuid not null
      );


alter table "public"."release_artists" enable row level security;


  create table "public"."releases" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "rating_avg" double precision default 0,
    "cover_url" text,
    "genres" text[],
    "release_date" date,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."releases" enable row level security;


  create table "public"."track_artists" (
    "track_id" uuid not null,
    "artist_id" uuid not null
      );


alter table "public"."track_artists" enable row level security;


  create table "public"."tracks" (
    "id" uuid not null default gen_random_uuid(),
    "release_id" uuid not null,
    "title" text not null,
    "cover_url" text,
    "genres" text[],
    "created_at" timestamp with time zone default now()
      );


alter table "public"."tracks" enable row level security;

CREATE UNIQUE INDEX artists_pkey ON public.artists USING btree (id);

CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_telegram_id_key ON public.profiles USING btree (telegram_id);

CREATE UNIQUE INDEX release_artists_pkey ON public.release_artists USING btree (release_id, artist_id);

CREATE UNIQUE INDEX releases_pkey ON public.releases USING btree (id);

CREATE UNIQUE INDEX track_artists_pkey ON public.track_artists USING btree (track_id, artist_id);

CREATE UNIQUE INDEX tracks_pkey ON public.tracks USING btree (id);

alter table "public"."artists" add constraint "artists_pkey" PRIMARY KEY using index "artists_pkey";

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."release_artists" add constraint "release_artists_pkey" PRIMARY KEY using index "release_artists_pkey";

alter table "public"."releases" add constraint "releases_pkey" PRIMARY KEY using index "releases_pkey";

alter table "public"."track_artists" add constraint "track_artists_pkey" PRIMARY KEY using index "track_artists_pkey";

alter table "public"."tracks" add constraint "tracks_pkey" PRIMARY KEY using index "tracks_pkey";

alter table "public"."comments" add constraint "comments_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public.comments(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_parent_id_fkey";

alter table "public"."comments" add constraint "comments_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_release_id_fkey";

alter table "public"."comments" add constraint "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_telegram_id_key" UNIQUE using index "profiles_telegram_id_key";

alter table "public"."release_artists" add constraint "release_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE not valid;

alter table "public"."release_artists" validate constraint "release_artists_artist_id_fkey";

alter table "public"."release_artists" add constraint "release_artists_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON DELETE CASCADE not valid;

alter table "public"."release_artists" validate constraint "release_artists_release_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE not valid;

alter table "public"."track_artists" validate constraint "track_artists_artist_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON DELETE CASCADE not valid;

alter table "public"."track_artists" validate constraint "track_artists_track_id_fkey";

alter table "public"."tracks" add constraint "tracks_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON DELETE CASCADE not valid;

alter table "public"."tracks" validate constraint "tracks_release_id_fkey";

grant delete on table "public"."artists" to "anon";

grant insert on table "public"."artists" to "anon";

grant references on table "public"."artists" to "anon";

grant select on table "public"."artists" to "anon";

grant trigger on table "public"."artists" to "anon";

grant truncate on table "public"."artists" to "anon";

grant update on table "public"."artists" to "anon";

grant delete on table "public"."artists" to "authenticated";

grant insert on table "public"."artists" to "authenticated";

grant references on table "public"."artists" to "authenticated";

grant select on table "public"."artists" to "authenticated";

grant trigger on table "public"."artists" to "authenticated";

grant truncate on table "public"."artists" to "authenticated";

grant update on table "public"."artists" to "authenticated";

grant delete on table "public"."artists" to "service_role";

grant insert on table "public"."artists" to "service_role";

grant references on table "public"."artists" to "service_role";

grant select on table "public"."artists" to "service_role";

grant trigger on table "public"."artists" to "service_role";

grant truncate on table "public"."artists" to "service_role";

grant update on table "public"."artists" to "service_role";

grant delete on table "public"."comments" to "anon";

grant insert on table "public"."comments" to "anon";

grant references on table "public"."comments" to "anon";

grant select on table "public"."comments" to "anon";

grant trigger on table "public"."comments" to "anon";

grant truncate on table "public"."comments" to "anon";

grant update on table "public"."comments" to "anon";

grant delete on table "public"."comments" to "authenticated";

grant insert on table "public"."comments" to "authenticated";

grant references on table "public"."comments" to "authenticated";

grant select on table "public"."comments" to "authenticated";

grant trigger on table "public"."comments" to "authenticated";

grant truncate on table "public"."comments" to "authenticated";

grant update on table "public"."comments" to "authenticated";

grant delete on table "public"."comments" to "service_role";

grant insert on table "public"."comments" to "service_role";

grant references on table "public"."comments" to "service_role";

grant select on table "public"."comments" to "service_role";

grant trigger on table "public"."comments" to "service_role";

grant truncate on table "public"."comments" to "service_role";

grant update on table "public"."comments" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."release_artists" to "anon";

grant insert on table "public"."release_artists" to "anon";

grant references on table "public"."release_artists" to "anon";

grant select on table "public"."release_artists" to "anon";

grant trigger on table "public"."release_artists" to "anon";

grant truncate on table "public"."release_artists" to "anon";

grant update on table "public"."release_artists" to "anon";

grant delete on table "public"."release_artists" to "authenticated";

grant insert on table "public"."release_artists" to "authenticated";

grant references on table "public"."release_artists" to "authenticated";

grant select on table "public"."release_artists" to "authenticated";

grant trigger on table "public"."release_artists" to "authenticated";

grant truncate on table "public"."release_artists" to "authenticated";

grant update on table "public"."release_artists" to "authenticated";

grant delete on table "public"."release_artists" to "service_role";

grant insert on table "public"."release_artists" to "service_role";

grant references on table "public"."release_artists" to "service_role";

grant select on table "public"."release_artists" to "service_role";

grant trigger on table "public"."release_artists" to "service_role";

grant truncate on table "public"."release_artists" to "service_role";

grant update on table "public"."release_artists" to "service_role";

grant delete on table "public"."releases" to "anon";

grant insert on table "public"."releases" to "anon";

grant references on table "public"."releases" to "anon";

grant select on table "public"."releases" to "anon";

grant trigger on table "public"."releases" to "anon";

grant truncate on table "public"."releases" to "anon";

grant update on table "public"."releases" to "anon";

grant delete on table "public"."releases" to "authenticated";

grant insert on table "public"."releases" to "authenticated";

grant references on table "public"."releases" to "authenticated";

grant select on table "public"."releases" to "authenticated";

grant trigger on table "public"."releases" to "authenticated";

grant truncate on table "public"."releases" to "authenticated";

grant update on table "public"."releases" to "authenticated";

grant delete on table "public"."releases" to "service_role";

grant insert on table "public"."releases" to "service_role";

grant references on table "public"."releases" to "service_role";

grant select on table "public"."releases" to "service_role";

grant trigger on table "public"."releases" to "service_role";

grant truncate on table "public"."releases" to "service_role";

grant update on table "public"."releases" to "service_role";

grant delete on table "public"."track_artists" to "anon";

grant insert on table "public"."track_artists" to "anon";

grant references on table "public"."track_artists" to "anon";

grant select on table "public"."track_artists" to "anon";

grant trigger on table "public"."track_artists" to "anon";

grant truncate on table "public"."track_artists" to "anon";

grant update on table "public"."track_artists" to "anon";

grant delete on table "public"."track_artists" to "authenticated";

grant insert on table "public"."track_artists" to "authenticated";

grant references on table "public"."track_artists" to "authenticated";

grant select on table "public"."track_artists" to "authenticated";

grant trigger on table "public"."track_artists" to "authenticated";

grant truncate on table "public"."track_artists" to "authenticated";

grant update on table "public"."track_artists" to "authenticated";

grant delete on table "public"."track_artists" to "service_role";

grant insert on table "public"."track_artists" to "service_role";

grant references on table "public"."track_artists" to "service_role";

grant select on table "public"."track_artists" to "service_role";

grant trigger on table "public"."track_artists" to "service_role";

grant truncate on table "public"."track_artists" to "service_role";

grant update on table "public"."track_artists" to "service_role";

grant delete on table "public"."tracks" to "anon";

grant insert on table "public"."tracks" to "anon";

grant references on table "public"."tracks" to "anon";

grant select on table "public"."tracks" to "anon";

grant trigger on table "public"."tracks" to "anon";

grant truncate on table "public"."tracks" to "anon";

grant update on table "public"."tracks" to "anon";

grant delete on table "public"."tracks" to "authenticated";

grant insert on table "public"."tracks" to "authenticated";

grant references on table "public"."tracks" to "authenticated";

grant select on table "public"."tracks" to "authenticated";

grant trigger on table "public"."tracks" to "authenticated";

grant truncate on table "public"."tracks" to "authenticated";

grant update on table "public"."tracks" to "authenticated";

grant delete on table "public"."tracks" to "service_role";

grant insert on table "public"."tracks" to "service_role";

grant references on table "public"."tracks" to "service_role";

grant select on table "public"."tracks" to "service_role";

grant trigger on table "public"."tracks" to "service_role";

grant truncate on table "public"."tracks" to "service_role";

grant update on table "public"."tracks" to "service_role";


