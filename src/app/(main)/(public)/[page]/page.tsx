import { Suspense } from 'react';

import Loading from '@/app/(main)/(public)/loading';
import PeriodTabs from '@/modules/release/components/PeriodTabs';
import ReleaseOfTheWeek from '@/modules/release/components/ReleaseOfTheWeek';
import ReleasesList from '@/modules/release/components/ReleasesList';

const ThisWeekPageWithPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;
   const currentPage = Number(page) || 1;

   return (
      <main className="mainContainer">
         <Suspense fallback={<Loading />}>
            <ReleaseOfTheWeek />
            <PeriodTabs currentPeriod={'this_week'} />
            <ReleasesList page={currentPage} period={'this_week'} />
         </Suspense>
      </main>
   );
};

export default ThisWeekPageWithPage;
