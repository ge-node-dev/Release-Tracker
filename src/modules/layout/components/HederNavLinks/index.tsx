'use client';

import { usePathname } from 'next/navigation';

import { useAuthModal } from '@/shared/providers/AuthModalProvider';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import LinkButton from '@/shared/ui/Buttons/LinkButton';

import styles from './HeaderNavLinks.module.scss';

const NAV_LINKS = [{ href: '/', label: 'Releases' }];

const UserIcon = () => {
   return <img width={36} alt="Home" height={36} src="/assets/icons/user-circle.svg" />;
};

const HeaderNavLinks = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
   const path = usePathname();
   const { handleOpenModal } = useAuthModal();

   return (
      <>
         {NAV_LINKS.map((link) => (
            <nav key={link.label} className={styles.nav}>
               <LinkButton size="medium" href={link.href} ariaLabel={link.label} active={path === link.href}>
                  {link.label}
               </LinkButton>
               <div className={styles.divider} />
               {!isAuthenticated && (
                  <ActionButton variant="ghost" onClick={handleOpenModal}>
                     <UserIcon />
                  </ActionButton>
               )}
               {isAuthenticated && (
                  <LinkButton href="/profile" ariaLabel="Profile" active={path === '/profile'}>
                     <UserIcon />
                  </LinkButton>
               )}
            </nav>
         ))}
      </>
   );
};

export default HeaderNavLinks;
