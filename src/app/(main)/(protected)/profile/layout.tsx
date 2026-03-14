import { Suspense } from 'react';

import ProfileAsideNav from '@/modules/profile/components/ProfileAsideNav';

import styles from './Profile.module.scss';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className={styles.profilePageContainer}>
         <div className={styles.content}>
            <aside className={styles.sidebar}>
               <Suspense>
                  <ProfileAsideNav />
               </Suspense>
            </aside>

            <div className={styles.mainStage}>{children}</div>
         </div>
      </div>
   );
};

export default ProfileLayout;
