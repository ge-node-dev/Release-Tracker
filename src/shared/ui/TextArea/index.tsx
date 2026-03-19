'use client';

import { ChangeEvent, useRef, useState } from 'react';

import ActionButton from '../Buttons/ActionButton';

import styles from './TextArea.module.scss';

const TEXT_AREA_LIMIT = 1000;

export type TextAreaProps = {
   disabled?: boolean;
   placeholder?: string;
   onCancel?: () => void;
   disabledOpenBtn: boolean;
   onSend?: (content: string) => void | Promise<boolean>;
};

const TextArea = ({
   onSend,
   disabled,
   onCancel,
   disabledOpenBtn = false,
   placeholder = 'Write something',
}: TextAreaProps) => {
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [value, setValue] = useState('');
   const [isOpen, setIsOpen] = useState(disabledOpenBtn);

   const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value.slice(0, TEXT_AREA_LIMIT);
      setValue(newValue);
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
   };

   const handleSend = async () => {
      const trimmed = value.trim();
      if (!trimmed || !onSend) return;
      setIsSubmitting(true);
      try {
         const isSuccessSend = await onSend(trimmed);

         if (isSuccessSend) {
            setValue('');
            setIsOpen(disabledOpenBtn);
            const el = textareaRef.current;
            if (el) {
               el.style.height = 'auto';
            }
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className={styles.wrapper}>
         {!isOpen && !disabledOpenBtn && (
            <ActionButton variant="secondary" onClick={() => setIsOpen(true)} className={styles.activeTextareaBtn}>
               {'Write a comment…'}
            </ActionButton>
         )}
         {isOpen && (
            <>
               <textarea
                  value={value}
                  ref={textareaRef}
                  aria-label={placeholder}
                  placeholder={placeholder}
                  onChange={onChangeHandler}
                  className={styles.textarea}
                  disabled={disabled ?? isSubmitting}
               />
               <div className={styles.bottomContent}>
                  <span>{`${value.length}/${TEXT_AREA_LIMIT}`}</span>
               </div>
               <div className={styles.textareaActionButtons}>
                  <ActionButton
                     variant="primary"
                     disabled={isSubmitting}
                     className={styles.sendCommentBtn}
                     onClick={() => {
                        setValue('');
                        setIsOpen(false);
                        onCancel?.();
                     }}
                  >
                     {'Cancel'}
                  </ActionButton>
                  <ActionButton
                     variant="secondary"
                     onClick={handleSend}
                     className={styles.sendCommentBtn}
                     disabled={isSubmitting || !value.trim()}
                  >
                     {isSubmitting ? 'Sending...' : 'Send'}
                  </ActionButton>
               </div>
            </>
         )}
      </div>
   );
};

export default TextArea;
