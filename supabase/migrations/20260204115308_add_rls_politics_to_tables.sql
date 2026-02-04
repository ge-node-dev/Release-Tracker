alter table "public"."artists" enable row level security;

alter table "public"."artists_genres" enable row level security;

alter table "public"."comments" enable row level security;

alter table "public"."genres" enable row level security;

alter table "public"."profiles" enable row level security;

alter table "public"."release_artists" enable row level security;

alter table "public"."release_genres" enable row level security;

alter table "public"."release_tracks" enable row level security;

alter table "public"."releases" enable row level security;

alter table "public"."track_artists" enable row level security;

alter table "public"."track_genres" enable row level security;

alter table "public"."tracks" enable row level security;


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
  on "public"."profiles"
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



