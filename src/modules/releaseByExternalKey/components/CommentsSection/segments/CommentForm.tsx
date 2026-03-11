'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { submitComment } from '@/modules/releaseByExternalKey/services/commentActions';
import { CommentsSectionProps } from '@/modules/releaseByExternalKey/types/releaseTypes';
import TextArea from '@/shared/ui/TextArea';

import styles from './CommentForm.module.scss';

type CommentFormProps = {
   onSuccess?: () => void;
   parentId?: null | string;
   releaseId: CommentsSectionProps['releaseId'];
   externalKey: CommentsSectionProps['externalKey'];
};

const CommentForm = ({ parentId, onSuccess, releaseId, externalKey }: CommentFormProps) => {
   const router = useRouter();
   const [error, setError] = useState<null | string>(null);

   const handleSend = async (content: string) => {
      setError(null);
      const result = await submitComment(releaseId, content, externalKey, parentId);

      if (result.error) {
         setError(result.error);
         return { error: result.error };
      }
      onSuccess?.();
      router.refresh();
      return { success: true };
   };

   return (
      <div className={styles.commentForm}>
         <TextArea
            error={error}
            onSend={handleSend}
            onErrorClear={() => setError(null)}
            placeholder={parentId ? 'Write a reply…' : 'Write a comment…'}
         />
      </div>
   );
};

export default CommentForm;
