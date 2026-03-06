'use client';

import styles from '../index.module.scss';

export type ActionButtonVariant = 'red' | 'primary' | 'secondary';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   children: React.ReactNode;
   size?: 'large' | 'medium';
   variant?: ActionButtonVariant;
}

const ActionButton = ({
   children,
   className = '',
   size = 'medium',
   disabled = false,
   variant = 'primary',
   ...props
}: ActionButtonProps) => {
   return (
      <button
         type="button"
         data-disabled={disabled}
         aria-disabled={disabled}
         className={`
            ${styles.button}
            ${styles[variant]}
            ${styles[size]}
            ${className}
         `}
         {...props}
      >
         {children}
      </button>
   );
};

export default ActionButton;
