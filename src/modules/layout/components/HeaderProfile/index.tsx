import Link from 'next/link';

import { getProfile } from '@/modules/profile/services/profileActions';
import { Avatar } from '@/shared/ui/Avatar';
import { UserIcon } from '@/shared/ui/Icons';
import { ROUTES } from '@/shared/utils/constants';

import styles from './HeaderProfile.module.scss';

const Icon = () => <UserIcon width={14} height={14} aria-label="User" />;

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
            <Avatar size="small" alt={profile.username} avatarUrl={profile.avatar_url} />
         ) : (
            <Icon />
         )}
      </Link>
   );
};

export default HeaderProfile;
