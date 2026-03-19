import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

const AllTimeAnyPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;

   return <HomePageBuilder page={+page} period={'all_time'} />;
};

export default AllTimeAnyPage;
