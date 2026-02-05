'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import styles from './LinkButton.module.scss';

interface LinkButtonProps extends LinkProps {
   rotate?: string;
   ariaLabel: string;
   className?: string;
   children: ReactNode;
   ariaDisabled?: boolean;
}

const LinkButton = ({ href, rotate, children, ariaLabel, className, ariaDisabled, ...props }: LinkButtonProps) => {
   return (
      <Link
         {...props}
         href={href}
         aria-label={ariaLabel}
         aria-disabled={ariaDisabled}
         style={{ transform: `rotate(${rotate})` }}
         onClick={(e) => {
            if (ariaDisabled) e.preventDefault();
         }}
         className={`${styles.arrow} ${ariaDisabled ? styles.disabled : ''} ${className || ''}`}
      >
         {children}
      </Link>
   );
};

export default LinkButton;
