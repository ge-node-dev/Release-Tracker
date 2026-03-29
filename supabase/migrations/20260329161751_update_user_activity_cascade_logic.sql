alter table "public"."user_activity" drop constraint "user_activity_comment_id_fkey";

alter table "public"."user_activity" drop constraint "user_activity_rating_id_fkey";

alter table "public"."user_activity" drop constraint "user_activity_release_id_fkey";

alter table "public"."user_activity" drop constraint "user_activity_user_id_fkey";

alter table "public"."user_activity" add constraint "user_activity_comment_id_fkey" FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_activity" validate constraint "user_activity_comment_id_fkey";

alter table "public"."user_activity" add constraint "user_activity_rating_id_fkey" FOREIGN KEY (rating_id) REFERENCES public.release_ratings(id) ON DELETE CASCADE not valid;

alter table "public"."user_activity" validate constraint "user_activity_rating_id_fkey";

alter table "public"."user_activity" add constraint "user_activity_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_activity" validate constraint "user_activity_release_id_fkey";

alter table "public"."user_activity" add constraint "user_activity_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user_activity" validate constraint "user_activity_user_id_fkey";


