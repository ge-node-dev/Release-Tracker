alter table "public"."profiles" add column "avatar_url" text;

alter table "public"."profiles" add column "username" text not null default ''::text;

alter table "public"."profiles" add column "email" text not null default ''::text;

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";