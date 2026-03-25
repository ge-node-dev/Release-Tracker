'use server';

import { revalidatePath } from 'next/cache';

import { createSupabaseAdminClient } from '@/lib/supabase/admin';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { updateProfileData } from '@/modules/profile/services/profileActions';
import { setFlash } from '@/shared/ui/FlashToaster';
import { ROUTES } from '@/shared/utils/constants';
import { isUsernameAlreadyExist } from '@/shared/utils/data/isUsernameAlreadyExist';

export type FormState = {
   error: string;
   email?: string;
   success: boolean;
};

export const createUserAccount = async (_: FormState, formData: FormData): Promise<FormState> => {
   const supabase = await createSupabaseServerClient();

   const email = formData.get('email')?.toString().trim() ?? '';
   const password = formData.get('password')?.toString() ?? '';
   const username = formData.get('username')?.toString().trim() ?? '';

   if (await isUsernameAlreadyExist(username)) {
      return { email, success: false, error: 'This username is already in use' };
   }

   const { data, error } = await supabase.auth.signUp({
      email,
      password,
   });

   if (error) {
      await setFlash({ type: 'error', message: error.message });
      return { email, success: false, error: error.message };
   }

   const { error: profileError } = await updateProfileData({
      email,
      username,
      userId: data.user!.id,
   });

   if (profileError) {
      await createSupabaseAdminClient().auth.admin.deleteUser(data.user!.id);
      return { email, success: false, error: 'Failed to create account. Please try again.' };
   }

   return { error: '', success: true };
};

export const loginUserAccount = async (_: FormState, formData: FormData): Promise<FormState> => {
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
   revalidatePath(ROUTES.AUTH);
   revalidatePath('/');
};

export const forgotPassword = async (formData: FormData): Promise<FormState> => {
   const email = formData.get('email')?.toString().trim() ?? '';

   if (!email) {
      return { success: false, error: 'Email is required' };
   }

   const supabase = await createSupabaseServerClient();
   const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
   });

   if (error) {
      return { success: false, error: error.message };
   }

   return { email, error: '', success: true };
};

export const validateCodeForResetPassword = async (code: string): Promise<{ error: string }> => {
   const supabase = await createSupabaseServerClient();
   const { error } = await supabase.auth.exchangeCodeForSession(code);
   return { error: error?.message ?? '' };
};
