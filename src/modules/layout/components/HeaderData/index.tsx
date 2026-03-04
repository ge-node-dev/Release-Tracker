import { getProfile } from '@/modules/profile/services/profileActions';

import HeaderNavLinks from '../HeaderNavLinks';

const HeaderAuth = async () => {
   const { profile } = await getProfile();

   return <HeaderNavLinks profile={profile} />;
};

export default HeaderAuth;
