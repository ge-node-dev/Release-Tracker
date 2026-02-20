'use client';

import { useEffect, useEffectEvent } from 'react';

import useBodyScrollLock from '@/shared/hooks/useBodyScrollLock';

import styles from './Modal.module.scss';

const Modal = ({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) => {
   useBodyScrollLock(open);

   const handleCloseEvent = useEffectEvent(() => onClose());

   useEffect(() => {
      if (!open) return;
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Escape') handleCloseEvent();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
   }, [open]);

   if (!open) return null;

   return (
      <div className={styles.overlay}>
         <div onClick={onClose} aria-label="Close modal" className={styles.backdrop} />
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
