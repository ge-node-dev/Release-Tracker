import { getReleaseById, getReleasesList } from '@/services/releaseService';

const Home = async () => {
   const releases = await getReleasesList();
   const releasesById = await getReleaseById('11fa0ae1-bd23-47f3-800c-341f8780f50c');
   // console.log('RELEASES LIST:', releases);
   // console.log('RELEASE BY ID:', releasesById);

   return <div>...</div>;
};

export default Home;
