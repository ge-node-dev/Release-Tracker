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

export default ReleasePage;
