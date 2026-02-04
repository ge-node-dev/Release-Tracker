
  create table "public"."artists" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "image_url" text,
    "created_at" timestamp with time zone default now(),
    "external_key" text not null,
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."artists_genres" (
    "artist_id" uuid not null,
    "genre_id" uuid not null
      );



  create table "public"."comments" (
    "id" uuid not null default gen_random_uuid(),
    "release_id" uuid not null,
    "user_id" uuid not null,
    "parent_id" uuid,
    "content" text,
    "likes" integer default 0,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now()
      );



  create table "public"."genres" (
    "id" uuid not null default gen_random_uuid(),
    "title" text,
    "external_key" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );



  create table "public"."profiles" (
    "id" uuid not null,
    "telegram_id" bigint,
    "is_admin" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );



  create table "public"."release_artists" (
    "release_id" uuid not null,
    "artist_id" uuid not null
      );



  create table "public"."release_genres" (
    "release_id" uuid not null,
    "genre_id" uuid not null
      );



  create table "public"."release_tracks" (
    "release_id" uuid not null,
    "track_id" uuid not null,
    "position" integer not null
      );



  create table "public"."releases" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "rating_avg" double precision not null default 0,
    "cover_url" text,
    "release_date" date not null,
    "created_at" timestamp with time zone not null default now(),
    "external_key" text not null,
    "fans_number" integer not null default 0,
    "updated_at" timestamp with time zone not null default now()
      );



  create table "public"."track_artists" (
    "track_id" uuid not null,
    "artist_id" uuid not null
      );



  create table "public"."track_genres" (
    "track_id" uuid not null,
    "genre_id" uuid not null
      );



  create table "public"."tracks" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "created_at" timestamp with time zone not null default now(),
    "external_key" text not null,
    "updated_at" timestamp with time zone not null default now(),
    "deezer_track_id" bigint not null
      );


CREATE UNIQUE INDEX artists_external_key_key ON public.artists USING btree (external_key);

CREATE UNIQUE INDEX artists_genres_pkey ON public.artists_genres USING btree (artist_id, genre_id);

CREATE UNIQUE INDEX artists_pkey ON public.artists USING btree (id);

CREATE UNIQUE INDEX comments_pkey ON public.comments USING btree (id);

CREATE UNIQUE INDEX genres_external_key_key ON public.genres USING btree (external_key);

CREATE UNIQUE INDEX genres_pkey ON public.genres USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_telegram_id_key ON public.profiles USING btree (telegram_id);

CREATE UNIQUE INDEX release_artists_pkey ON public.release_artists USING btree (release_id, artist_id);

CREATE UNIQUE INDEX release_genres_pkey ON public.release_genres USING btree (release_id, genre_id);

CREATE UNIQUE INDEX release_tracks_pkey ON public.release_tracks USING btree (release_id, track_id);

CREATE UNIQUE INDEX releases_external_key_key ON public.releases USING btree (external_key);

CREATE UNIQUE INDEX releases_pkey ON public.releases USING btree (id);

CREATE UNIQUE INDEX track_artists_pkey ON public.track_artists USING btree (track_id, artist_id);

CREATE UNIQUE INDEX track_genres_pkey ON public.track_genres USING btree (track_id, genre_id);

CREATE UNIQUE INDEX tracks_external_key_key ON public.tracks USING btree (external_key);

CREATE UNIQUE INDEX tracks_pkey ON public.tracks USING btree (id);

alter table "public"."artists" add constraint "artists_pkey" PRIMARY KEY using index "artists_pkey";

alter table "public"."artists_genres" add constraint "artists_genres_pkey" PRIMARY KEY using index "artists_genres_pkey";

alter table "public"."comments" add constraint "comments_pkey" PRIMARY KEY using index "comments_pkey";

alter table "public"."genres" add constraint "genres_pkey" PRIMARY KEY using index "genres_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."release_artists" add constraint "release_artists_pkey" PRIMARY KEY using index "release_artists_pkey";

alter table "public"."release_genres" add constraint "release_genres_pkey" PRIMARY KEY using index "release_genres_pkey";

alter table "public"."release_tracks" add constraint "release_tracks_pkey" PRIMARY KEY using index "release_tracks_pkey";

alter table "public"."releases" add constraint "releases_pkey" PRIMARY KEY using index "releases_pkey";

alter table "public"."track_artists" add constraint "track_artists_pkey" PRIMARY KEY using index "track_artists_pkey";

alter table "public"."track_genres" add constraint "track_genres_pkey" PRIMARY KEY using index "track_genres_pkey";

alter table "public"."tracks" add constraint "tracks_pkey" PRIMARY KEY using index "tracks_pkey";

alter table "public"."artists" add constraint "artists_external_key_key" UNIQUE using index "artists_external_key_key";

alter table "public"."artists_genres" add constraint "artist_genres_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) not valid;

alter table "public"."artists_genres" validate constraint "artist_genres_artist_id_fkey";

alter table "public"."artists_genres" add constraint "artist_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) not valid;

alter table "public"."artists_genres" validate constraint "artist_genres_genre_id_fkey";

alter table "public"."comments" add constraint "comments_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public.comments(id) not valid;

alter table "public"."comments" validate constraint "comments_parent_id_fkey";

alter table "public"."comments" add constraint "comments_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) not valid;

alter table "public"."comments" validate constraint "comments_release_id_fkey";

alter table "public"."comments" add constraint "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) not valid;

alter table "public"."comments" validate constraint "comments_user_id_fkey";

alter table "public"."genres" add constraint "genres_external_key_key" UNIQUE using index "genres_external_key_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_telegram_id_key" UNIQUE using index "profiles_telegram_id_key";

alter table "public"."release_artists" add constraint "release_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) not valid;

alter table "public"."release_artists" validate constraint "release_artists_artist_id_fkey";

alter table "public"."release_artists" add constraint "release_artists_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) not valid;

alter table "public"."release_artists" validate constraint "release_artists_release_id_fkey";

alter table "public"."release_genres" add constraint "release_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) not valid;

alter table "public"."release_genres" validate constraint "release_genres_genre_id_fkey";

alter table "public"."release_genres" add constraint "release_genres_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) not valid;

alter table "public"."release_genres" validate constraint "release_genres_release_id_fkey";

alter table "public"."release_tracks" add constraint "release_tracks_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) not valid;

alter table "public"."release_tracks" validate constraint "release_tracks_release_id_fkey";

alter table "public"."release_tracks" add constraint "release_tracks_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) not valid;

alter table "public"."release_tracks" validate constraint "release_tracks_track_id_fkey";

alter table "public"."releases" add constraint "releases_external_key_key" UNIQUE using index "releases_external_key_key";

alter table "public"."track_artists" add constraint "track_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) not valid;

alter table "public"."track_artists" validate constraint "track_artists_artist_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) not valid;

alter table "public"."track_artists" validate constraint "track_artists_track_id_fkey";

alter table "public"."track_genres" add constraint "track_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) not valid;

alter table "public"."track_genres" validate constraint "track_genres_genre_id_fkey";

alter table "public"."track_genres" add constraint "track_genres_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) not valid;

alter table "public"."track_genres" validate constraint "track_genres_track_id_fkey";

alter table "public"."tracks" add constraint "tracks_external_key_key" UNIQUE using index "tracks_external_key_key";

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

grant delete on table "public"."artists" to "postgres";

grant insert on table "public"."artists" to "postgres";

grant references on table "public"."artists" to "postgres";

grant select on table "public"."artists" to "postgres";

grant trigger on table "public"."artists" to "postgres";

grant truncate on table "public"."artists" to "postgres";

grant update on table "public"."artists" to "postgres";

grant delete on table "public"."artists" to "service_role";

grant insert on table "public"."artists" to "service_role";

grant references on table "public"."artists" to "service_role";

grant select on table "public"."artists" to "service_role";

grant trigger on table "public"."artists" to "service_role";

grant truncate on table "public"."artists" to "service_role";

grant update on table "public"."artists" to "service_role";

grant delete on table "public"."artists_genres" to "anon";

grant insert on table "public"."artists_genres" to "anon";

grant references on table "public"."artists_genres" to "anon";

grant select on table "public"."artists_genres" to "anon";

grant trigger on table "public"."artists_genres" to "anon";

grant truncate on table "public"."artists_genres" to "anon";

grant update on table "public"."artists_genres" to "anon";

grant delete on table "public"."artists_genres" to "authenticated";

grant insert on table "public"."artists_genres" to "authenticated";

grant references on table "public"."artists_genres" to "authenticated";

grant select on table "public"."artists_genres" to "authenticated";

grant trigger on table "public"."artists_genres" to "authenticated";

grant truncate on table "public"."artists_genres" to "authenticated";

grant update on table "public"."artists_genres" to "authenticated";

grant delete on table "public"."artists_genres" to "postgres";

grant insert on table "public"."artists_genres" to "postgres";

grant references on table "public"."artists_genres" to "postgres";

grant select on table "public"."artists_genres" to "postgres";

grant trigger on table "public"."artists_genres" to "postgres";

grant truncate on table "public"."artists_genres" to "postgres";

grant update on table "public"."artists_genres" to "postgres";

grant delete on table "public"."artists_genres" to "service_role";

grant insert on table "public"."artists_genres" to "service_role";

grant references on table "public"."artists_genres" to "service_role";

grant select on table "public"."artists_genres" to "service_role";

grant trigger on table "public"."artists_genres" to "service_role";

grant truncate on table "public"."artists_genres" to "service_role";

grant update on table "public"."artists_genres" to "service_role";

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

grant delete on table "public"."comments" to "postgres";

grant insert on table "public"."comments" to "postgres";

grant references on table "public"."comments" to "postgres";

grant select on table "public"."comments" to "postgres";

grant trigger on table "public"."comments" to "postgres";

grant truncate on table "public"."comments" to "postgres";

grant update on table "public"."comments" to "postgres";

grant delete on table "public"."comments" to "service_role";

grant insert on table "public"."comments" to "service_role";

grant references on table "public"."comments" to "service_role";

grant select on table "public"."comments" to "service_role";

grant trigger on table "public"."comments" to "service_role";

grant truncate on table "public"."comments" to "service_role";

grant update on table "public"."comments" to "service_role";

grant delete on table "public"."genres" to "anon";

grant insert on table "public"."genres" to "anon";

grant references on table "public"."genres" to "anon";

grant select on table "public"."genres" to "anon";

grant trigger on table "public"."genres" to "anon";

grant truncate on table "public"."genres" to "anon";

grant update on table "public"."genres" to "anon";

grant delete on table "public"."genres" to "authenticated";

grant insert on table "public"."genres" to "authenticated";

grant references on table "public"."genres" to "authenticated";

grant select on table "public"."genres" to "authenticated";

grant trigger on table "public"."genres" to "authenticated";

grant truncate on table "public"."genres" to "authenticated";

grant update on table "public"."genres" to "authenticated";

grant delete on table "public"."genres" to "postgres";

grant insert on table "public"."genres" to "postgres";

grant references on table "public"."genres" to "postgres";

grant select on table "public"."genres" to "postgres";

grant trigger on table "public"."genres" to "postgres";

grant truncate on table "public"."genres" to "postgres";

grant update on table "public"."genres" to "postgres";

grant delete on table "public"."genres" to "service_role";

grant insert on table "public"."genres" to "service_role";

grant references on table "public"."genres" to "service_role";

grant select on table "public"."genres" to "service_role";

grant trigger on table "public"."genres" to "service_role";

grant truncate on table "public"."genres" to "service_role";

grant update on table "public"."genres" to "service_role";

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

grant delete on table "public"."profiles" to "postgres";

grant insert on table "public"."profiles" to "postgres";

grant references on table "public"."profiles" to "postgres";

grant select on table "public"."profiles" to "postgres";

grant trigger on table "public"."profiles" to "postgres";

grant truncate on table "public"."profiles" to "postgres";

grant update on table "public"."profiles" to "postgres";

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

grant delete on table "public"."release_artists" to "postgres";

grant insert on table "public"."release_artists" to "postgres";

grant references on table "public"."release_artists" to "postgres";

grant select on table "public"."release_artists" to "postgres";

grant trigger on table "public"."release_artists" to "postgres";

grant truncate on table "public"."release_artists" to "postgres";

grant update on table "public"."release_artists" to "postgres";

grant delete on table "public"."release_artists" to "service_role";

grant insert on table "public"."release_artists" to "service_role";

grant references on table "public"."release_artists" to "service_role";

grant select on table "public"."release_artists" to "service_role";

grant trigger on table "public"."release_artists" to "service_role";

grant truncate on table "public"."release_artists" to "service_role";

grant update on table "public"."release_artists" to "service_role";

grant delete on table "public"."release_genres" to "anon";

grant insert on table "public"."release_genres" to "anon";

grant references on table "public"."release_genres" to "anon";

grant select on table "public"."release_genres" to "anon";

grant trigger on table "public"."release_genres" to "anon";

grant truncate on table "public"."release_genres" to "anon";

grant update on table "public"."release_genres" to "anon";

grant delete on table "public"."release_genres" to "authenticated";

grant insert on table "public"."release_genres" to "authenticated";

grant references on table "public"."release_genres" to "authenticated";

grant select on table "public"."release_genres" to "authenticated";

grant trigger on table "public"."release_genres" to "authenticated";

grant truncate on table "public"."release_genres" to "authenticated";

grant update on table "public"."release_genres" to "authenticated";

grant delete on table "public"."release_genres" to "postgres";

grant insert on table "public"."release_genres" to "postgres";

grant references on table "public"."release_genres" to "postgres";

grant select on table "public"."release_genres" to "postgres";

grant trigger on table "public"."release_genres" to "postgres";

grant truncate on table "public"."release_genres" to "postgres";

grant update on table "public"."release_genres" to "postgres";

grant delete on table "public"."release_genres" to "service_role";

grant insert on table "public"."release_genres" to "service_role";

grant references on table "public"."release_genres" to "service_role";

grant select on table "public"."release_genres" to "service_role";

grant trigger on table "public"."release_genres" to "service_role";

grant truncate on table "public"."release_genres" to "service_role";

grant update on table "public"."release_genres" to "service_role";

grant delete on table "public"."release_tracks" to "anon";

grant insert on table "public"."release_tracks" to "anon";

grant references on table "public"."release_tracks" to "anon";

grant select on table "public"."release_tracks" to "anon";

grant trigger on table "public"."release_tracks" to "anon";

grant truncate on table "public"."release_tracks" to "anon";

grant update on table "public"."release_tracks" to "anon";

grant delete on table "public"."release_tracks" to "authenticated";

grant insert on table "public"."release_tracks" to "authenticated";

grant references on table "public"."release_tracks" to "authenticated";

grant select on table "public"."release_tracks" to "authenticated";

grant trigger on table "public"."release_tracks" to "authenticated";

grant truncate on table "public"."release_tracks" to "authenticated";

grant update on table "public"."release_tracks" to "authenticated";

grant delete on table "public"."release_tracks" to "postgres";

grant insert on table "public"."release_tracks" to "postgres";

grant references on table "public"."release_tracks" to "postgres";

grant select on table "public"."release_tracks" to "postgres";

grant trigger on table "public"."release_tracks" to "postgres";

grant truncate on table "public"."release_tracks" to "postgres";

grant update on table "public"."release_tracks" to "postgres";

grant delete on table "public"."release_tracks" to "service_role";

grant insert on table "public"."release_tracks" to "service_role";

grant references on table "public"."release_tracks" to "service_role";

grant select on table "public"."release_tracks" to "service_role";

grant trigger on table "public"."release_tracks" to "service_role";

grant truncate on table "public"."release_tracks" to "service_role";

grant update on table "public"."release_tracks" to "service_role";

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

grant delete on table "public"."releases" to "postgres";

grant insert on table "public"."releases" to "postgres";

grant references on table "public"."releases" to "postgres";

grant select on table "public"."releases" to "postgres";

grant trigger on table "public"."releases" to "postgres";

grant truncate on table "public"."releases" to "postgres";

grant update on table "public"."releases" to "postgres";

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

grant delete on table "public"."track_artists" to "postgres";

grant insert on table "public"."track_artists" to "postgres";

grant references on table "public"."track_artists" to "postgres";

grant select on table "public"."track_artists" to "postgres";

grant trigger on table "public"."track_artists" to "postgres";

grant truncate on table "public"."track_artists" to "postgres";

grant update on table "public"."track_artists" to "postgres";

grant delete on table "public"."track_artists" to "service_role";

grant insert on table "public"."track_artists" to "service_role";

grant references on table "public"."track_artists" to "service_role";

grant select on table "public"."track_artists" to "service_role";

grant trigger on table "public"."track_artists" to "service_role";

grant truncate on table "public"."track_artists" to "service_role";

grant update on table "public"."track_artists" to "service_role";

grant delete on table "public"."track_genres" to "anon";

grant insert on table "public"."track_genres" to "anon";

grant references on table "public"."track_genres" to "anon";

grant select on table "public"."track_genres" to "anon";

grant trigger on table "public"."track_genres" to "anon";

grant truncate on table "public"."track_genres" to "anon";

grant update on table "public"."track_genres" to "anon";

grant delete on table "public"."track_genres" to "authenticated";

grant insert on table "public"."track_genres" to "authenticated";

grant references on table "public"."track_genres" to "authenticated";

grant select on table "public"."track_genres" to "authenticated";

grant trigger on table "public"."track_genres" to "authenticated";

grant truncate on table "public"."track_genres" to "authenticated";

grant update on table "public"."track_genres" to "authenticated";

grant delete on table "public"."track_genres" to "postgres";

grant insert on table "public"."track_genres" to "postgres";

grant references on table "public"."track_genres" to "postgres";

grant select on table "public"."track_genres" to "postgres";

grant trigger on table "public"."track_genres" to "postgres";

grant truncate on table "public"."track_genres" to "postgres";

grant update on table "public"."track_genres" to "postgres";

grant delete on table "public"."track_genres" to "service_role";

grant insert on table "public"."track_genres" to "service_role";

grant references on table "public"."track_genres" to "service_role";

grant select on table "public"."track_genres" to "service_role";

grant trigger on table "public"."track_genres" to "service_role";

grant truncate on table "public"."track_genres" to "service_role";

grant update on table "public"."track_genres" to "service_role";

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

grant delete on table "public"."tracks" to "postgres";

grant insert on table "public"."tracks" to "postgres";

grant references on table "public"."tracks" to "postgres";

grant select on table "public"."tracks" to "postgres";

grant trigger on table "public"."tracks" to "postgres";

grant truncate on table "public"."tracks" to "postgres";

grant update on table "public"."tracks" to "postgres";

grant delete on table "public"."tracks" to "service_role";

grant insert on table "public"."tracks" to "service_role";

grant references on table "public"."tracks" to "service_role";

grant select on table "public"."tracks" to "service_role";

grant trigger on table "public"."tracks" to "service_role";

grant truncate on table "public"."tracks" to "service_role";

grant update on table "public"."tracks" to "service_role";


