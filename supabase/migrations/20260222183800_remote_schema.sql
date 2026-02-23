drop policy "Enable read access for all users" on "public"."artists";

drop policy "Enable read access for all users" on "public"."artists_genres";

drop policy "Enable read access for all users" on "public"."comments";

drop policy "Enable read access for all users" on "public"."genres";

drop policy "Enable read access for all users" on "public"."profiles";

drop policy "Enable read access for all users" on "public"."release_artists";

drop policy "Enable read access for all users" on "public"."release_genres";

drop policy "Enable read access for all users" on "public"."release_tracks";

drop policy "Enable read access for all users" on "public"."releases";

drop policy "Enable read access for all users" on "public"."track_artists";

drop policy "Enable read access for all users" on "public"."track_genres";

drop policy "Enable read access for all users" on "public"."tracks";

revoke delete on table "public"."artists" from "anon";

revoke insert on table "public"."artists" from "anon";

revoke references on table "public"."artists" from "anon";

revoke trigger on table "public"."artists" from "anon";

revoke truncate on table "public"."artists" from "anon";

revoke update on table "public"."artists" from "anon";

revoke delete on table "public"."artists" from "authenticated";

revoke insert on table "public"."artists" from "authenticated";

revoke references on table "public"."artists" from "authenticated";

revoke trigger on table "public"."artists" from "authenticated";

revoke truncate on table "public"."artists" from "authenticated";

revoke update on table "public"."artists" from "authenticated";

revoke delete on table "public"."artists_genres" from "anon";

revoke insert on table "public"."artists_genres" from "anon";

revoke references on table "public"."artists_genres" from "anon";

revoke trigger on table "public"."artists_genres" from "anon";

revoke truncate on table "public"."artists_genres" from "anon";

revoke update on table "public"."artists_genres" from "anon";

revoke delete on table "public"."artists_genres" from "authenticated";

revoke insert on table "public"."artists_genres" from "authenticated";

revoke references on table "public"."artists_genres" from "authenticated";

revoke trigger on table "public"."artists_genres" from "authenticated";

revoke truncate on table "public"."artists_genres" from "authenticated";

revoke update on table "public"."artists_genres" from "authenticated";

revoke delete on table "public"."comments" from "anon";

revoke insert on table "public"."comments" from "anon";

revoke references on table "public"."comments" from "anon";

revoke trigger on table "public"."comments" from "anon";

revoke truncate on table "public"."comments" from "anon";

revoke update on table "public"."comments" from "anon";

revoke delete on table "public"."comments" from "authenticated";

revoke insert on table "public"."comments" from "authenticated";

revoke references on table "public"."comments" from "authenticated";

revoke trigger on table "public"."comments" from "authenticated";

revoke truncate on table "public"."comments" from "authenticated";

revoke update on table "public"."comments" from "authenticated";

revoke delete on table "public"."genres" from "anon";

revoke insert on table "public"."genres" from "anon";

revoke references on table "public"."genres" from "anon";

revoke trigger on table "public"."genres" from "anon";

revoke truncate on table "public"."genres" from "anon";

revoke update on table "public"."genres" from "anon";

revoke delete on table "public"."genres" from "authenticated";

revoke insert on table "public"."genres" from "authenticated";

revoke references on table "public"."genres" from "authenticated";

revoke trigger on table "public"."genres" from "authenticated";

revoke truncate on table "public"."genres" from "authenticated";

revoke update on table "public"."genres" from "authenticated";

revoke delete on table "public"."profiles" from "anon";

revoke insert on table "public"."profiles" from "anon";

revoke references on table "public"."profiles" from "anon";

revoke trigger on table "public"."profiles" from "anon";

revoke truncate on table "public"."profiles" from "anon";

revoke update on table "public"."profiles" from "anon";

revoke delete on table "public"."profiles" from "authenticated";

revoke insert on table "public"."profiles" from "authenticated";

revoke references on table "public"."profiles" from "authenticated";

revoke trigger on table "public"."profiles" from "authenticated";

revoke truncate on table "public"."profiles" from "authenticated";

revoke update on table "public"."profiles" from "authenticated";

revoke delete on table "public"."release_artists" from "anon";

revoke insert on table "public"."release_artists" from "anon";

revoke references on table "public"."release_artists" from "anon";

revoke trigger on table "public"."release_artists" from "anon";

revoke truncate on table "public"."release_artists" from "anon";

revoke update on table "public"."release_artists" from "anon";

revoke delete on table "public"."release_artists" from "authenticated";

revoke insert on table "public"."release_artists" from "authenticated";

revoke references on table "public"."release_artists" from "authenticated";

revoke trigger on table "public"."release_artists" from "authenticated";

revoke truncate on table "public"."release_artists" from "authenticated";

revoke update on table "public"."release_artists" from "authenticated";

revoke delete on table "public"."release_genres" from "anon";

revoke insert on table "public"."release_genres" from "anon";

revoke references on table "public"."release_genres" from "anon";

revoke trigger on table "public"."release_genres" from "anon";

revoke truncate on table "public"."release_genres" from "anon";

revoke update on table "public"."release_genres" from "anon";

revoke delete on table "public"."release_genres" from "authenticated";

revoke insert on table "public"."release_genres" from "authenticated";

revoke references on table "public"."release_genres" from "authenticated";

revoke trigger on table "public"."release_genres" from "authenticated";

revoke truncate on table "public"."release_genres" from "authenticated";

revoke update on table "public"."release_genres" from "authenticated";

revoke delete on table "public"."release_tracks" from "anon";

revoke insert on table "public"."release_tracks" from "anon";

revoke references on table "public"."release_tracks" from "anon";

revoke trigger on table "public"."release_tracks" from "anon";

revoke truncate on table "public"."release_tracks" from "anon";

revoke update on table "public"."release_tracks" from "anon";

revoke delete on table "public"."release_tracks" from "authenticated";

revoke insert on table "public"."release_tracks" from "authenticated";

revoke references on table "public"."release_tracks" from "authenticated";

revoke trigger on table "public"."release_tracks" from "authenticated";

revoke truncate on table "public"."release_tracks" from "authenticated";

revoke update on table "public"."release_tracks" from "authenticated";

revoke delete on table "public"."releases" from "anon";

revoke insert on table "public"."releases" from "anon";

revoke references on table "public"."releases" from "anon";

revoke trigger on table "public"."releases" from "anon";

revoke truncate on table "public"."releases" from "anon";

revoke update on table "public"."releases" from "anon";

revoke delete on table "public"."releases" from "authenticated";

revoke insert on table "public"."releases" from "authenticated";

revoke references on table "public"."releases" from "authenticated";

revoke trigger on table "public"."releases" from "authenticated";

revoke truncate on table "public"."releases" from "authenticated";

revoke update on table "public"."releases" from "authenticated";

revoke delete on table "public"."track_artists" from "anon";

revoke insert on table "public"."track_artists" from "anon";

revoke references on table "public"."track_artists" from "anon";

revoke trigger on table "public"."track_artists" from "anon";

revoke truncate on table "public"."track_artists" from "anon";

revoke update on table "public"."track_artists" from "anon";

revoke delete on table "public"."track_artists" from "authenticated";

revoke insert on table "public"."track_artists" from "authenticated";

revoke references on table "public"."track_artists" from "authenticated";

revoke trigger on table "public"."track_artists" from "authenticated";

revoke truncate on table "public"."track_artists" from "authenticated";

revoke update on table "public"."track_artists" from "authenticated";

revoke delete on table "public"."track_genres" from "anon";

revoke insert on table "public"."track_genres" from "anon";

revoke references on table "public"."track_genres" from "anon";

revoke trigger on table "public"."track_genres" from "anon";

revoke truncate on table "public"."track_genres" from "anon";

revoke update on table "public"."track_genres" from "anon";

revoke delete on table "public"."track_genres" from "authenticated";

revoke insert on table "public"."track_genres" from "authenticated";

revoke references on table "public"."track_genres" from "authenticated";

revoke trigger on table "public"."track_genres" from "authenticated";

revoke truncate on table "public"."track_genres" from "authenticated";

revoke update on table "public"."track_genres" from "authenticated";

revoke delete on table "public"."tracks" from "anon";

revoke insert on table "public"."tracks" from "anon";

revoke references on table "public"."tracks" from "anon";

revoke trigger on table "public"."tracks" from "anon";

revoke truncate on table "public"."tracks" from "anon";

revoke update on table "public"."tracks" from "anon";

revoke delete on table "public"."tracks" from "authenticated";

revoke insert on table "public"."tracks" from "authenticated";

revoke references on table "public"."tracks" from "authenticated";

revoke trigger on table "public"."tracks" from "authenticated";

revoke truncate on table "public"."tracks" from "authenticated";

revoke update on table "public"."tracks" from "authenticated";


  create policy "Allow public read for all"
  on "public"."artists"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."artists_genres"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."comments"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."genres"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."profiles"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."release_artists"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."release_genres"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."release_tracks"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."releases"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."track_artists"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."track_genres"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read for all"
  on "public"."tracks"
  as permissive
  for select
  to anon, authenticated
using (true);



