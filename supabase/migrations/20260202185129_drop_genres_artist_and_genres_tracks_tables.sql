alter table "public"."artists_genres" drop constraint "artist_genres_artist_id_fkey";

alter table "public"."artists_genres" drop constraint "artist_genres_genre_id_fkey";

alter table "public"."track_genres" drop constraint "track_genres_genre_id_fkey";

alter table "public"."track_genres" drop constraint "track_genres_track_id_fkey";

alter table "public"."artists_genres" drop constraint "artist_genres_pkey";

alter table "public"."track_genres" drop constraint "track_genres_pkey";

drop index if exists "public"."artist_genres_pkey";

drop index if exists "public"."track_genres_pkey";

drop table "public"."artists_genres";

drop table "public"."track_genres";