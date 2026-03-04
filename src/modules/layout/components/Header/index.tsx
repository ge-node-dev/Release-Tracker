import { Suspense } from 'react';

import HeaderData from '../HeaderData';

import styles from './Header.module.scss';

const Header = () => {
   return (
      <Suspense fallback={null}>
         <header className={styles.header}>
            <div className={styles.wrapper}>
               <HeaderData />
            </div>
         </header>
      </Suspense>
   );
};

export default Header;
