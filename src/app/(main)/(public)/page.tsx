import HomePageBuilder from './HomePageBuilder';

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

const HomePage = () => {
   return <HomePageBuilder page={1} period={'this_week'} />;
};

export default HomePage;
