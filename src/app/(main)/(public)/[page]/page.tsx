import { Suspense } from 'react';

import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';
import Loading from '@/app/(main)/(public)/loading';

const ThisWeekAnyPage = ({ params }: { params: Promise<{ page: string }> }) => {
   return (
      <Suspense fallback={<Loading />}>
         {params.then(({ page }) => (
            <HomePageBuilder page={+page} period={'this_week'} />
         ))}
      </Suspense>
   );
};

export default ThisWeekAnyPage;
