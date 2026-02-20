'use client';
import { Activity, useState } from 'react';

import { useAuthModal } from '@/shared/providers/AuthModalProvider';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Modal from '@/shared/ui/Modal';

import Login from '../Login';
import Register from '../Register';

import styles from './AuthModal.module.scss';

const AuthForm = () => {
   const { isOpen, handleClose } = useAuthModal();
   const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

   if (!isOpen) return null;

   const isLoginTab = activeTab === 'login';

   return (
      <Modal open={isOpen} onClose={handleClose}>
         <div className={styles.headerButtons}>
            <ActionButton
               disableHover={isLoginTab}
               onClick={() => setActiveTab('login')}
               variant={isLoginTab ? 'filled' : 'transparent'}
            >
               Login
            </ActionButton>
            <ActionButton
               disableHover={!isLoginTab}
               onClick={() => setActiveTab('register')}
               variant={!isLoginTab ? 'filled' : 'transparent'}
            >
               Register
            </ActionButton>
         </div>
         <Activity mode={isLoginTab ? 'visible' : 'hidden'}>
            <Login />
         </Activity>
         <Activity mode={!isLoginTab ? 'visible' : 'hidden'}>
            <Register />
         </Activity>
      </Modal>
   );
};

export default AuthForm;
