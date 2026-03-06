import { Suspense } from 'react';

import ProfileInfo from '@/modules/profile/components/ProfileInfo';

import styles from './Profile.module.scss';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className={styles.profilePageContainer}>
         <div className={styles.vLineContent} />
         <div className={styles.vLineRight} />
         <aside className={styles.sidebar}>
            <Suspense>
               <ProfileInfo />
            </Suspense>
         </aside>

         <div className={styles.mainStage}>
            <div className={styles.headerLockup}>
               <p className={styles.subtitle}>Configuration Panel</p>
               <h2 className={styles.title}>Profile</h2>
            </div>
            <div className={styles.mainContent}>{children}</div>
         </div>
      </div>
   );
};

export default ProfileLayout;
