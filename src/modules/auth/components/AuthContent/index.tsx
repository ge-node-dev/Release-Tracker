'use client';
import { Activity, Suspense, useState } from 'react';

import { loginConfig } from '@/modules/auth/utils/loginFormConfig';
import { registerConfig } from '@/modules/auth/utils/registerFormConfig';

import AuthForm from '../AuthForm';
import AuthHeaderTabs from '../AuthHeaderTabs';

export type FormStatus = {
   isPending: boolean;
   isSuccess: boolean;
};

const PENDING_STATUS: FormStatus = { isPending: true, isSuccess: false };
const SUCCESS_STATUS: FormStatus = { isSuccess: true, isPending: false };
const IDLE_STATUS: FormStatus = { isPending: false, isSuccess: false };

const Content = ({ onSuccessLogin }: { onSuccessLogin: () => void }) => {
   const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
   const [formStatus, setFormStatus] = useState<FormStatus>(IDLE_STATUS);

   const isLoginTab = activeTab === 'login';

   const handlePending = (pending: boolean) => {
      setFormStatus(pending ? PENDING_STATUS : IDLE_STATUS);
   };

   const handleSuccessRegister = () => {
      setFormStatus(SUCCESS_STATUS);
   };

   return (
      <>
         <AuthHeaderTabs isLoginTab={isLoginTab} formStatus={formStatus} setActiveTab={setActiveTab} />

         <Activity mode={isLoginTab ? 'visible' : 'hidden'}>
            <AuthForm config={loginConfig} onFormPending={handlePending} onSuccessLogin={onSuccessLogin} />
         </Activity>
         <Activity mode={isLoginTab ? 'hidden' : 'visible'}>
            <AuthForm config={registerConfig} onFormPending={handlePending} onSuccessRegister={handleSuccessRegister} />
         </Activity>
      </>
   );
};

const AuthContent = ({ onSuccessLogin }: { onSuccessLogin: () => void }) => (
   <Suspense fallback={null}>
      <Content onSuccessLogin={onSuccessLogin} />
   </Suspense>
);

export default AuthContent;
