import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

const ThisMonthFirstPage = () => {
   return <HomePageBuilder page={1} period={'this_month'} />;
};

export default ThisMonthFirstPage;
