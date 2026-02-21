'use client';
import { usePathname } from 'next/navigation';

import LinkButton from '@/shared/ui/Buttons/LinkButton';

import HeaderAuthButton from '../HeaderAuthButton';

import styles from './Header.module.scss';

const NAV_LINKS = [{ href: '/', label: 'Releases' }];

const Header = () => {
   const path = usePathname();

   return (
      <header className={styles.header}>
         <div className={styles.wrapper}>
            {NAV_LINKS.map((link) => (
               <nav key={link.label} className={styles.nav}>
                  <LinkButton
                     href={link.href}
                     ariaLabel={link.label}
                     className={styles.navLink}
                     active={path === link.href}
                  >
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

export default Header;
