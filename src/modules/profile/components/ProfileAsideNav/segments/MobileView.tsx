'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Portal from '@/shared/ui/Portal';

import styles from './MobileView.module.scss';

const MobileView = ({ links }: { links: { href: string; label: string; icon: React.ReactNode }[] }) => {
   const pathname = usePathname();

   const isActive = (href: string) => {
      if (href === '/profile') return pathname.startsWith('/profile');
      return pathname === href;
   };

   return (
      <Portal>
         <div className={styles.mobileViewWrapper}>
            <nav className={styles.mobileViewNav}>
               {links.map(({ href, icon, label }) => (
                  <Link
                     key={href}
                     href={href}
                     className={`${styles.mobileViewNavItem} ${isActive(href) ? styles.active : ''}`}
                  >
                     <span className={styles.iconWrapper}>{icon}</span>
                     <span className={`${styles.label} ${isActive(href) ? styles.active : ''}`}>{label}</span>
                  </Link>
               ))}
            </nav>
         </div>
      </Portal>
   );
};

export default MobileView;
