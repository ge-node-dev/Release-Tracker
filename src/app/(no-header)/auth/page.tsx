import { Suspense } from 'react';

import AuthContent from '@/modules/auth/components/AuthContent';

import styles from './AuthPage.module.scss';

const AuthPage = () => {
   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.authCard}>
               <Suspense>
                  <AuthContent />
               </Suspense>
            </div>
         </div>
      </div>
   );
};

export default AuthPage;
