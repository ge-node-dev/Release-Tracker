import { Suspense } from 'react';

import AsideNav from '@/modules/profile/components/AsideNav';

import styles from './Profile.module.scss';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className={styles.profilePageContainer}>
         <div className={styles.content}>
            <aside className={styles.sidebar}>
               <Suspense>
                  <AsideNav />
               </Suspense>
            </aside>

            <div className={styles.mainStage}>{children}</div>
         </div>
      </div>
   );
};

export default ProfileLayout;
