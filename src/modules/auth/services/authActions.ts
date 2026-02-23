'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export type FormState = {
   error: string;
   email?: string;
   success: boolean;
};

export const createUserAccount = async (prevData: FormState, formData: FormData): Promise<FormState> => {
   const supabase = await createSupabaseServerClient();

   const email = formData.get('email')?.toString().trim() ?? '';
   const password = formData.get('password')?.toString() ?? '';
   const userName = formData.get('username')?.toString().trim() ?? '';

   const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username: userName } },
   });

   if (error) {
      return { email, success: false, error: error.message };
   }

   return { error: '', success: true };
};

export const loginUserAccount = async (prevData: FormState, formData: FormData): Promise<FormState> => {
   const email = formData.get('email')?.toString().trim() ?? '';
   const password = formData.get('password')?.toString() ?? '';

   const supabase = await createSupabaseServerClient();
   const { error } = await supabase.auth.signInWithPassword({ email, password });

   if (error) {
      return { success: false, error: error.message };
   }

   return { error: '', success: true };
};

export const logoutUserAccount = async () => {
   const supabase = await createSupabaseServerClient();
   await supabase.auth.signOut();
   revalidatePath('/auth');
   revalidatePath('/');
};
