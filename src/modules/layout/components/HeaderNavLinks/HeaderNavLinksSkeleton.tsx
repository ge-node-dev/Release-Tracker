import Skeleton from 'react-loading-skeleton';

import styles from './HeaderNavLinks.module.scss';

const HeaderNavLinksSkeleton = () => {
   return (
      <nav aria-hidden={true} className={styles.nav}>
         <Skeleton width={96} height={40} borderRadius={8} />
         <Skeleton width={96} height={40} borderRadius={8} />
         <div className={styles.divider} />
         <Skeleton width={36} height={36} borderRadius={18} />
      </nav>
   );
};

export default HeaderNavLinksSkeleton;
