import { Suspense } from 'react';

import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

export const unstable_instant = {
   prefetch: 'static',
   samples: [
      {
         params: { page: '2' },
         cookies: [
            { value: null, name: 'flash' },
            { value: null, name: 'flashtrig' },
         ],
      },
   ],
};

const ThisMonthAnyPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;

   return <HomePageBuilder page={+page} period={'this_month'} />;
};

const ThisMonthPaginatedPage = ({ params }: { params: Promise<{ page: string }> }) => {
   return (
      <Suspense fallback={null}>
         <ThisMonthAnyPage params={params} />
      </Suspense>
   );
};

export default ThisMonthPaginatedPage;
