import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

const ThisMonthAnyPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;

   return <HomePageBuilder page={+page} period={'this_month'} />;
};

export default ThisMonthAnyPage;
