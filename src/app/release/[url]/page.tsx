import { getReleaseByExternalKey } from '@/modules/release/services/releaseServices';

const ReleasePage = async ({ params }: { params: { url: string } }) => {
   const paramsData = await params;
   const release = await getReleaseByExternalKey(paramsData.url);
   return (
      <div>
         <h1>{release.title}</h1>
      </div>
   );
};

export default ReleasePage;
