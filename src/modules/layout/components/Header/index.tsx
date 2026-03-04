import { Suspense } from 'react';

import ThemeToggle from '@/shared/ui/ThemeToggle/ThemeToggle';

import HeaderData from '../HeaderData';

import styles from './Header.module.scss';

const Header = () => {
   return (
      <Suspense fallback={null}>
         <header className={styles.header}>
            <div className={styles.wrapper}>
               <HeaderData />
               <ThemeToggle />
            </div>
         </header>
      </Suspense>
   );
};

export default Header;
