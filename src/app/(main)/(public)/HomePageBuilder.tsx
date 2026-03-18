import { Suspense } from 'react';

import PeriodTabs from '@/modules/release/components/PeriodTabs';
import ReleaseOfTheWeek from '@/modules/release/components/ReleaseOfTheWeek';
import ReleasesList from '@/modules/release/components/ReleasesList';
import { ReleasePeriod } from '@/modules/release/types/releaseTypes';

import Loading from './loading';

const HomePageBuilder = ({ page, period }: { page: number; period: ReleasePeriod }) => {
   return (
      <main className="mainContainer">
         <Suspense fallback={<Loading />}>
            <ReleaseOfTheWeek />
            <PeriodTabs currentPeriod={period} />
            <ReleasesList page={page} period={period} />
         </Suspense>
      </main>
   );
};

export default HomePageBuilder;
