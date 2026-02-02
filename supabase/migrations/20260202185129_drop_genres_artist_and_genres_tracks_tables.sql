revoke delete on table "public"."artists_genres" from "anon";

revoke insert on table "public"."artists_genres" from "anon";

revoke references on table "public"."artists_genres" from "anon";

revoke select on table "public"."artists_genres" from "anon";

revoke trigger on table "public"."artists_genres" from "anon";

revoke truncate on table "public"."artists_genres" from "anon";

revoke update on table "public"."artists_genres" from "anon";

revoke delete on table "public"."artists_genres" from "authenticated";

revoke insert on table "public"."artists_genres" from "authenticated";

revoke references on table "public"."artists_genres" from "authenticated";

revoke select on table "public"."artists_genres" from "authenticated";

revoke trigger on table "public"."artists_genres" from "authenticated";

revoke truncate on table "public"."artists_genres" from "authenticated";

revoke update on table "public"."artists_genres" from "authenticated";

revoke delete on table "public"."artists_genres" from "service_role";

revoke insert on table "public"."artists_genres" from "service_role";

revoke references on table "public"."artists_genres" from "service_role";

revoke select on table "public"."artists_genres" from "service_role";

revoke trigger on table "public"."artists_genres" from "service_role";

revoke truncate on table "public"."artists_genres" from "service_role";

revoke update on table "public"."artists_genres" from "service_role";

revoke delete on table "public"."track_genres" from "anon";

revoke insert on table "public"."track_genres" from "anon";

revoke references on table "public"."track_genres" from "anon";

revoke select on table "public"."track_genres" from "anon";

revoke trigger on table "public"."track_genres" from "anon";

revoke truncate on table "public"."track_genres" from "anon";

revoke update on table "public"."track_genres" from "anon";

revoke delete on table "public"."track_genres" from "authenticated";

revoke insert on table "public"."track_genres" from "authenticated";

revoke references on table "public"."track_genres" from "authenticated";

revoke select on table "public"."track_genres" from "authenticated";

revoke trigger on table "public"."track_genres" from "authenticated";

revoke truncate on table "public"."track_genres" from "authenticated";

revoke update on table "public"."track_genres" from "authenticated";

revoke delete on table "public"."track_genres" from "service_role";

revoke insert on table "public"."track_genres" from "service_role";

revoke references on table "public"."track_genres" from "service_role";

revoke select on table "public"."track_genres" from "service_role";

revoke trigger on table "public"."track_genres" from "service_role";

revoke truncate on table "public"."track_genres" from "service_role";

revoke update on table "public"."track_genres" from "service_role";

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