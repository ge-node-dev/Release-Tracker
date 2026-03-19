import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

const ThisWeekAnyPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;

   return <HomePageBuilder page={+page} period={'this_week'} />;
};

export default ThisWeekAnyPage;
