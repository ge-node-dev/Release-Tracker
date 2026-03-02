'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import styles from '../index.module.scss';

export type LinkButtonVariant = 'ghost' | 'filled' | 'textLink' | 'transparent';

export interface LinkButtonProps extends LinkProps {
   rotate?: string;
   active?: boolean;
   ariaLabel: string;
   className?: string;
   disabled?: boolean;
   children: ReactNode;
   ariaCurrent?: boolean;
   variant?: LinkButtonVariant;
   size?: 'small' | 'large' | 'medium';
}

const LinkButton = ({
   href,
   rotate,
   children,
   ariaLabel,
   ariaCurrent,
   active = false,
   className = '',
   size = 'small',
   disabled = false,
   variant = 'ghost',
   ...props
}: LinkButtonProps) => {
   return (
      <Link
         {...props}
         href={href}
         aria-label={ariaLabel}
         aria-disabled={disabled}
         aria-current={ariaCurrent}
         style={{ transform: `rotate(${rotate})` }}
         onClick={(e) => {
            if (disabled) e.preventDefault();
         }}
         className={`
            ${styles.linkButton}
            ${styles[variant]}
            ${disabled ? styles.disabled : ''}
            ${active ? styles.active : ''}
            ${styles[size]}
            ${className}
         `}
      >
         {children}
      </Link>
   );
};

export default LinkButton;
