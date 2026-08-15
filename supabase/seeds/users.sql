-- Password for every account below: password123

do $$
declare
   seed_user record;
begin
   -- One user per iteration: handle_new_user() inserts username '', so a second row would
   -- collide on profiles_username_key before the profile row below is replaced.
   for seed_user in
      select *
      from (values
         ('00000000-0000-4000-8000-000000000001'::uuid, 'admin@local.dev', true),
         ('00000000-0000-4000-8000-000000000002'::uuid, 'user@local.dev', false),
         ('00000000-0000-4000-8000-000000000003'::uuid, 'critic@local.dev', false)
      ) as u(id, email, is_admin)
   loop
      if exists (select 1 from auth.users where id = seed_user.id) then
         continue;
      end if;

      insert into auth.users (
         id, instance_id, aud, role, email, encrypted_password,
         email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data
      )
      values (
         seed_user.id,
         '00000000-0000-0000-0000-000000000000',
         'authenticated',
         'authenticated',
         seed_user.email,
         crypt('password123', gen_salt('bf')),
         now(), now(), now(),
         '{"provider":"email","providers":["email"]}',
         '{}'
      );

      -- Replacing the trigger-inserted row instead of updating it: prevent_admin_change() is a
      -- BEFORE UPDATE trigger, so an INSERT is the only way to set is_admin without disabling it.
      delete from public.profiles where id = seed_user.id;

      insert into public.profiles (id, username, email, is_admin)
      values (seed_user.id, split_part(seed_user.email, '@', 1), seed_user.email, seed_user.is_admin);

      insert into auth.identities (
         id, user_id, provider_id, provider, identity_data,
         last_sign_in_at, created_at, updated_at
      )
      values (
         gen_random_uuid(),
         seed_user.id,
         seed_user.id::text,
         'email',
         json_build_object('sub', seed_user.id::text, 'email', seed_user.email),
         now(), now(), now()
      );
   end loop;
end $$;

-- Silently inserts nothing unless catalog_data.sql seeded releases first.
insert into public.release_ratings (user_id, release_id, rating)
select u.id, r.id, 5 + (row_number() over (order by r.created_at)) % 6
from auth.users u
cross join lateral (select id, created_at from public.releases order by created_at desc limit 3) r
where u.email in ('user@local.dev', 'critic@local.dev')
on conflict (user_id, release_id) do nothing;

insert into public.comments (release_id, user_id, content)
select r.id, u.id, 'Local seed comment for testing.'
from auth.users u
cross join lateral (select id from public.releases order by created_at desc limit 2) r
where u.email = 'critic@local.dev';
