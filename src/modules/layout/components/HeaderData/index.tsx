import { Suspense } from 'react';

import { getProfile } from '@/modules/profile/services/profileActions';

import HeaderNavLinks from '../HeaderNavLinks';
import HeaderNavLinksSkeleton from '../HeaderNavLinks/HeaderNavLinksSkeleton';

const HeaderAuth = async () => {
   const { profile } = await getProfile();

   return (
      <Suspense fallback={<HeaderNavLinksSkeleton />}>
         <HeaderNavLinks profile={profile} />
      </Suspense>
   );
};

export default HeaderAuth;
