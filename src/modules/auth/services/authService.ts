'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export const createUserAccount = async (formData: FormData) => {
   const supabase = await createSupabaseServerClient();
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;

   const { error } = await supabase.auth.signUp({ email, password });

   if (error) {
      return { error: error.message };
   }

   revalidatePath('/');
   redirect('/');
};

export const loginUserAccount = async (formData: FormData) => {
   const supabase = await createSupabaseServerClient();
   const email = formData.get('email') as string;
   const password = formData.get('password') as string;

   const { error } = await supabase.auth.signInWithPassword({ email, password });

   if (error) {
      return { error: error.message };
   }

   revalidatePath('/');
   redirect('/');
};

export const logoutUserAccount = async () => {
   const supabase = await createSupabaseServerClient();
   const { error } = await supabase.auth.signOut();

   if (error) {
      return { error: error.message };
   }

   revalidatePath('/');
   redirect('/login');
};
