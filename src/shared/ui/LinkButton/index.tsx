'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import styles from './LinkButton.module.scss';

interface LinkButtonProps extends LinkProps {
   rotate?: string;
   ariaLabel: string;
   className?: string;
   children: ReactNode;
   ariaCurrent?: boolean;
   ariaDisabled?: boolean;
}

const LinkButton = ({
   href,
   rotate,
   children,
   ariaLabel,
   className,
   ariaCurrent,
   ariaDisabled,
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
         className={`${styles.arrow} ${ariaDisabled ? styles.disabled : ''} ${className || ''}`}
      >
         {children}
      </Link>
   );
};

export default LinkButton;
