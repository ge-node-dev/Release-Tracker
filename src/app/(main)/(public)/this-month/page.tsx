import HomePageBuilder from '@/app/(main)/(public)/HomePageBuilder';

export const unstable_instant = {
   prefetch: 'static',
   samples: [
      {
         cookies: [
            { value: null, name: 'flash' },
            { value: null, name: 'flashtrig' },
         ],
      },
   ],
};

const ThisMonthFirstPage = () => {
   return <HomePageBuilder page={1} period={'this_month'} />;
};

export default ThisMonthFirstPage;
