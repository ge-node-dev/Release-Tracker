'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './HeaderNavLinks.module.scss';

const NAV_LINKS = [{ href: '/', label: 'Releases' }];

const HeaderNavLinks = () => {
   const path = usePathname();

   return (
      <nav className={styles.nav}>
         {NAV_LINKS.map(({ href, label }) => (
            <Link
               key={label}
               href={href}
               aria-label={label}
               className={`${styles.navLink} ${path === href ? styles.active : ''}`}
            >
               {label}
            </Link>
         ))}
      </nav>
   );
};

export default HeaderNavLinks;
