create type "public"."activity_type" as enum ('comment', 'rating');


  create table "public"."release_ratings" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "release_id" uuid not null,
    "rating" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."release_ratings" enable row level security;


  create table "public"."user_activity" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "activity_type" public.activity_type not null,
    "release_id" uuid,
    "comment_id" uuid,
    "rating_id" uuid,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."user_activity" enable row level security;

CREATE INDEX idx_release_ratings_created_at ON public.release_ratings USING btree (created_at DESC);

CREATE INDEX idx_release_ratings_release_id ON public.release_ratings USING btree (release_id);

CREATE INDEX idx_release_ratings_user_id ON public.release_ratings USING btree (user_id);

CREATE INDEX idx_user_activity_created_at ON public.user_activity USING btree (created_at DESC);

CREATE INDEX idx_user_activity_type ON public.user_activity USING btree (activity_type);

CREATE INDEX idx_user_activity_user_created ON public.user_activity USING btree (user_id, created_at DESC);

CREATE INDEX idx_user_activity_user_id ON public.user_activity USING btree (user_id);

CREATE UNIQUE INDEX release_ratings_pkey ON public.release_ratings USING btree (id);

CREATE UNIQUE INDEX unique_user_release_rating ON public.release_ratings USING btree (user_id, release_id);

CREATE UNIQUE INDEX user_activity_pkey ON public.user_activity USING btree (id);

alter table "public"."release_ratings" add constraint "release_ratings_pkey" PRIMARY KEY using index "release_ratings_pkey";

alter table "public"."user_activity" add constraint "user_activity_pkey" PRIMARY KEY using index "user_activity_pkey";

alter table "public"."release_ratings" add constraint "release_ratings_rating_check" CHECK (((rating >= 0) AND (rating <= 10))) not valid;

alter table "public"."release_ratings" validate constraint "release_ratings_rating_check";

alter table "public"."release_ratings" add constraint "release_ratings_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON DELETE CASCADE not valid;

alter table "public"."release_ratings" validate constraint "release_ratings_release_id_fkey";

alter table "public"."release_ratings" add constraint "release_ratings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."release_ratings" validate constraint "release_ratings_user_id_fkey";

alter table "public"."release_ratings" add constraint "unique_user_release_rating" UNIQUE using index "unique_user_release_rating";

alter table "public"."user_activity" add constraint "user_activity_comment_id_fkey" FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE SET NULL not valid;

alter table "public"."user_activity" validate constraint "user_activity_comment_id_fkey";

alter table "public"."user_activity" add constraint "user_activity_rating_id_fkey" FOREIGN KEY (rating_id) REFERENCES public.release_ratings(id) ON DELETE SET NULL not valid;

alter table "public"."user_activity" validate constraint "user_activity_rating_id_fkey";

alter table "public"."user_activity" add constraint "user_activity_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON DELETE CASCADE not valid;

alter table "public"."user_activity" validate constraint "user_activity_release_id_fkey";

alter table "public"."user_activity" add constraint "user_activity_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE not valid;

alter table "public"."user_activity" validate constraint "user_activity_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_rating_cooldown(p_user_id uuid, p_release_id uuid)
 RETURNS TABLE(can_rate boolean, last_rated_at timestamp with time zone, cooldown_until timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
   RETURN QUERY
   SELECT 
      (last_rated_at IS NULL OR last_rated_at < (now() - INTERVAL '24 hours')) AS can_rate,
      last_rated_at,
      (last_rated_at + INTERVAL '24 hours') AS cooldown_until
   FROM (
      SELECT MAX(created_at) AS last_rated_at
      FROM public.release_ratings
      WHERE user_id = p_user_id AND release_id = p_release_id
   ) sub;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.log_comment_activity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
   INSERT INTO public.user_activity (user_id, activity_type, release_id, comment_id)
   VALUES (
      NEW.user_id,
      'comment'::activity_type,
      NEW.release_id,
      NEW.id
   );
   RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.log_rating_activity()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
   v_release_id uuid;
BEGIN
   SELECT release_id INTO v_release_id FROM public.release_ratings WHERE id = NEW.id;

   INSERT INTO public.user_activity (user_id, activity_type, release_id, rating_id)
   VALUES (
      NEW.user_id,
      'rating'::activity_type,
      v_release_id,
      NEW.id
   );
   RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_release_rating_avg()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
   target_release_id uuid;
BEGIN
   IF TG_OP = 'DELETE' THEN
      target_release_id := OLD.release_id;
   ELSE
      target_release_id := NEW.release_id;
   END IF;

   UPDATE public.releases
   SET 
      rating_avg = COALESCE((
         SELECT AVG(rating)::double precision
         FROM public.release_ratings
         WHERE release_id = target_release_id AND rating > 0
      ), 0),
      updated_at = now()
   WHERE id = target_release_id;

   RETURN NULL;
END;
$function$
;

CREATE TRIGGER trigger_log_comment_activity AFTER INSERT ON public.comments FOR EACH ROW EXECUTE FUNCTION public.log_comment_activity();

CREATE TRIGGER trigger_log_rating_activity AFTER INSERT ON public.release_ratings FOR EACH ROW EXECUTE FUNCTION public.log_rating_activity();

CREATE TRIGGER trigger_update_release_rating_avg AFTER INSERT OR DELETE OR UPDATE ON public.release_ratings FOR EACH ROW EXECUTE FUNCTION public.update_release_rating_avg();

grant all on table "public"."release_ratings" to "anon";

grant all on table "public"."release_ratings" to "authenticated";

grant all on table "public"."release_ratings" to "service_role";

grant select on table "public"."user_activity" to "anon";

grant select, delete on table "public"."user_activity" to "authenticated";


  create policy "Allow authenticated delete own rating"
  on "public"."release_ratings"
  as permissive
  for delete
  to authenticated
using ((user_id = auth.uid()));



  create policy "Allow authenticated insert own rating"
  on "public"."release_ratings"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "Allow authenticated update own rating"
  on "public"."release_ratings"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



  create policy "Allow public read ratings"
  on "public"."release_ratings"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Allow public read activity"
  on "public"."user_activity"
  as permissive
  for select
  to anon, authenticated
using (true);


