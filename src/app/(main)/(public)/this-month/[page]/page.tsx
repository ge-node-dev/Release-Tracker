import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

const ThisMonthAnyPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;
   const currentPage = Number(page);

   return <HomePageBuilder page={currentPage} period={'this_month'} />;
};

export default ThisMonthAnyPage;
