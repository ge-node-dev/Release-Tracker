import { redirect } from 'next/navigation';

import { getProfile } from '@/modules/profile/services/profileActions';
import { ROUTES } from '@/shared/constants';
import { FeedIcon, SettingsIcon } from '@/shared/ui/Icons';

import DesktopView from './segments/DesktopView';
import MobileView from './segments/MobileView';

const ProfileAsideNav = async () => {
   const data = await getProfile();
   if (!data?.profile) redirect(ROUTES.AUTH);

   const {
      profile: { email, username, created_at },
   } = data;

   const memberSince = new Date(created_at)
      .toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
      .toUpperCase();

   const links = [
      {
         href: '/profile',
         label: 'Settings',
         icon: <SettingsIcon />,
      },
      {
         href: '/feed',
         label: 'Feed',
         icon: <FeedIcon />,
      },
   ];

   return (
      <>
         <DesktopView email={email} links={links} username={username} memberSince={memberSince} />
         <MobileView links={links} />
      </>
   );
};

export default ProfileAsideNav;
