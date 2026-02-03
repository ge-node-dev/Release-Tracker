revoke delete on table "public"."artist_tracks" from "anon";

revoke insert on table "public"."artist_tracks" from "anon";

revoke references on table "public"."artist_tracks" from "anon";

revoke select on table "public"."artist_tracks" from "anon";

revoke trigger on table "public"."artist_tracks" from "anon";

revoke truncate on table "public"."artist_tracks" from "anon";

revoke update on table "public"."artist_tracks" from "anon";

revoke delete on table "public"."artist_tracks" from "authenticated";

revoke insert on table "public"."artist_tracks" from "authenticated";

revoke references on table "public"."artist_tracks" from "authenticated";

revoke select on table "public"."artist_tracks" from "authenticated";

revoke trigger on table "public"."artist_tracks" from "authenticated";

revoke truncate on table "public"."artist_tracks" from "authenticated";

revoke update on table "public"."artist_tracks" from "authenticated";

revoke delete on table "public"."artist_tracks" from "service_role";

revoke insert on table "public"."artist_tracks" from "service_role";

revoke references on table "public"."artist_tracks" from "service_role";

revoke select on table "public"."artist_tracks" from "service_role";

revoke trigger on table "public"."artist_tracks" from "service_role";

revoke truncate on table "public"."artist_tracks" from "service_role";

revoke update on table "public"."artist_tracks" from "service_role";

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

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.profiles (id, is_admin)
  values (new.id, false);
  return new;
end;
$function$
;

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

grant delete on table "public"."genres" to "postgres";

grant insert on table "public"."genres" to "postgres";

grant references on table "public"."genres" to "postgres";

grant select on table "public"."genres" to "postgres";

grant trigger on table "public"."genres" to "postgres";

grant truncate on table "public"."genres" to "postgres";

grant update on table "public"."genres" to "postgres";

grant delete on table "public"."release_genres" to "postgres";

grant insert on table "public"."release_genres" to "postgres";

grant references on table "public"."release_genres" to "postgres";

grant select on table "public"."release_genres" to "postgres";

grant trigger on table "public"."release_genres" to "postgres";

grant truncate on table "public"."release_genres" to "postgres";

grant update on table "public"."release_genres" to "postgres";

grant delete on table "public"."release_tracks" to "postgres";

grant insert on table "public"."release_tracks" to "postgres";

grant references on table "public"."release_tracks" to "postgres";

grant select on table "public"."release_tracks" to "postgres";

grant trigger on table "public"."release_tracks" to "postgres";

grant truncate on table "public"."release_tracks" to "postgres";

grant update on table "public"."release_tracks" to "postgres";

grant delete on table "public"."releases" to "postgres";

grant insert on table "public"."releases" to "postgres";

grant references on table "public"."releases" to "postgres";

grant select on table "public"."releases" to "postgres";

grant trigger on table "public"."releases" to "postgres";

grant truncate on table "public"."releases" to "postgres";

grant update on table "public"."releases" to "postgres";

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


