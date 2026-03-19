'use client';

import { Database } from '@db/types/database';
import { usePathname } from 'next/navigation';

import { Avatar } from '@/shared/ui/Avatar';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import { UserCircleIcon } from '@/shared/ui/Icons';
import { ROUTES } from '@/shared/utils/constants';

import styles from './HeaderNavLinks.module.scss';

const NAV_LINKS = [{ href: '/', label: 'Releases' }];

const UserIcon = () => <UserCircleIcon width={36} height={36} aria-label="User" />;

const HeaderNavLinks = ({ profile }: { profile: null | Database['public']['Tables']['profiles']['Row'] }) => {
   const isAuthenticated = !!profile;
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
            ariaLabel={isAuthenticated ? 'Profile' : 'Login'}
            active={isAuthenticated && path === ROUTES.PROFILE}
            href={isAuthenticated ? ROUTES.PROFILE : ROUTES.AUTH}
         >
            {profile?.avatar_url ? (
               <Avatar size="small" alt={profile.username} avatarUrl={profile.avatar_url} />
            ) : (
               <UserIcon />
            )}
         </LinkButton>
      </nav>
   );
};

export default HeaderNavLinks;
