import AuthContent from '@/modules/auth/components/AuthContent';

import styles from './AuthPage.module.scss';

const AuthPage = () => {
   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.authCard}>
               <AuthContent />
            </div>
         </div>
      </div>
   );
};

export default AuthPage;
