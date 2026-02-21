import { Suspense } from 'react';

import ProfileComponent from '@/modules/profile/components/ProfileComponent';

const ProfilePage = () => {
   return (
      <Suspense fallback={<div>Loading...</div>}>
         <ProfileComponent />
      </Suspense>
   );
};

export default ProfilePage;
