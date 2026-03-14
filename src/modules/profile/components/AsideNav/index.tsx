import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getProfile } from '@/modules/profile/services/profileActions';
import { ROUTES } from '@/shared/utils/constants';

import styles from './AsideNav.module.scss';

const AsideNav = async () => {
   const data = await getProfile();
   if (!data?.profile) redirect(ROUTES.AUTH);

   const {
      profile: { email, username, created_at },
   } = data;

   const memberSince = new Date(created_at)
      .toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
      .toUpperCase();

   return (
      <div className={styles.sidebarContent}>
         <h2 className={styles.userName}>{username ?? 'User'}</h2>

         <nav className={styles.profileNav}>
            <Link href="/profile" className={`${styles.profileNavItem} ${styles.profileNavItemActive}`}>
               Settings
            </Link>
            <Link href="/" className={styles.profileNavItem}>
               Feed
            </Link>
         </nav>

         <div className={styles.metaInfo}>
            <span>{email}</span>
            <span>{memberSince}</span>
         </div>
      </div>
   );
};

export default AsideNav;
