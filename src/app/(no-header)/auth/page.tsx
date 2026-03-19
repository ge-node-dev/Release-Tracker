import type { Metadata } from 'next';

import AuthContent from '@/modules/auth/components/AuthContent';

import styles from './AuthPage.module.scss';

export const metadata: Metadata = { robots: { index: false, follow: false } };

const AuthPage = () => {
   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.authCard}>
               <AuthContent isModalWrapper={false} />
            </div>
         </div>
      </div>
   );
};

export default AuthPage;
