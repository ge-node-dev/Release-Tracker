import Link from 'next/link';

import { getProfile } from '@/modules/profile/services/profileActions';
import { AVATAR_WIDTHS_BY_SIZE, ROUTES } from '@/shared/constants';
import { Avatar } from '@/shared/ui/Avatar';
import { UserIcon } from '@/shared/ui/Icons';

import styles from './HeaderProfile.module.scss';

const HeaderProfile = async () => {
   const { profile } = await getProfile();
   const isAuthenticated = !!profile;

   return (
      <Link
         scroll={false}
         className={styles.profileButton}
         aria-label={isAuthenticated ? 'Profile' : 'Login'}
         href={isAuthenticated ? ROUTES.PROFILE : ROUTES.AUTH}
      >
         {profile?.avatar_url ? (
            <Avatar size="extraSmall" alt={profile.username} avatarUrl={profile.avatar_url} />
         ) : (
            <UserIcon
               aria-label="User"
               width={AVATAR_WIDTHS_BY_SIZE.extraSmall}
               height={AVATAR_WIDTHS_BY_SIZE.extraSmall}
            />
         )}
      </Link>
   );
};

export default HeaderProfile;
