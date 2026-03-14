'use client';
import { useState } from 'react';

import { EyeOffIcon, EyeOnIcon } from '@/shared/ui/Icons';

import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   id: string;
   label: string;
   value: string;
   error?: string;
   required?: boolean;
   className?: string;
   placeholder?: string;
   icon?: React.ElementType;
   type?: 'text' | 'email' | 'password';
}

const Input = ({
   id,
   error,
   label,
   value,
   className,
   icon: Icon,
   placeholder,
   type = 'text',
   required = true,
   ...props
}: InputProps) => {
   const [showPassword, setShowPassword] = useState(false);

   const isPasswordField = type === 'password';
   const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

   const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
   };

   return (
      <>
         <div className={`${styles.inputWrapper} ${className}`}>
            <label htmlFor={id}>
               {label}
               {required && <span className={styles.required}>*</span>}
            </label>
            <div className={styles.inputWrapper}>
               {Icon && <Icon width={24} height={24} aria-hidden={true} className={styles.inputIcon} />}
               <input
                  id={id}
                  value={value}
                  type={inputType}
                  data-error={!!error}
                  className={styles.input}
                  placeholder={placeholder}
                  {...props}
               />
               {isPasswordField && (
                  <button
                     type="button"
                     className={styles.passwordToggle}
                     onClick={togglePasswordVisibility}
                     aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                     {!showPassword ? (
                        <EyeOffIcon width={24} height={24} aria-hidden={true} />
                     ) : (
                        <EyeOnIcon width={24} height={24} aria-hidden={true} />
                     )}
                  </button>
               )}
            </div>
         </div>
         {error && <p className={styles.error}>{error}</p>}
      </>
   );
};

export default Input;
