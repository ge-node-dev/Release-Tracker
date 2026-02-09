import { Suspense } from 'react';

import ReleasesList from '@/modules/release/components/ReleasesList';
import { SearchParams } from '@/shared/types';

import Loading from './loading';

const HomePage = async ({ searchParams }: { searchParams: SearchParams }) => {
   const paramsData = await searchParams;
   const { page } = paramsData;

   return (
      <Suspense key={page} fallback={<Loading />}>
         <ReleasesList page={page} />
      </Suspense>
   );
};

export default HomePage;
