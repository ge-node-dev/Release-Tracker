'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { submitComment } from '@/modules/releaseByExternalKey/services/commentActions';
import { CommentsSectionProps } from '@/modules/releaseByExternalKey/types/releaseTypes';
import TextArea from '@/shared/ui/TextArea';

type CommentFormProps = {
   onCancel?: () => void;
   onSuccess?: () => void;
   parentId?: null | string;
   disabledOpenBtn: boolean;
   releaseId: CommentsSectionProps['releaseId'];
   externalKey: CommentsSectionProps['externalKey'];
};

const CommentForm = ({
   onCancel,
   parentId,
   onSuccess,
   releaseId,
   externalKey,
   disabledOpenBtn = false,
}: CommentFormProps) => {
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
      <TextArea
         error={error}
         onCancel={onCancel}
         onSend={handleSend}
         disabledOpenBtn={disabledOpenBtn}
         onErrorClear={() => setError(null)}
         placeholder={parentId ? 'Write a reply…' : 'Write a comment…'}
      />
   );
};

export default CommentForm;
