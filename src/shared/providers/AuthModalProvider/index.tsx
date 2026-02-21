'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthModalContextType {
   isModalOpen: boolean;
   handleOpenModal: () => void;
   handleCloseModal: () => void;
}

const AuthModalContext = createContext<undefined | AuthModalContextType>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleOpenModal = () => setIsModalOpen(true);
   const handleCloseModal = () => setIsModalOpen(false);

   return (
      <AuthModalContext.Provider value={{ isModalOpen, handleOpenModal, handleCloseModal }}>
         {children}
      </AuthModalContext.Provider>
   );
};

export const useAuthModal = () => {
   const context = useContext(AuthModalContext);
   if (context === undefined) {
      throw new Error('useAuthModal must be used within an AuthModalProvider');
   }
   return context;
};
