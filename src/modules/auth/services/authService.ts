import { createSupabaseStaticClient } from '@/lib/supabase/client';

export type FormState = {
   error: string;
   email?: string;
   success: boolean;
   password?: string;
   username?: string;
   confirmPassword?: string;
};

export const createUserAccount = async (prevData: FormState, formData: FormData): Promise<FormState> => {
   const supabase = createSupabaseStaticClient();
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;
   const userName = formData.get('username') as string;

   const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username: userName } },
   });

   if (error) {
      return { success: false, error: error.message };
   }

   return { error: '', success: true };
};

export const loginUserAccount = async (prevData: FormState, formData: FormData): Promise<FormState> => {
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;

   const supabase = createSupabaseStaticClient();
   const { error } = await supabase.auth.signInWithPassword({ email, password });

   if (error) {
      return { success: false, error: error.message };
   }

   return { error: '', success: true };
};
