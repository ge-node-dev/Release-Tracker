import Link from 'next/link';

import { getProfile } from '@/modules/profile/services/profileActions';
import { ROUTES } from '@/shared/constants';
import { Avatar } from '@/shared/ui/Avatar';
import { UnassignedUser } from '@/shared/ui/UnassignedUser/UnassignedUser';

import styles from './HeaderProfile.module.scss';

const HeaderProfile = async () => {
   const { profile } = await getProfile();
   const isAuthenticated = !!profile;

   return (
      <Link
         className={styles.profileButton}
         aria-label={isAuthenticated ? 'Profile' : 'Login'}
         href={isAuthenticated ? ROUTES.PROFILE : ROUTES.AUTH}
      >
         {profile?.avatar_url ? (
            <Avatar size="extraSmall" alt={profile.username} avatarUrl={profile.avatar_url} />
         ) : (
            <UnassignedUser />
         )}
      </Link>
   );
};

export default HeaderProfile;
