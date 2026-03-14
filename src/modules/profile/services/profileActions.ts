'use server';

import type { Database } from '@db/types/database.ts';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { setFlash } from '@/shared/ui/FlashToaster';
import { ROUTES } from '@/shared/utils/constants';
import { getAuthenticatedUser } from '@/shared/utils/data/getAuthenticatedUser';
import { isUsernameAlreadyExist } from '@/shared/utils/data/isUsernameAlreadyExist';
import { getCloudinaryCredentials } from '@/shared/utils/integrations/cloudinary';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const getProfile = async (): Promise<{ profile: null | Profile }> => {
   const supabase = await createSupabaseServerClient();
   const user = await getAuthenticatedUser();

   if (!user) return { profile: null };

   const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
   return { profile };
};

export const updateProfileData = async ({
   email,
   userId,
   username,
}: {
   email: string;
   userId: string;
   username: string;
}): Promise<{ error: string }> => {
   const supabase = await createSupabaseServerClient();

   if (await isUsernameAlreadyExist(username)) {
      await setFlash({ type: 'error', message: 'This username is already in use' });
      return { error: 'This username is already in use' };
   }

   const { error } = await supabase.from('profiles').update({ email, username }).eq('id', userId);
   revalidatePath(ROUTES.PROFILE);

   if (error) {
      await setFlash({ type: 'error', message: error.message ?? 'Failed to update username. Please try again.' });
      return { error: error.message ?? 'Failed to update username. Please try again.' };
   }

   await setFlash({ type: 'success', message: 'Username updated successfully' });
   return { error: '' };
};

export const updateProfileAvatar = async (file: File, userId: string): Promise<void> => {
   const supabase = await createSupabaseServerClient();
   const { credentials, CLOUDINARY_URL } = getCloudinaryCredentials();

   const formData = new FormData();
   formData.append('file', file);
   formData.append('public_id', `avatars/${userId}`);
   formData.append('folder', 'avatars');
   formData.append('overwrite', 'true');

   const res = await fetch(`${CLOUDINARY_URL}/upload`, {
      body: formData,
      method: 'POST',
      headers: { Authorization: `Basic ${credentials}` },
   });

   const errorMessage = 'Error uploading avatar. Please try again.';

   if (!res.ok) {
      const data = await res.json().catch(() => null);
      await setFlash({ type: 'error', message: data?.error?.message ?? errorMessage });
      return;
   }

   const { secure_url } = await res.json();
   const { error } = await supabase.from('profiles').update({ avatar_url: secure_url }).eq('id', userId);

   if (error) {
      await setFlash({ type: 'error', message: error.message ?? errorMessage });
      return;
   }

   revalidatePath(ROUTES.PROFILE);
   await setFlash({ type: 'success', message: 'Avatar updated successfully' });
};

export const submitResetPasswordMail = async (email: string) => {
   const supabase = await createSupabaseServerClient();

   const origin = (await headers()).get('origin');
   const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}${ROUTES.RESET_PASSWORD}`,
   });

   if (error) {
      await setFlash({ type: 'error', message: error.message });
   } else {
      await setFlash({ type: 'success', message: 'Password reset email sent' });
   }

   return { error: error?.message ?? '' };
};

export const resetProfilePassword = async (password: string) => {
   const supabase = await createSupabaseServerClient();
   const { error } = await supabase.auth.updateUser({ password });

   if (error) {
      return { error: error?.message ?? '' };
   }

   await supabase.auth.signOut();
   revalidatePath(ROUTES.AUTH);
   revalidatePath('/');
   redirect('/');
};
