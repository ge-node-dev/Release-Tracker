alter table "public"."artist_tracks" drop constraint "track_artists_artist_id_fkey";

alter table "public"."artist_tracks" drop constraint "track_artists_track_id_fkey";

alter table "public"."artist_tracks" drop constraint "track_artists_pkey";

drop index if exists "public"."track_artists_pkey";

drop table "public"."artist_tracks";


  create table "public"."artists_genres" (
    "artist_id" uuid not null,
    "genre_id" uuid not null
      );


alter table "public"."artists_genres" enable row level security;


  create table "public"."track_artists" (
    "track_id" uuid not null,
    "artist_id" uuid not null
      );


alter table "public"."track_artists" enable row level security;


  create table "public"."track_genres" (
    "track_id" uuid not null,
    "genre_id" uuid not null
      );


alter table "public"."track_genres" enable row level security;

alter table "public"."tracks" drop column "audio_preview";

alter table "public"."tracks" add column "deezer_track_id" bigint not null;

CREATE UNIQUE INDEX artist_genres_pkey ON public.artists_genres USING btree (artist_id, genre_id);

CREATE UNIQUE INDEX track_genres_pkey ON public.track_genres USING btree (track_id, genre_id);

CREATE UNIQUE INDEX track_artists_pkey ON public.track_artists USING btree (track_id, artist_id);

alter table "public"."artists_genres" add constraint "artist_genres_pkey" PRIMARY KEY using index "artist_genres_pkey";

alter table "public"."track_artists" add constraint "track_artists_pkey" PRIMARY KEY using index "track_artists_pkey";

alter table "public"."track_genres" add constraint "track_genres_pkey" PRIMARY KEY using index "track_genres_pkey";

alter table "public"."artists_genres" add constraint "artist_genres_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) not valid;

alter table "public"."artists_genres" validate constraint "artist_genres_artist_id_fkey";

alter table "public"."artists_genres" add constraint "artist_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) not valid;

alter table "public"."artists_genres" validate constraint "artist_genres_genre_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE not valid;

alter table "public"."track_artists" validate constraint "track_artists_artist_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON DELETE CASCADE not valid;

alter table "public"."track_artists" validate constraint "track_artists_track_id_fkey";

alter table "public"."track_genres" add constraint "track_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON DELETE CASCADE not valid;

alter table "public"."track_genres" validate constraint "track_genres_genre_id_fkey";

alter table "public"."track_genres" add constraint "track_genres_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON DELETE CASCADE not valid;

alter table "public"."track_genres" validate constraint "track_genres_track_id_fkey";