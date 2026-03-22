import { Suspense } from 'react';

import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';
import Loading from '@/app/(main)/(public)/loading';

const AllTimeAnyPage = ({ params }: { params: Promise<{ page: string }> }) => {
   return (
      <Suspense fallback={<Loading />}>
         {params.then(({ page }) => (
            <HomePageBuilder page={+page} period={'all_time'} />
         ))}
      </Suspense>
   );
};

export default AllTimeAnyPage;
