set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.delete_tracks_on_release_delete()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  delete from public.tracks
  where id in (
    select rt.track_id
    from public.release_tracks rt
    where rt.release_id = old.id
      and not exists (
        select 1
        from public.release_tracks rt2
        where rt2.track_id = rt.track_id
          and rt2.release_id != old.id
      )
  );
  return old;
end;
$function$;

CREATE TRIGGER delete_tracks_on_release_delete BEFORE DELETE ON public.releases FOR EACH ROW EXECUTE FUNCTION public.delete_tracks_on_release_delete();


