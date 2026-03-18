import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

const ThisWeekAnyPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;
   const currentPage = Number(page);

   return <HomePageBuilder page={currentPage} period={'this_week'} />;
};

export default ThisWeekAnyPage;
