import { SkeletonTheme } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonWrapper = ({ children }: { children: React.ReactNode }) => {
   return (
      <SkeletonTheme baseColor="#1a1a1a" highlightColor="#2a2a2a">
         {children}
      </SkeletonTheme>
   );
};

export default SkeletonWrapper;
