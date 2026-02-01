alter table "public"."tracks" drop constraint "tracks_release_id_fkey";


  create table "public"."artists_genres" (
    "artist_id" uuid not null,
    "genre_id" uuid not null
      );


alter table "public"."artists_genres" enable row level security;


  create table "public"."genres" (
    "id" uuid not null default gen_random_uuid(),
    "title" text,
    "external_key" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."genres" enable row level security;


  create table "public"."release_genres" (
    "release_id" uuid not null,
    "genre_id" uuid not null
      );


alter table "public"."release_genres" enable row level security;


  create table "public"."release_tracks" (
    "release_id" uuid not null,
    "track_id" uuid not null
      );


alter table "public"."release_tracks" enable row level security;


  create table "public"."track_genres" (
    "track_id" uuid not null,
    "genre_id" uuid not null
      );


alter table "public"."track_genres" enable row level security;

alter table "public"."artists" add column "created_at" timestamp with time zone default now();

alter table "public"."artists" add column "external_key" text not null;

alter table "public"."artists" add column "updated_at" timestamp with time zone default now();

alter table "public"."comments" alter column "content" drop not null;

alter table "public"."profiles" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."profiles" alter column "created_at" set not null;

alter table "public"."profiles" alter column "is_admin" set not null;

alter table "public"."releases" drop column "genres";

alter table "public"."releases" add column "external_key" text not null;

alter table "public"."releases" add column "fans_number" integer not null default 0;

alter table "public"."releases" add column "likes" smallint not null default 0;

alter table "public"."releases" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."releases" alter column "created_at" set not null;

alter table "public"."releases" alter column "rating_avg" set not null;

alter table "public"."releases" alter column "release_date" set not null;

alter table "public"."tracks" drop column "cover_url";

alter table "public"."tracks" drop column "genres";

alter table "public"."tracks" drop column "release_id";

alter table "public"."tracks" add column "audio_preview" text;

alter table "public"."tracks" add column "external_key" text not null;

alter table "public"."tracks" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."tracks" alter column "created_at" set not null;

CREATE UNIQUE INDEX artist_genres_pkey ON public.artists_genres USING btree (artist_id, genre_id);

CREATE UNIQUE INDEX artists_external_key_key ON public.artists USING btree (external_key);

CREATE UNIQUE INDEX genres_external_key_key ON public.genres USING btree (external_key);

CREATE UNIQUE INDEX genres_pkey ON public.genres USING btree (id);

CREATE UNIQUE INDEX release_genres_pkey ON public.release_genres USING btree (release_id, genre_id);

CREATE UNIQUE INDEX release_tracks_pkey ON public.release_tracks USING btree (release_id, track_id);

CREATE UNIQUE INDEX releases_external_key_key ON public.releases USING btree (external_key);

CREATE UNIQUE INDEX track_genres_pkey ON public.track_genres USING btree (track_id, genre_id);

CREATE UNIQUE INDEX tracks_external_key_key ON public.tracks USING btree (external_key);

alter table "public"."artists_genres" add constraint "artist_genres_pkey" PRIMARY KEY using index "artist_genres_pkey";

alter table "public"."genres" add constraint "genres_pkey" PRIMARY KEY using index "genres_pkey";

alter table "public"."release_genres" add constraint "release_genres_pkey" PRIMARY KEY using index "release_genres_pkey";

alter table "public"."release_tracks" add constraint "release_tracks_pkey" PRIMARY KEY using index "release_tracks_pkey";

alter table "public"."track_genres" add constraint "track_genres_pkey" PRIMARY KEY using index "track_genres_pkey";

alter table "public"."artists" add constraint "artists_external_key_key" UNIQUE using index "artists_external_key_key";

alter table "public"."artists_genres" add constraint "artist_genres_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) not valid;

alter table "public"."artists_genres" validate constraint "artist_genres_artist_id_fkey";

alter table "public"."artists_genres" add constraint "artist_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) not valid;

alter table "public"."artists_genres" validate constraint "artist_genres_genre_id_fkey";

alter table "public"."genres" add constraint "genres_external_key_key" UNIQUE using index "genres_external_key_key";

alter table "public"."release_genres" add constraint "release_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON DELETE CASCADE not valid;

alter table "public"."release_genres" validate constraint "release_genres_genre_id_fkey";

alter table "public"."release_genres" add constraint "release_genres_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON DELETE CASCADE not valid;

alter table "public"."release_genres" validate constraint "release_genres_release_id_fkey";

alter table "public"."release_tracks" add constraint "release_tracks_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON DELETE CASCADE not valid;

alter table "public"."release_tracks" validate constraint "release_tracks_release_id_fkey";

alter table "public"."release_tracks" add constraint "release_tracks_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON DELETE CASCADE not valid;

alter table "public"."release_tracks" validate constraint "release_tracks_track_id_fkey";

alter table "public"."releases" add constraint "releases_external_key_key" UNIQUE using index "releases_external_key_key";

alter table "public"."track_genres" add constraint "track_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON DELETE CASCADE not valid;

alter table "public"."track_genres" validate constraint "track_genres_genre_id_fkey";

alter table "public"."track_genres" add constraint "track_genres_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON DELETE CASCADE not valid;

alter table "public"."track_genres" validate constraint "track_genres_track_id_fkey";

alter table "public"."tracks" add constraint "tracks_external_key_key" UNIQUE using index "tracks_external_key_key";

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

grant delete on table "public"."releases" to "postgres";

grant insert on table "public"."releases" to "postgres";

grant references on table "public"."releases" to "postgres";

grant select on table "public"."releases" to "postgres";

grant trigger on table "public"."releases" to "postgres";

grant truncate on table "public"."releases" to "postgres";

grant update on table "public"."releases" to "postgres";

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


  create policy "Комменты видят все"
  on "public"."comments"
  as permissive
  for select
  to public
using (true);



  create policy "Только авторизованные юзеры могут"
  on "public"."comments"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Юзер или админ могут удалять комен"
  on "public"."comments"
  as permissive
  for delete
  to public
using (((( SELECT auth.uid() AS uid) = user_id) OR (EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = ( SELECT auth.uid() AS uid)) AND (profiles.is_admin = true))))));



  create policy "Юзер может изменять свои комменты"
  on "public"."comments"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) = user_id));



  create policy "Профили видят все"
  on "public"."profiles"
  as permissive
  for select
  to public
using (true);



  create policy "Юзер может изменять профиль, но не "
  on "public"."profiles"
  as permissive
  for update
  to public
using ((( SELECT auth.uid() AS uid) = id))
with check (((( SELECT auth.uid() AS uid) = id) AND (is_admin = ( SELECT profiles_1.is_admin
   FROM public.profiles profiles_1
  WHERE (profiles_1.id = ( SELECT auth.uid() AS uid))))));


CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


