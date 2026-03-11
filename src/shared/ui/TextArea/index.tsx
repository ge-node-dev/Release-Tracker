'use client';

import { ChangeEvent, useRef, useState } from 'react';

import ActionButton from '../Buttons/ActionButton';

import styles from './TextArea.module.scss';

const TEXT_AREA_LIMIT = 1000;

export type OnSendResult = { error?: string };

export type TextAreaProps = {
   disabled?: boolean;
   placeholder?: string;
   error?: null | string;
   onErrorClear?: () => void;
   onSend?: (content: string) => void | Promise<void | OnSendResult>;
};

const TextArea = ({ onSend, disabled, error = null, onErrorClear, placeholder = 'Write something' }: TextAreaProps) => {
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [value, setValue] = useState('');

   const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value.slice(0, TEXT_AREA_LIMIT);
      setValue(newValue);
      onErrorClear?.();
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
         const result = await onSend(trimmed);

         if (!result?.error) {
            setValue('');
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
         <span>{`${value.length}/${TEXT_AREA_LIMIT}`}</span>
         <textarea
            value={value}
            ref={textareaRef}
            placeholder={placeholder}
            onChange={onChangeHandler}
            className={styles.textarea}
            disabled={disabled ?? isSubmitting}
         />
         {error && <p className={styles.submitError}>{error}</p>}
         {onSend && (
            <ActionButton
               variant="secondary"
               onClick={handleSend}
               className={styles.sendCommentBtn}
               disabled={isSubmitting || !value.trim()}
            >
               {isSubmitting ? 'Sending...' : 'Send'}
            </ActionButton>
         )}
      </div>
   );
};

export default TextArea;
