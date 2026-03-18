import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import { buildPageHref } from '@/shared/utils/data/pagination';

import styles from './PeriodTabs.module.scss';

const periods: ReleasePeriod[] = ['this_week', 'this_month', 'all_time'];

const PeriodTabs = ({ currentPeriod }: { currentPeriod: ReleasePeriod }) => {
   return (
      <section className={styles.container}>
         <h3 className={styles.title}>New Releases</h3>
         <div className={styles.tabsContainer}>
            {periods.map((period) => (
               <LinkButton
                  key={period}
                  size="medium"
                  ariaLabel={`Period-${period}`}
                  href={buildPageHref(period, 1)}
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
