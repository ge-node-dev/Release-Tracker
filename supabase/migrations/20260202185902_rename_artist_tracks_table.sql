revoke delete on table "public"."track_artists" from "anon";

revoke insert on table "public"."track_artists" from "anon";

revoke references on table "public"."track_artists" from "anon";

revoke select on table "public"."track_artists" from "anon";

revoke trigger on table "public"."track_artists" from "anon";

revoke truncate on table "public"."track_artists" from "anon";

revoke update on table "public"."track_artists" from "anon";

revoke delete on table "public"."track_artists" from "authenticated";

revoke insert on table "public"."track_artists" from "authenticated";

revoke references on table "public"."track_artists" from "authenticated";

revoke select on table "public"."track_artists" from "authenticated";

revoke trigger on table "public"."track_artists" from "authenticated";

revoke truncate on table "public"."track_artists" from "authenticated";

revoke update on table "public"."track_artists" from "authenticated";

revoke delete on table "public"."track_artists" from "service_role";

revoke insert on table "public"."track_artists" from "service_role";

revoke references on table "public"."track_artists" from "service_role";

revoke select on table "public"."track_artists" from "service_role";

revoke trigger on table "public"."track_artists" from "service_role";

revoke truncate on table "public"."track_artists" from "service_role";

revoke update on table "public"."track_artists" from "service_role";

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

grant delete on table "public"."artist_tracks" to "anon";

grant insert on table "public"."artist_tracks" to "anon";

grant references on table "public"."artist_tracks" to "anon";

grant select on table "public"."artist_tracks" to "anon";

grant trigger on table "public"."artist_tracks" to "anon";

grant truncate on table "public"."artist_tracks" to "anon";

grant update on table "public"."artist_tracks" to "anon";

grant delete on table "public"."artist_tracks" to "authenticated";

grant insert on table "public"."artist_tracks" to "authenticated";

grant references on table "public"."artist_tracks" to "authenticated";

grant select on table "public"."artist_tracks" to "authenticated";

grant trigger on table "public"."artist_tracks" to "authenticated";

grant truncate on table "public"."artist_tracks" to "authenticated";

grant update on table "public"."artist_tracks" to "authenticated";

grant delete on table "public"."artist_tracks" to "service_role";

grant insert on table "public"."artist_tracks" to "service_role";

grant references on table "public"."artist_tracks" to "service_role";

grant select on table "public"."artist_tracks" to "service_role";

grant trigger on table "public"."artist_tracks" to "service_role";

grant truncate on table "public"."artist_tracks" to "service_role";

grant update on table "public"."artist_tracks" to "service_role";