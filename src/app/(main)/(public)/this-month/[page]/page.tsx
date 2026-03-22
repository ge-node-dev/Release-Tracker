import { Suspense } from 'react';

import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';
import Loading from '@/app/(main)/(public)/loading';

const ThisMonthAnyPage = ({ params }: { params: Promise<{ page: string }> }) => {
   return (
      <Suspense fallback={<Loading />}>
         {params.then(({ page }) => (
            <HomePageBuilder page={+page} period={'this_month'} />
         ))}
      </Suspense>
   );
};

export default ThisMonthAnyPage;
