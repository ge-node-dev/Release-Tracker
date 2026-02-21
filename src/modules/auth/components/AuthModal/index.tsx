'use client';
import { Activity, useState } from 'react';

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

         <Activity mode={isLoginTab ? 'visible' : 'hidden'}>
            <AuthForm config={loginConfig} onSuccess={handleClose} onPending={setIsFormPending} />
         </Activity>
         <Activity mode={!isLoginTab ? 'visible' : 'hidden'}>
            <AuthForm config={registerConfig} onSuccess={handleClose} onPending={setIsFormPending} />
         </Activity>
      </Modal>
   );
};

export default AuthModal;
