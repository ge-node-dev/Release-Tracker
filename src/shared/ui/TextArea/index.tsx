'use client';
import { ChangeEvent, TextareaHTMLAttributes, useRef, useState } from 'react';

import ActionButton from '../Buttons/ActionButton';

import styles from './TextArea.module.scss';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
   placeholder?: string;
}

const TEXT_AREA_LIMIT = 1000;

const TextArea = ({ placeholder = 'Write something', ...props }: TextAreaProps) => {
   const [value, setValue] = useState('');
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      if (newValue.length > TEXT_AREA_LIMIT) {
         return;
      }

      setValue(newValue);

      const el = textareaRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
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
            {...props}
         />
         <ActionButton variant="secondary" className={styles.sendCommentBtn}>
            send
         </ActionButton>
      </div>
   );
};

export default TextArea;
