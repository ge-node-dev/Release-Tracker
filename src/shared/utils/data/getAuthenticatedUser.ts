'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export const getAuthenticatedUser = async () => {
   const supabase = await createSupabaseServerClient();
   const { data } = await supabase.auth.getUser();
   return data.user;
};
