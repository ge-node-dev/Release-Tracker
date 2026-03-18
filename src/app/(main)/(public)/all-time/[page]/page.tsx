import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

const AllTimePageWithPage = async ({ params }: { params: Promise<{ page: string }> }) => {
   const { page } = await params;
   const currentPage = Number(page) || 1;

   return <HomePageBuilder page={currentPage} period={'all_time'} />;
};

export default AllTimePageWithPage;
