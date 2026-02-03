alter table "public"."release_tracks" add column "position" integer not null;

CREATE UNIQUE INDEX release_tracks_release_position_idx ON public.release_tracks USING btree (release_id, "position");


