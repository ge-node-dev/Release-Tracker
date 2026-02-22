'use client';
import { useAuthModal } from '@/shared/providers/AuthModalProvider';
import Modal from '@/shared/ui/Modal';

import AuthContent from '../AuthContent';

const AuthModal = () => {
   const { isModalOpen, handleCloseModal } = useAuthModal();

   return (
      <Modal open={isModalOpen} onClose={handleCloseModal}>
         <AuthContent />
      </Modal>
   );
};

export default AuthModal;
