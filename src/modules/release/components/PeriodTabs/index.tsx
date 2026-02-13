import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import { SearchParams } from '@/shared/types';
import LinkButton from '@/shared/ui/LinkButton';
import { buildHrefWithParam } from '@/shared/utils/data/pagination';

import styles from './PeriodTabs.module.scss';

const periods: ReleasePeriod[] = ['this_week', 'this_month', 'all_time'];

const PeriodTabs = ({ searchParams }: { searchParams: Awaited<SearchParams> }) => {
   const currentPeriod = searchParams.period || 'this_week';
   const to = (item: ReleasePeriod) => buildHrefWithParam(searchParams, 'period', item, 'this_week');

   return (
      <section className={styles.container}>
         <div className={styles.titleContainer}>
            <div className={styles.line} />
            <h1 className={styles.title}>New Releases</h1>
         </div>
         <div className={styles.tabs}>
            {periods.map((item) => (
               <LinkButton
                  key={item}
                  href={to(item)}
                  ariaLabel={`Period-${item}`}
                  className={`${styles.tabButton} ${item === currentPeriod ? styles.active : ''}`}
               >
                  {item.replace('_', ' ').toUpperCase()}
               </LinkButton>
            ))}
         </div>
      </section>
   );
};

export default PeriodTabs;
