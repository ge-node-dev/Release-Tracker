'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import styles from '../index.module.scss';

export type LinkButtonVariant = 'ghost' | 'filled' | 'transparent';

export interface LinkButtonProps extends LinkProps {
   rotate?: string;
   active?: boolean;
   ariaLabel: string;
   className?: string;
   children: ReactNode;
   ariaCurrent?: boolean;
   ariaDisabled?: boolean;
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
   variant = 'ghost',
   ariaDisabled = false,
   ...props
}: LinkButtonProps) => {
   return (
      <Link
         {...props}
         href={href}
         aria-label={ariaLabel}
         aria-current={ariaCurrent}
         aria-disabled={ariaDisabled}
         style={{ transform: `rotate(${rotate})` }}
         onClick={(e) => {
            if (ariaDisabled) e.preventDefault();
         }}
         className={`
            ${styles.linkButton}
            ${styles[variant]}
            ${active ? styles.active : ''}
            ${ariaDisabled ? styles.disabled : ''}
            ${styles[size]}
            ${className}
         `}
      >
         {children}
      </Link>
   );
};

export default LinkButton;
