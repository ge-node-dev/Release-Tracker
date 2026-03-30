import { Suspense } from 'react';

import HeaderNavLinks from '@/modules/layout/components/HeaderNavLinks';
import HeaderProfile from '@/modules/layout/components/HeaderProfile';
import ThemeToggle from '@/shared/ui/ThemeToggle/ThemeToggle';

import styles from './Header.module.scss';

const Header = () => {
   return (
      <header className={styles.header}>
         <div className={styles.wrapper}>
            <HeaderNavLinks />
            <div className={styles.controls}>
               <ThemeToggle />
               <Suspense fallback={null}>
                  <HeaderProfile />
               </Suspense>
            </div>
         </div>
      </header>
   );
};

export default Header;
