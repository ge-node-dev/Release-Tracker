import { redirect } from 'next/navigation';

import ProfileSettings from '@/modules/profile/components/ProfileSettings';
import { getProfile } from '@/modules/profile/services/profileActions';
import { ROUTES } from '@/shared/utils/constants';

const ProfilePage = async () => {
   const data = await getProfile();
   if (!data?.profile) redirect(ROUTES.AUTH);

   return <ProfileSettings profile={data.profile} />;
};

export default ProfilePage;
