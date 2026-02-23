import { Suspense } from 'react';

import HeaderData from '../HeaderData';

import styles from './Header.module.scss';

const Header = () => {
   return (
      <header className={styles.header}>
         <div className={styles.wrapper}>
            <Suspense fallback={null}>
               <HeaderData />
            </Suspense>
         </div>
      </header>
   );
};

export default Header;
