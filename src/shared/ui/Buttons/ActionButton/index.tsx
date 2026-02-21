'use client';

import styles from './ActionButton.module.scss';

type ActionButtonVariant = 'ghost' | 'filled' | 'transparent';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   disabled?: boolean;
   className?: string;
   isLoading?: boolean;
   onClick?: () => void;
   disableHover?: boolean;
   children?: React.ReactNode;
   variant: ActionButtonVariant;
}

const ActionButton = ({
   onClick,
   variant,
   children,
   disabled,
   className,
   disableHover,
   ...props
}: ActionButtonProps) => {
   return (
      <button
         onClick={onClick}
         disabled={disabled}
         aria-disabled={disabled}
         className={`${styles.button} ${styles[variant]} ${disableHover ? styles.disableHover : ''} ${className}`}
         {...props}
      >
         {children}
      </button>
   );
};

export default ActionButton;
