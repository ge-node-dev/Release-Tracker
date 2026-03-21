import { Suspense } from 'react';

import ThemeToggle from '@/shared/ui/ThemeToggle/ThemeToggle';

import HeaderData from '../HeaderData';
import HeaderNavLinksSkeleton from '../HeaderNavLinks/HeaderNavLinksSkeleton';

import styles from './Header.module.scss';

const Header = () => {
   return (
      <header className={styles.header}>
         <div className={styles.wrapper}>
            <Suspense fallback={<HeaderNavLinksSkeleton />}>
               <HeaderData />
            </Suspense>
            <ThemeToggle />
         </div>
      </header>
   );
};

export default Header;
