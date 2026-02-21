'use client';
import { useState } from 'react';

import { loginConfig } from '@/modules/auth/utils/loginFormConfig';
import { registerConfig } from '@/modules/auth/utils/registerFormConfig';
import { useAuthModal } from '@/shared/providers/AuthModalProvider';
import Modal from '@/shared/ui/Modal';

import AuthForm from '../AuthForm';
import AuthHeaderTabs from '../AuthHeaderTabs';

const AuthModal = () => {
   const { isOpen, handleClose } = useAuthModal();
   const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

   const [isFormPending, setIsFormPending] = useState<boolean>(false);

   const isLoginTab = activeTab === 'login';

   return (
      <Modal open={isOpen} onClose={handleClose}>
         <AuthHeaderTabs isLoginTab={isLoginTab} setActiveTab={setActiveTab} isFormPending={isFormPending} />

         {isLoginTab && (
            <AuthForm key="login" config={loginConfig} onSuccess={handleClose} onPending={setIsFormPending} />
         )}
         {!isLoginTab && (
            <AuthForm key="register" config={registerConfig} onSuccess={handleClose} onPending={setIsFormPending} />
         )}
      </Modal>
   );
};

export default AuthModal;
