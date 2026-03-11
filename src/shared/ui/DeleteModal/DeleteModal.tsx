'use client';
import { useState } from 'react';

import ActionButton from '@/shared/ui/Buttons/ActionButton';
import Modal from '@/shared/ui/Modal';

import FormErrorText from '../FormErrorText';
import { DeleteIcon } from '../Icons';

import styles from './DeleteModal.module.scss';

const DeleteModal = ({
   handleDelete,
}: {
   handleDelete: () => Promise<{ success?: boolean; error?: null | string }>;
}) => {
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
   const [deletedCommentError, setDeletedCommentError] = useState<null | string>(null);
   const [isLoading, setIsLoading] = useState(false);

   const handleDeleteConfirm = async () => {
      setIsLoading(true);
      setDeletedCommentError(null);
      const result = await handleDelete();
      setIsLoading(false);
      if (result.success) {
         setIsDeleteModalOpen(false);
      } else {
         setDeletedCommentError(result.error ?? null);
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
                  setDeletedCommentError(null);
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
               {deletedCommentError && <FormErrorText disableTopMargin={true} error={deletedCommentError} />}
            </Modal>
         )}
      </>
   );
};

export default DeleteModal;
