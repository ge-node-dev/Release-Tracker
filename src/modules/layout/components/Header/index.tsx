'use client';

import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

import LinkButton from '@/shared/ui/Buttons/LinkButton';

import HeaderAuthButton from '../HeaderAuthButton';

import styles from './Header.module.scss';

const NAV_LINKS = [{ href: '/', label: 'Releases' }];

const HeaderContent = () => {
   const path = usePathname();

   return (
      <header className={styles.header}>
         <div className={styles.wrapper}>
            {NAV_LINKS.map((link) => (
               <nav key={link.label} className={styles.nav}>
                  <LinkButton size="medium" href={link.href} ariaLabel={link.label} active={path === link.href}>
                     {link.label}
                  </LinkButton>
                  <div className={styles.divider} />
               </nav>
            ))}

            <HeaderAuthButton />
         </div>
      </header>
   );
};

const Header = () => {
   return (
      <Suspense fallback={null}>
         <HeaderContent />
      </Suspense>
   );
};

export default Header;
