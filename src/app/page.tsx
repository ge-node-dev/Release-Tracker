import ReleasesList from '@/modules/release/components/ReleasesList';

const HomePage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
   const paramsData = await searchParams;
   const { page } = paramsData;

   return (
      <div>
         <ReleasesList page={page} />
      </div>
   );
};

export default HomePage;
