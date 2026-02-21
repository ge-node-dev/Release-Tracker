'use client';
import { useState } from 'react';

import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
   id: string;
   label: string;
   icon?: string;
   value: string;
   error?: string;
   placeholder?: string;
   type?: 'text' | 'email' | 'password';
}

const Input = ({ id, icon, error, label, value, placeholder, type = 'text', ...props }: InputProps) => {
   const [showPassword, setShowPassword] = useState(false);

   const isPasswordField = type === 'password';
   const inputType = isPasswordField ? (showPassword ? 'text' : 'password') : type;

   const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
   };

   return (
      <>
         <div className={styles.input}>
            <label htmlFor={id}>
               {label}
               <span className={styles.required}>*</span>
            </label>
            <div className={styles.inputWrapper}>
               {icon && (
                  <img alt="" src={icon} width={24} height={24} aria-hidden="true" className={styles.inputIcon} />
               )}
               <input
                  id={id}
                  value={value}
                  type={inputType}
                  placeholder={placeholder}
                  style={{ border: error ? '1px solid red' : '1px solid #ffffff33' }}
                  {...props}
               />
               {isPasswordField && (
                  <button
                     type="button"
                     className={styles.passwordToggle}
                     onClick={togglePasswordVisibility}
                     aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                     <img
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                        src={!showPassword ? '/assets/icons/eye-off.svg' : '/assets/icons/eye-on.svg'}
                     />
                  </button>
               )}
            </div>
         </div>
         {error && <p className={styles.error}>{error}</p>}
      </>
   );
};

export default Input;
