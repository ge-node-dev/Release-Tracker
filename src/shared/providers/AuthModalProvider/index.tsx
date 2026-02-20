'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthModalContextType {
   isOpen: boolean;
   handleOpen: () => void;
   handleClose: () => void;
}

const AuthModalContext = createContext<undefined | AuthModalContextType>(undefined);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleOpen = () => setIsOpen(true);
   const handleClose = () => setIsOpen(false);

   return <AuthModalContext.Provider value={{ isOpen, handleOpen, handleClose }}>{children}</AuthModalContext.Provider>;
};

export const useAuthModal = () => {
   const context = useContext(AuthModalContext);
   if (context === undefined) {
      throw new Error('useAuthModal must be used within an AuthModalProvider');
   }
   return context;
};
