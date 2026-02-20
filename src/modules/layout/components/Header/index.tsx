import LinkButton from '@/shared/ui/Buttons/LinkButton';

import HeaderAuthButton from '../HeaderAuthButton';

import styles from './Header.module.scss';

const Header = () => {
   return (
      <header className={styles.header}>
         <div className={styles.wrapper}>
            <nav className={styles.nav}>
               <LinkButton href="/" ariaLabel="Releases" className={styles.navLink}>
                  Releases
               </LinkButton>
               <div className={styles.divider}></div>
               <LinkButton href="/" ariaLabel="Artists" className={styles.navLink}>
                  Artists
               </LinkButton>
            </nav>

            <HeaderAuthButton />
         </div>
      </header>
   );
};

export default Header;
