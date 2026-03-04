import { getReleaseByExternalKey } from '@/modules/release/services/releaseServices';

const ReleasePage = async ({ params }: { params: Promise<Record<string, string>> }) => {
   const { url } = await params;
   const release = await getReleaseByExternalKey(url);

   return (
      <div>
         <h1>{release?.title}</h1>
      </div>
   );
};

export default ReleasePage;
