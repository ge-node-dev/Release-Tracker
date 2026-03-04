'use client';
import { usePathname } from 'next/navigation';

import LinkButton from '@/shared/ui/Buttons/LinkButton';
import Tabs from '@/shared/ui/Tabs';
import { ROUTES } from '@/shared/utils/constants';

import styles from './ProfileTabs.module.scss';

const ProfileTabs = () => {
   const pathname = usePathname();
   return (
      <Tabs className={styles.profileTabs}>
         <LinkButton
            ariaLabel="Settings"
            href={ROUTES.PROFILE}
            disabled={pathname === ROUTES.PROFILE}
            variant={pathname === ROUTES.PROFILE ? 'filled' : 'transparent'}
         >
            Settings
         </LinkButton>
      </Tabs>
   );
};

export default ProfileTabs;
