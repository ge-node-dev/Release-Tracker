'use client';
import ActionButton from '@/shared/ui/Buttons/ActionButton';

import { FormStatus } from '../AuthContent';

import styles from './AuthHeaderTabs.module.scss';

interface AuthHeaderTabsProps {
   isLoginTab: boolean;
   formStatus: FormStatus;
   setActiveTab: (tab: 'login' | 'register') => void;
}

const AuthHeaderTabs = ({ formStatus, isLoginTab, setActiveTab }: AuthHeaderTabsProps) => {
   if (formStatus.isSuccess) return null;

   return (
      <div className={styles.headerButtons}>
         <ActionButton
            disabled={formStatus.isPending}
            onClick={() => setActiveTab('login')}
            variant={isLoginTab ? 'filled' : 'transparent'}
         >
            Login
         </ActionButton>
         <ActionButton
            disabled={formStatus.isPending}
            onClick={() => setActiveTab('register')}
            variant={!isLoginTab ? 'filled' : 'transparent'}
         >
            Register
         </ActionButton>
      </div>
   );
};

export default AuthHeaderTabs;
