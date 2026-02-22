'use client';

import styles from '../index.module.scss';

export type ActionButtonVariant = 'ghost' | 'filled' | 'transparent';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   active?: boolean;
   children: React.ReactNode;
   variant?: ActionButtonVariant;
   size?: 'small' | 'large' | 'medium';
}

const ActionButton = ({
   children,
   active = false,
   className = '',
   size = 'small',
   disabled = false,
   variant = 'filled',
   ...props
}: ActionButtonProps) => {
   return (
      <button
         type="button"
         disabled={disabled}
         aria-disabled={disabled}
         className={`
            ${styles.button}
            ${styles[variant]}
            ${styles[size]}
            ${active ? styles.active : ''}
            ${className}
         `}
         {...props}
      >
         {children}
      </button>
   );
};

export default ActionButton;
