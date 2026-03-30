import { Suspense } from 'react';

import HeaderNavLinks from '@/modules/layout/components/HeaderNavLinks';
import HeaderProfile from '@/modules/layout/components/HeaderProfile';
import ThemeToggle from '@/shared/ui/ThemeToggle/ThemeToggle';

import styles from './Header.module.scss';

const Header = () => {
   return (
      <Suspense fallback={null}>
         <header className={styles.header}>
            <div className={styles.wrapper}>
               <HeaderNavLinks />
               <div className={styles.controls}>
                  <ThemeToggle />
                  <HeaderProfile />
               </div>
            </div>
         </header>
      </Suspense>
   );
};

export default Header;
