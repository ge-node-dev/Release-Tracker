'use client';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Tabs from '@/shared/ui/Tabs';

import { FormStatus } from '../AuthContent';

interface AuthFormTabsProps {
   activeTab: 'login' | 'register' | 'forgotPassword';
   formStatus: FormStatus;
   setActiveTab: (tab: 'login' | 'register' | 'forgotPassword') => void;
}

const AuthFormTabs = ({ formStatus, activeTab, setActiveTab }: AuthFormTabsProps) => {
   if (formStatus.isSuccess) return null;

   return (
      <Tabs>
         <ActionButton
            disabled={formStatus.isPending}
            onClick={() => setActiveTab('login')}
            variant={activeTab === 'login' ? 'secondary' : 'primary'}
         >
            Login
         </ActionButton>
         <ActionButton
            disabled={formStatus.isPending}
            onClick={() => setActiveTab('register')}
            variant={activeTab === 'register' ? 'secondary' : 'primary'}
         >
            Register
         </ActionButton>
      </Tabs>
   );
};

export default AuthFormTabs;
