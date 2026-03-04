'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
   onClose?: () => void;
   disableClose?: boolean;
   children: React.ReactNode;
}

const Modal = ({ children, disableClose, onClose: onCloseProp }: ModalProps) => {
   const router = useRouter();

   const onClose = onCloseProp ?? (() => router.back());

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => document.removeEventListener('keydown', handleKeyDown);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <div
            tabIndex={0}
            role="button"
            aria-label="Close modal"
            className={styles.backdrop}
            onClick={!disableClose ? onClose : undefined}
            onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') onClose();
            }}
         />
         <div className={styles.overlay}>
            <div className={styles.content}>
               <button
                  aria-label="Close modal"
                  className={styles.closeButton}
                  onClick={!disableClose ? onClose : undefined}
               >
                  X
               </button>
               {children}
            </div>
         </div>
      </>
   );
};

export default Modal;
