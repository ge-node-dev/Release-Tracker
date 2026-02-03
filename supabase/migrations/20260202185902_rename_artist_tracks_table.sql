alter table "public"."track_artists" drop constraint "track_artists_artist_id_fkey";

alter table "public"."track_artists" drop constraint "track_artists_track_id_fkey";

alter table "public"."track_artists" drop constraint "track_artists_pkey";

drop index if exists "public"."track_artists_pkey";

drop table "public"."track_artists";


  create table "public"."artist_tracks" (
    "track_id" uuid not null,
    "artist_id" uuid not null
      );


alter table "public"."artist_tracks" enable row level security;

CREATE UNIQUE INDEX track_artists_pkey ON public.artist_tracks USING btree (track_id, artist_id);

alter table "public"."artist_tracks" add constraint "track_artists_pkey" PRIMARY KEY using index "track_artists_pkey";

alter table "public"."artist_tracks" add constraint "track_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON DELETE CASCADE not valid;

alter table "public"."artist_tracks" validate constraint "track_artists_artist_id_fkey";

alter table "public"."artist_tracks" add constraint "track_artists_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON DELETE CASCADE not valid;

alter table "public"."artist_tracks" validate constraint "track_artists_track_id_fkey";