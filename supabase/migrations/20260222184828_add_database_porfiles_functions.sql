drop policy "Allow public read for all" on "public"."artists";

drop policy "Allow public read for all" on "public"."artists_genres";

drop policy "Allow public read for all" on "public"."comments";

drop policy "Allow public read for all" on "public"."genres";

drop policy "Allow public read for all" on "public"."profiles";

drop policy "Allow public read for all" on "public"."release_artists";

drop policy "Allow public read for all" on "public"."release_genres";

drop policy "Allow public read for all" on "public"."release_tracks";

drop policy "Allow public read for all" on "public"."releases";

drop policy "Allow public read for all" on "public"."track_artists";

drop policy "Allow public read for all" on "public"."track_genres";

drop policy "Allow public read for all" on "public"."tracks";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.prevent_admin_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  new.is_admin = old.is_admin;
  return new;
end;
$function$
;

grant delete on table "public"."artists" to "anon";

grant insert on table "public"."artists" to "anon";

grant references on table "public"."artists" to "anon";

grant trigger on table "public"."artists" to "anon";

grant truncate on table "public"."artists" to "anon";

grant update on table "public"."artists" to "anon";

grant delete on table "public"."artists" to "authenticated";

grant insert on table "public"."artists" to "authenticated";

grant references on table "public"."artists" to "authenticated";

grant trigger on table "public"."artists" to "authenticated";

grant truncate on table "public"."artists" to "authenticated";

grant update on table "public"."artists" to "authenticated";

grant delete on table "public"."artists_genres" to "anon";

grant insert on table "public"."artists_genres" to "anon";

grant references on table "public"."artists_genres" to "anon";

grant trigger on table "public"."artists_genres" to "anon";

grant truncate on table "public"."artists_genres" to "anon";

grant update on table "public"."artists_genres" to "anon";

grant delete on table "public"."artists_genres" to "authenticated";

grant insert on table "public"."artists_genres" to "authenticated";

grant references on table "public"."artists_genres" to "authenticated";

grant trigger on table "public"."artists_genres" to "authenticated";

grant truncate on table "public"."artists_genres" to "authenticated";

grant update on table "public"."artists_genres" to "authenticated";

grant delete on table "public"."comments" to "anon";

grant insert on table "public"."comments" to "anon";

grant references on table "public"."comments" to "anon";

grant trigger on table "public"."comments" to "anon";

grant truncate on table "public"."comments" to "anon";

grant update on table "public"."comments" to "anon";

grant delete on table "public"."comments" to "authenticated";

grant insert on table "public"."comments" to "authenticated";

grant references on table "public"."comments" to "authenticated";

grant trigger on table "public"."comments" to "authenticated";

grant truncate on table "public"."comments" to "authenticated";

grant update on table "public"."comments" to "authenticated";

grant delete on table "public"."genres" to "anon";

grant insert on table "public"."genres" to "anon";

grant references on table "public"."genres" to "anon";

grant trigger on table "public"."genres" to "anon";

grant truncate on table "public"."genres" to "anon";

grant update on table "public"."genres" to "anon";

grant delete on table "public"."genres" to "authenticated";

grant insert on table "public"."genres" to "authenticated";

grant references on table "public"."genres" to "authenticated";

grant trigger on table "public"."genres" to "authenticated";

grant truncate on table "public"."genres" to "authenticated";

grant update on table "public"."genres" to "authenticated";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."release_artists" to "anon";

grant insert on table "public"."release_artists" to "anon";

grant references on table "public"."release_artists" to "anon";

grant trigger on table "public"."release_artists" to "anon";

grant truncate on table "public"."release_artists" to "anon";

grant update on table "public"."release_artists" to "anon";

grant delete on table "public"."release_artists" to "authenticated";

grant insert on table "public"."release_artists" to "authenticated";

grant references on table "public"."release_artists" to "authenticated";

grant trigger on table "public"."release_artists" to "authenticated";

grant truncate on table "public"."release_artists" to "authenticated";

grant update on table "public"."release_artists" to "authenticated";

grant delete on table "public"."release_genres" to "anon";

grant insert on table "public"."release_genres" to "anon";

grant references on table "public"."release_genres" to "anon";

grant trigger on table "public"."release_genres" to "anon";

grant truncate on table "public"."release_genres" to "anon";

grant update on table "public"."release_genres" to "anon";

grant delete on table "public"."release_genres" to "authenticated";

grant insert on table "public"."release_genres" to "authenticated";

grant references on table "public"."release_genres" to "authenticated";

grant trigger on table "public"."release_genres" to "authenticated";

grant truncate on table "public"."release_genres" to "authenticated";

grant update on table "public"."release_genres" to "authenticated";

grant delete on table "public"."release_tracks" to "anon";

grant insert on table "public"."release_tracks" to "anon";

grant references on table "public"."release_tracks" to "anon";

grant trigger on table "public"."release_tracks" to "anon";

grant truncate on table "public"."release_tracks" to "anon";

grant update on table "public"."release_tracks" to "anon";

grant delete on table "public"."release_tracks" to "authenticated";

grant insert on table "public"."release_tracks" to "authenticated";

grant references on table "public"."release_tracks" to "authenticated";

grant trigger on table "public"."release_tracks" to "authenticated";

grant truncate on table "public"."release_tracks" to "authenticated";

grant update on table "public"."release_tracks" to "authenticated";

grant delete on table "public"."releases" to "anon";

grant insert on table "public"."releases" to "anon";

grant references on table "public"."releases" to "anon";

grant trigger on table "public"."releases" to "anon";

grant truncate on table "public"."releases" to "anon";

grant update on table "public"."releases" to "anon";

grant delete on table "public"."releases" to "authenticated";

grant insert on table "public"."releases" to "authenticated";

grant references on table "public"."releases" to "authenticated";

grant trigger on table "public"."releases" to "authenticated";

grant truncate on table "public"."releases" to "authenticated";

grant update on table "public"."releases" to "authenticated";

grant delete on table "public"."track_artists" to "anon";

grant insert on table "public"."track_artists" to "anon";

grant references on table "public"."track_artists" to "anon";

grant trigger on table "public"."track_artists" to "anon";

grant truncate on table "public"."track_artists" to "anon";

grant update on table "public"."track_artists" to "anon";

grant delete on table "public"."track_artists" to "authenticated";

grant insert on table "public"."track_artists" to "authenticated";

grant references on table "public"."track_artists" to "authenticated";

grant trigger on table "public"."track_artists" to "authenticated";

grant truncate on table "public"."track_artists" to "authenticated";

grant update on table "public"."track_artists" to "authenticated";

grant delete on table "public"."track_genres" to "anon";

grant insert on table "public"."track_genres" to "anon";

grant references on table "public"."track_genres" to "anon";

grant trigger on table "public"."track_genres" to "anon";

grant truncate on table "public"."track_genres" to "anon";

grant update on table "public"."track_genres" to "anon";

grant delete on table "public"."track_genres" to "authenticated";

grant insert on table "public"."track_genres" to "authenticated";

grant references on table "public"."track_genres" to "authenticated";

grant trigger on table "public"."track_genres" to "authenticated";

grant truncate on table "public"."track_genres" to "authenticated";

grant update on table "public"."track_genres" to "authenticated";

grant delete on table "public"."tracks" to "anon";

grant insert on table "public"."tracks" to "anon";

grant references on table "public"."tracks" to "anon";

grant trigger on table "public"."tracks" to "anon";

grant truncate on table "public"."tracks" to "anon";

grant update on table "public"."tracks" to "anon";

grant delete on table "public"."tracks" to "authenticated";

grant insert on table "public"."tracks" to "authenticated";

grant references on table "public"."tracks" to "authenticated";

grant trigger on table "public"."tracks" to "authenticated";

grant truncate on table "public"."tracks" to "authenticated";

grant update on table "public"."tracks" to "authenticated";


  create policy "Enable read access for all users"
  on "public"."artists"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."artists_genres"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."comments"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."genres"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."profiles"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."release_artists"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."release_genres"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."release_tracks"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."releases"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."track_artists"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."track_genres"
  as permissive
  for select
  to public
using (true);



  create policy "Enable read access for all users"
  on "public"."tracks"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER lock_is_admin BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.prevent_admin_change();


