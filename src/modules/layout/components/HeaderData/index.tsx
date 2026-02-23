import { createSupabaseServerClient } from '@/lib/supabase/server';

import HeaderNavLinks from '../HederNavLinks';

const HeaderAuth = async () => {
   const supabase = await createSupabaseServerClient();
   const {
      data: { user },
   } = await supabase.auth.getUser();

   return <HeaderNavLinks isAuthenticated={!!user} />;
};

export default HeaderAuth;
