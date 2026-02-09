import { Suspense } from 'react';

import { getReleaseByExternalKey } from '@/modules/release/services/releaseServices';
import { SearchParams } from '@/shared/types';

const ReleasePage = async ({ params }: { params: SearchParams }) => {
   const { url } = await params;
   const release = await getReleaseByExternalKey(url);

   return (
      <div>
         <h1>{release?.title}</h1>
      </div>
   );
};

export default function Page({ params }: { params: Promise<{ url: string }> }) {
   return (
      <Suspense fallback={null}>
         <ReleasePage params={params} />
      </Suspense>
   );
}
