'use client';
import { Activity, Fragment, useState } from 'react';

import { loginConfig } from '@/modules/auth/utils/loginFormConfig';
import { registerConfig } from '@/modules/auth/utils/registerFormConfig';
import Modal from '@/shared/ui/Modal';

import AuthForm from '../AuthForm';
import AuthFormTabs from '../AuthFormTabs';

export type FormStatus = {
   isPending: boolean;
   isSuccess: boolean;
};

const PENDING_STATUS: FormStatus = { isPending: true, isSuccess: false };
const SUCCESS_STATUS: FormStatus = { isSuccess: true, isPending: false };
const IDLE_STATUS: FormStatus = { isPending: false, isSuccess: false };

const AuthContent = ({ isModalWrapper }: { isModalWrapper: boolean }) => {
   const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
   const [formStatus, setFormStatus] = useState<FormStatus>(IDLE_STATUS);

   const isLoginTab = activeTab === 'login';

   const handlePending = (pending: boolean) => {
      setFormStatus(pending ? PENDING_STATUS : IDLE_STATUS);
   };

   const handleSuccessRegister = () => {
      setFormStatus(SUCCESS_STATUS);
   };

   const ModalWrapper = isModalWrapper ? Modal : Fragment;

   return (
      <ModalWrapper {...(isModalWrapper ? { disableClose: formStatus.isPending } : {})}>
         <AuthFormTabs isLoginTab={isLoginTab} formStatus={formStatus} setActiveTab={setActiveTab} />

         <Activity mode={isLoginTab ? 'visible' : 'hidden'}>
            <AuthForm config={loginConfig} onFormPending={handlePending} />
         </Activity>
         <Activity mode={isLoginTab ? 'hidden' : 'visible'}>
            <AuthForm config={registerConfig} onFormPending={handlePending} onSuccessRegister={handleSuccessRegister} />
         </Activity>
      </ModalWrapper>
   );
};

export default AuthContent;
