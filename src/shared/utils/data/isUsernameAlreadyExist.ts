import { createSupabaseServerClient } from '@/lib/supabase/server';

export const isUsernameAlreadyExist = async (username: string): Promise<boolean> => {
   const supabase = await createSupabaseServerClient();
   const { data } = await supabase.from('profiles').select('username').ilike('username', username).maybeSingle();
   return !!data;
};
