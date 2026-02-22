'use client';

import { useEffect } from 'react';

import useBodyScrollLock from '@/shared/hooks/useBodyScrollLock';

import styles from './Modal.module.scss';

const Modal = ({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) => {
   useBodyScrollLock(open);

   useEffect(() => {
      if (!open) return;
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [open]);

   if (!open) return null;

   return (
      <div className={styles.overlay}>
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
         <div className={styles.content}>
            <button onClick={onClose} aria-label="Close modal" className={styles.closeButton}>
               X
            </button>
            {children}
         </div>
      </div>
   );
};

export default Modal;
