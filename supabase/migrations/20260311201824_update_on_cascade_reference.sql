alter table "public"."artists_genres" drop constraint "artist_genres_artist_id_fkey";

alter table "public"."artists_genres" drop constraint "artist_genres_genre_id_fkey";

alter table "public"."comments" drop constraint "comments_parent_id_fkey";

alter table "public"."comments" drop constraint "comments_release_id_fkey";

alter table "public"."comments" drop constraint "comments_user_id_fkey";

alter table "public"."release_artists" drop constraint "release_artists_artist_id_fkey";

alter table "public"."release_artists" drop constraint "release_artists_release_id_fkey";

alter table "public"."release_genres" drop constraint "release_genres_genre_id_fkey";

alter table "public"."release_genres" drop constraint "release_genres_release_id_fkey";

alter table "public"."release_tracks" drop constraint "release_tracks_release_id_fkey";

alter table "public"."release_tracks" drop constraint "release_tracks_track_id_fkey";

alter table "public"."track_artists" drop constraint "track_artists_artist_id_fkey";

alter table "public"."track_artists" drop constraint "track_artists_track_id_fkey";

alter table "public"."artists_genres" add constraint "artists_genres_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."artists_genres" validate constraint "artists_genres_artist_id_fkey";

alter table "public"."artists_genres" add constraint "artists_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."artists_genres" validate constraint "artists_genres_genre_id_fkey";

alter table "public"."comments" add constraint "comments_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES public.comments(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_parent_id_fkey";

alter table "public"."comments" add constraint "comments_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_release_id_fkey";

alter table "public"."comments" add constraint "comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."comments" validate constraint "comments_user_id_fkey";

alter table "public"."release_artists" add constraint "release_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."release_artists" validate constraint "release_artists_artist_id_fkey";

alter table "public"."release_artists" add constraint "release_artists_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."release_artists" validate constraint "release_artists_release_id_fkey";

alter table "public"."release_genres" add constraint "release_genres_genre_id_fkey" FOREIGN KEY (genre_id) REFERENCES public.genres(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."release_genres" validate constraint "release_genres_genre_id_fkey";

alter table "public"."release_genres" add constraint "release_genres_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."release_genres" validate constraint "release_genres_release_id_fkey";

alter table "public"."release_tracks" add constraint "release_tracks_release_id_fkey" FOREIGN KEY (release_id) REFERENCES public.releases(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."release_tracks" validate constraint "release_tracks_release_id_fkey";

alter table "public"."release_tracks" add constraint "release_tracks_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."release_tracks" validate constraint "release_tracks_track_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_artist_id_fkey" FOREIGN KEY (artist_id) REFERENCES public.artists(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."track_artists" validate constraint "track_artists_artist_id_fkey";

alter table "public"."track_artists" add constraint "track_artists_track_id_fkey" FOREIGN KEY (track_id) REFERENCES public.tracks(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."track_artists" validate constraint "track_artists_track_id_fkey";


