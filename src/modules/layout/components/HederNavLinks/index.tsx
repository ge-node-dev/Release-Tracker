'use client';

import { usePathname } from 'next/navigation';

import LinkButton from '@/shared/ui/Buttons/LinkButton';

import styles from './HeaderNavLinks.module.scss';

const NAV_LINKS = [{ href: '/', label: 'Releases' }];

const UserIcon = () => <img width={36} alt="User" height={36} src="/assets/icons/user-circle.svg" />;

const HeaderNavLinks = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
   const path = usePathname();

   return (
      <nav className={styles.nav}>
         {NAV_LINKS.map(({ href, label }) => (
            <LinkButton key={label} href={href} size="medium" ariaLabel={label} active={path === href}>
               {label}
            </LinkButton>
         ))}

         <div className={styles.divider} />

         <LinkButton
            scroll={false}
            href={isAuthenticated ? '/profile' : '/auth'}
            active={isAuthenticated && path === '/profile'}
            ariaLabel={isAuthenticated ? 'Profile' : 'Login'}
         >
            <UserIcon />
         </LinkButton>
      </nav>
   );
};

export default HeaderNavLinks;
