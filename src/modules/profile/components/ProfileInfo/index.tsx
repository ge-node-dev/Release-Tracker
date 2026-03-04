import { redirect } from 'next/navigation';

import { getProfile } from '@/modules/profile/services/profileActions';
import { Avatar } from '@/shared/ui/Avatar';
import ChangeAvatarButton from '@/shared/ui/Buttons/ChangeAvatarButton';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import { ROUTES } from '@/shared/utils/constants';

import styles from './ProfileInfo.module.scss';

const ProfileInfo = async () => {
   const data = await getProfile();
   if (!data?.profile) redirect(ROUTES.AUTH);

   const {
      profile: { id, email, username, avatar_url, created_at },
   } = data;

   const userMemberSince = new Date(created_at).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
   });

   return (
      <div className={styles.profileHeader}>
         <div className={styles.avatarWrapper}>
            <Avatar size="large" avatarUrl={avatar_url} />
            <ChangeAvatarButton userId={id} />
         </div>
         <div className={styles.profileInfo}>
            <h1 className={styles.displayName}>{username}</h1>
            <p className={styles.email}>{email}</p>
            <p className={styles.memberSince}>Member since {userMemberSince}</p>

            {username && (
               <LinkButton variant="textLink" href={`/user/${username}`} ariaLabel="View public profile">
                  View public profile
               </LinkButton>
            )}
         </div>
      </div>
   );
};

export default ProfileInfo;
