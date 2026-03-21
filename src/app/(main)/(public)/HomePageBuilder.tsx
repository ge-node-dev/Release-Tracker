import { Suspense } from 'react';

import PeriodTabs from '@/modules/release/components/PeriodTabs';
import ReleaseOfTheWeek, { ReleaseOfTheWeekSkeleton } from '@/modules/release/components/ReleaseOfTheWeek';
import ReleasesList from '@/modules/release/components/ReleasesList';
import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import { ReleaseCardSkeleton } from '@/shared/ui/ReleaseCard';
import SkeletonWrapper from '@/shared/ui/SkeletonWrapper';

import styles from '@/modules/release/components/ReleasesList/ReleasesList.module.scss';

const HomePageBuilder = ({ page, period }: { page: number; period: ReleasePeriod }) => {
   return (
      <main className="mainContainer">
         <Suspense
            fallback={
               <SkeletonWrapper>
                  <ReleaseOfTheWeekSkeleton />
               </SkeletonWrapper>
            }
         >
            <ReleaseOfTheWeek />
         </Suspense>
         <PeriodTabs currentPeriod={period} />
         <Suspense
            fallback={
               <SkeletonWrapper>
                  <section className={styles.wrapper}>
                     <div className={styles.releasesGrid}>
                        {Array.from({ length: 10 }).map((_, index) => (
                           <ReleaseCardSkeleton key={index} />
                        ))}
                     </div>
                  </section>
               </SkeletonWrapper>
            }
         >
            <ReleasesList page={page} period={period} />
         </Suspense>
      </main>
   );
};

export default HomePageBuilder;
