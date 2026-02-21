'use client';
import { Activity, useState } from 'react';

import { loginConfig } from '@/modules/auth/utils/loginFormConfig';
import { registerConfig } from '@/modules/auth/utils/registerFormConfig';

import AuthForm from '../AuthForm';
import AuthHeaderTabs from '../AuthHeaderTabs';

interface AuthContentProps {
   onSuccessSubmit?: () => void;
}

const AuthContent = ({ onSuccessSubmit }: AuthContentProps) => {
   const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
   const [isFormPending, setIsFormPending] = useState<boolean>(false);

   const isLoginTab = activeTab === 'login';

   return (
      <>
         <AuthHeaderTabs isLoginTab={isLoginTab} setActiveTab={setActiveTab} isFormPending={isFormPending} />

         <Activity mode={isLoginTab ? 'visible' : 'hidden'}>
            <AuthForm config={loginConfig} onPending={setIsFormPending} onSuccessSubmit={onSuccessSubmit} />
         </Activity>
         <Activity mode={!isLoginTab ? 'visible' : 'hidden'}>
            <AuthForm config={registerConfig} onPending={setIsFormPending} onSuccessSubmit={onSuccessSubmit} />
         </Activity>
      </>
   );
};

export default AuthContent;
