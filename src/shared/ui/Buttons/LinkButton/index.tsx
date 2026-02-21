'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import styles from './LinkButton.module.scss';

type LinkButtonVariant = 'ghost';

interface LinkButtonProps extends LinkProps {
   rotate?: string;
   ariaLabel: string;
   className?: string;
   children: ReactNode;
   ariaCurrent?: boolean;
   ariaDisabled?: boolean;
   variant?: LinkButtonVariant;
   active?: boolean;
}

const LinkButton = ({
   href,
   rotate,
   children,
   ariaLabel,
   className,
   ariaCurrent,
   ariaDisabled,
   variant = 'ghost',
   active,
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
         className={`${styles[variant]} ${ariaDisabled ? styles.disabled : ''} ${active ? styles.active : ''} ${className || ''}`}
      >
         {children}
      </Link>
   );
};

export default LinkButton;
