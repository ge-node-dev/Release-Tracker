import { Suspense } from 'react';

import PeriodTabs from '@/modules/release/components/PeriodTabs';
import ReleaseOfTheWeek from '@/modules/release/components/ReleaseOfTheWeek';
import ReleasesList from '@/modules/release/components/ReleasesList';
import { SearchParams } from '@/shared/types';

import Loading from './loading';

const HomePage = async ({ searchParams }: { searchParams: SearchParams }) => {
   const paramsData = await searchParams;
   const { page = 1, period = 'this_week' } = paramsData;

   return (
      <Suspense fallback={<Loading />} key={`${page}_${period}`}>
         <ReleaseOfTheWeek />
         <PeriodTabs searchParams={paramsData} />
         <ReleasesList searchParams={paramsData} />
      </Suspense>
   );
};

export default HomePage;
