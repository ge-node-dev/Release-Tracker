import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import { SearchParams } from '@/shared/types';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import { buildHrefWithParam } from '@/shared/utils/data/pagination';

import styles from './PeriodTabs.module.scss';

const periods: ReleasePeriod[] = ['this_week', 'this_month', 'all_time'];

const PeriodTabs = ({ searchParams }: { searchParams: Awaited<SearchParams> }) => {
   const currentPeriod = searchParams.period || 'this_week';

   const navigateTo = (item: ReleasePeriod) => buildHrefWithParam(searchParams, 'period', item, 'this_week');

   return (
      <section className={styles.container}>
         <div className={styles.titleContainer}>
            <div className={styles.line} />
            <h1 className={styles.title}>New Releases</h1>
         </div>
         <div className={styles.tabsContainer}>
            {periods.map((period) => (
               <LinkButton
                  key={period}
                  size="medium"
                  href={navigateTo(period)}
                  ariaLabel={`Period-${period}`}
                  active={period === currentPeriod}
               >
                  {period.replace('_', ' ')}
               </LinkButton>
            ))}
         </div>
      </section>
   );
};

export default PeriodTabs;
