'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import styles from '../index.module.scss';

export type LinkButtonVariant = 'red' | 'primary' | 'secondary';

export interface LinkButtonProps extends LinkProps {
   rotate?: string;
   active?: boolean;
   ariaLabel: string;
   className?: string;
   disabled?: boolean;
   children: ReactNode;
   ariaCurrent?: boolean;
   size?: 'large' | 'medium';
   variant?: LinkButtonVariant;
}

const LinkButton = ({
   href,
   rotate,
   children,
   ariaLabel,
   ariaCurrent,
   active = false,
   className = '',
   size = 'medium',
   disabled = false,
   variant = 'primary',
   ...props
}: LinkButtonProps) => {
   return (
      <Link
         {...props}
         href={href}
         aria-label={ariaLabel}
         aria-disabled={disabled}
         data-disabled={disabled}
         aria-current={ariaCurrent}
         style={{ transform: `rotate(${rotate})` }}
         onClick={(e) => {
            if (disabled) e.preventDefault();
         }}
         className={`
            ${styles.linkButton}
            ${styles[variant]}
            ${disabled ? styles.disabled : ''}
            ${styles[size]}
            ${className}
         `}
      >
         {children}
      </Link>
   );
};

export default LinkButton;
