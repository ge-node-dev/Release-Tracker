import type { Metadata } from 'next';

import { redirect } from 'next/navigation';

export const metadata: Metadata = { robots: { index: false, follow: false } };

import ProfileSettings from '@/modules/profile/components/ProfileSettings';
import { getProfile } from '@/modules/profile/services/profileActions';
import { ROUTES } from '@/shared/utils/constants';

const ProfilePage = async () => {
   const data = await getProfile();
   if (!data?.profile) redirect(ROUTES.AUTH);

   return <ProfileSettings profile={data.profile} />;
};

export default ProfilePage;
