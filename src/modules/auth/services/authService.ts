'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

type FormState = {
   error: string;
   email?: string;
   password?: string;
   username?: string;
   confirmPassword?: string;
};

export const createUserAccount = async (prevData: FormState, formData: FormData): Promise<FormState> => {
   const supabase = await createSupabaseServerClient();
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;
   const userName = formData.get('username') as string;

   const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username: userName } },
   });

   if (error) {
      return { error: error.message };
   }

   revalidatePath('/');
   redirect('/');
};

export const loginUserAccount = async (prevData: FormState, formData: FormData): Promise<FormState> => {
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;

   const supabase = await createSupabaseServerClient();
   const { error } = await supabase.auth.signInWithPassword({ email, password });

   if (error) {
      return { error: error.message };
   }

   revalidatePath('/');
   redirect('/');
};
