'use client';
import ActionButton from '@/shared/ui/Buttons/ActionButton';

import styles from './AuthHeaderTabs.module.scss';

interface AuthHeaderTabsProps {
   isLoginTab: boolean;
   isFormPending: boolean;
   setActiveTab: (tab: 'login' | 'register') => void;
}

const AuthHeaderTabs = ({ isLoginTab, setActiveTab, isFormPending }: AuthHeaderTabsProps) => {
   return (
      <div className={styles.headerButtons}>
         <ActionButton
            disabled={isFormPending}
            onClick={() => setActiveTab('login')}
            variant={isLoginTab ? 'filled' : 'transparent'}
         >
            Login
         </ActionButton>
         <ActionButton
            disabled={isFormPending}
            onClick={() => setActiveTab('register')}
            variant={!isLoginTab ? 'filled' : 'transparent'}
         >
            Register
         </ActionButton>
      </div>
   );
};

export default AuthHeaderTabs;
