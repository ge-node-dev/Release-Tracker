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

const ThisWeekAnyPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;

   return <HomePageBuilder page={+page} period={'this_week'} />;
};

const ThisWeekPaginatedPage = ({ params }: { params: Promise<{ page: string }> }) => {
   return (
      <Suspense fallback={null}>
         <ThisWeekAnyPage params={params} />
      </Suspense>
   );
};

export default ThisWeekPaginatedPage;
