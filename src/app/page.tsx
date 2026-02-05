import ReleasesList from '@/modules/release/components/ReleasesList';

const HomePage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
   const paramsData = await searchParams;
   const { page } = paramsData;

   return (
      <>
         <ReleasesList page={page} />
      </>
   );
};

export default HomePage;
