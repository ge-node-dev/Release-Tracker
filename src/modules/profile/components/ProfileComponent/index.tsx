import { createSupabaseServerClient } from '@/lib/supabase/server';
import LogoutButton from '@/shared/ui/Buttons/LogoutButton';

import styles from './ProfileComponent.module.scss';

const ProfileComponent = async () => {
   const supabase = await createSupabaseServerClient();

   const {
      data: { user },
   } = await supabase.auth.getUser();

   return (
      <section className={styles.container}>
         <h1>Profile</h1>
         <p>{user?.email}</p>
         <LogoutButton />
      </section>
   );
};

export default ProfileComponent;
