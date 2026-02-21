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
                  type={type}
                  value={value}
                  placeholder={placeholder}
                  style={{ border: error ? '1px solid red' : '1px solid #ffffff33' }}
                  {...props}
               />
            </div>
         </div>
         {error && <p className={styles.error}>{error}</p>}
      </>
   );
};

export default Input;
