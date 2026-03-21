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

const AllTimeFirstPage = () => {
   return <HomePageBuilder page={1} period={'all_time'} />;
};

export default AllTimeFirstPage;
