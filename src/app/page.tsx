import { ReleaseOfTheWeek } from '@/modules/release/components/ReleaseOfTheWeek';
import ReleasesList from '@/modules/release/components/ReleasesList';
import { SearchParams } from '@/shared/types';

const HomePage = async ({ searchParams }: { searchParams: SearchParams }) => {
   const paramsData = await searchParams;
   const { page } = paramsData;

   return (
      <>
         <ReleaseOfTheWeek />
         <ReleasesList page={page} />
      </>
   );
};

export default HomePage;
