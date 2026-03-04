import { Suspense } from 'react';

import ProfileInfo from '@/modules/profile/components/ProfileInfo';
import ProfileTabs from '@/modules/profile/components/ProfileTabs';
import LogoutButton from '@/shared/ui/Buttons/LogoutButton';

import styles from './Profile.module.scss';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className={styles.profilePageContainer}>
         <ProfileTabs />
         <div className={styles.profileContent}>
            <Suspense>
               <ProfileInfo />
            </Suspense>
            {children}
            <LogoutButton size="medium" variant="filled" />
         </div>
      </div>
   );
};

export default ProfileLayout;
