'use client';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Tabs from '@/shared/ui/Tabs';

import { FormStatus } from '../AuthContent';

interface AuthFormTabsProps {
   isLoginTab: boolean;
   formStatus: FormStatus;
   setActiveTab: (tab: 'login' | 'register') => void;
}

const AuthFormTabs = ({ formStatus, isLoginTab, setActiveTab }: AuthFormTabsProps) => {
   if (formStatus.isSuccess) return null;

   return (
      <Tabs>
         <ActionButton
            disabled={formStatus.isPending}
            onClick={() => setActiveTab('login')}
            variant={isLoginTab ? 'secondary' : 'primary'}
         >
            Login
         </ActionButton>
         <ActionButton
            disabled={formStatus.isPending}
            onClick={() => setActiveTab('register')}
            variant={!isLoginTab ? 'secondary' : 'primary'}
         >
            Register
         </ActionButton>
      </Tabs>
   );
};

export default AuthFormTabs;
