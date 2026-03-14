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

   const handleSend = async (content: string) => {
      const result = await submitComment(releaseId, content, externalKey, parentId);

      if (result.success) {
         onSuccess?.();
         router.refresh();
      }

      return result.success;
   };

   return (
      <TextArea
         onCancel={onCancel}
         onSend={handleSend}
         disabledOpenBtn={disabledOpenBtn}
         placeholder={parentId ? 'Write a reply…' : 'Write a comment…'}
      />
   );
};

export default CommentForm;
