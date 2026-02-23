'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import styles from './Modal.module.scss';

const Modal = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();

   const onClose = () => router.back();

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
            onClick={onClose}
            aria-label="Close modal"
            className={styles.backdrop}
            onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') onClose();
            }}
         />
         <div className={styles.overlay}>
            <div className={styles.content}>
               <button onClick={onClose} aria-label="Close modal" className={styles.closeButton}>
                  X
               </button>
               {children}
            </div>
         </div>
      </>
   );
};

export default Modal;
