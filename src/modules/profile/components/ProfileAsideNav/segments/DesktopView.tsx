'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './DesktopView.module.scss';

const DesktopView = ({
   email,
   links,
   username,
   memberSince,
}: {
   email: string;
   username: string;
   memberSince: string;
   links: { href: string; label: string; icon: React.ReactNode }[];
}) => {
   const pathname = usePathname();

   const isActive = (href: string) => {
      if (href === '/profile') return pathname.startsWith('/profile');
      return pathname === href;
   };

   return (
      <div className={styles.sidebarContent}>
         <h2 className={styles.userName}>{username ?? 'User'}</h2>

         <nav className={styles.profileNav}>
            {links.map(({ href, label }) => (
               <Link
                  key={href}
                  href={href}
                  className={`${styles.profileNavItem} ${isActive(href) ? styles.profileNavItemActive : ''}`}
               >
                  {label}
               </Link>
            ))}
         </nav>

         <div className={styles.metaInfo}>
            <span>{email}</span>
            <span>{memberSince}</span>
         </div>
      </div>
   );
};

export default DesktopView;
