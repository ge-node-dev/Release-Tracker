
  create policy "Enable read access for all users"
  on "public"."genres"
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



