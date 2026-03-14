'use client';
import { useState } from 'react';

import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Modal from '@/shared/ui/Modal';

import { DeleteIcon } from '../Icons';

import styles from './DeleteModal.module.scss';

const DeleteModal = ({ handleDelete }: { handleDelete: () => Promise<boolean> }) => {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const handleDeleteConfirm = async () => {
      try {
         setIsLoading(true);

         const isSuccessDelete = await handleDelete();

         if (isSuccessDelete) {
            setIsDeleteModalOpen(false);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <>
         <button aria-label="Delete comment" className={styles.deleteButton} onClick={() => setIsDeleteModalOpen(true)}>
            <DeleteIcon width={16} height={16} />
         </button>

         {isDeleteModalOpen && (
            <Modal
               disableClose={isLoading}
               onClose={() => {
                  setIsDeleteModalOpen(false);
               }}
            >
               <span>Delete comment</span>
               <p>Are you sure you want to delete this comment? This action cannot be undone.</p>
               <div className={styles.deleteModalActions}>
                  <ActionButton
                     size="medium"
                     variant="secondary"
                     aria-label="Cancel"
                     disabled={isLoading}
                     onClick={() => setIsDeleteModalOpen(false)}
                  >
                     Cancel
                  </ActionButton>
                  <ActionButton
                     size="medium"
                     variant="red"
                     disabled={isLoading}
                     aria-label="Delete comment"
                     onClick={handleDeleteConfirm}
                  >
                     {isLoading ? 'Deleting...' : 'Delete'}
                  </ActionButton>
               </div>
            </Modal>
         )}
      </>
   );
};

export default DeleteModal;
