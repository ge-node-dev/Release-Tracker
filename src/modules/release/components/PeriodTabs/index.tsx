import Link from 'next/link';

import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import { buildPageHref } from '@/shared/utils/data/pagination';

import styles from './PeriodTabs.module.scss';

const periods: ReleasePeriod[] = ['this_week', 'this_month', 'all_time'];

const PeriodTabs = ({ currentPeriod }: { currentPeriod: ReleasePeriod }) => {
   return (
      <section className={styles.container}>
         <h3 className={styles.title}>New Releases</h3>
         <div className={styles.tabsContainer}>
            {periods.map((period) => (
               <Link
                  key={period}
                  aria-label={period}
                  href={buildPageHref(period, 1)}
                  className={`${styles.link} ${period === currentPeriod ? styles.active : ''}`}
               >
                  {period.replace('_', ' ')}
               </Link>
            ))}
         </div>
      </section>
   );
};

export default PeriodTabs;
