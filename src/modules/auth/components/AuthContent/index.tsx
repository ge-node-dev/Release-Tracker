'use client';
import { Fragment, useState } from 'react';

import { loginConfig } from '@/modules/auth/utils/loginFormConfig';
import { registerConfig } from '@/modules/auth/utils/registerFormConfig';
import Modal from '@/shared/ui/Modal';

import { forgotPasswordConfig } from '../../utils/forgotPasswordConfig';
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
   const [activeTab, setActiveTab] = useState<'login' | 'register' | 'forgotPassword'>('login');
   const [formStatus, setFormStatus] = useState<FormStatus>(IDLE_STATUS);

   const handlePending = (pending: boolean) => {
      setFormStatus(pending ? PENDING_STATUS : IDLE_STATUS);
   };

   const handleSuccessRegister = () => {
      setFormStatus(SUCCESS_STATUS);
   };

   const ModalWrapper = isModalWrapper ? Modal : Fragment;

   return (
      <ModalWrapper {...(isModalWrapper ? { disableClose: formStatus.isPending } : {})}>
         <AuthFormTabs activeTab={activeTab} formStatus={formStatus} setActiveTab={setActiveTab} />

         {activeTab === 'login' && (
            <AuthForm key={activeTab} config={loginConfig} setActiveTab={setActiveTab} onFormPending={handlePending} />
         )}
         {activeTab === 'register' && (
            <AuthForm
               key={activeTab}
               config={registerConfig}
               onFormPending={handlePending}
               onSuccessRegister={handleSuccessRegister}
            />
         )}
         {activeTab === 'forgotPassword' && (
            <AuthForm key={activeTab} config={forgotPasswordConfig} onFormPending={handlePending} />
         )}
      </ModalWrapper>
   );
};

export default AuthContent;
