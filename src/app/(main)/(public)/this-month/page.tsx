import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

const ThisMonthPage = () => {
   return <HomePageBuilder page={1} period={'this_month'} />;
};

export default ThisMonthPage;
