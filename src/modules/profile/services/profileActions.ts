'use server';

import type { Database } from '@db/types/database.ts';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { createSupabaseServerClient } from '@/lib/supabase/server';
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
}) => {
   const supabase = await createSupabaseServerClient();

   if (await isUsernameAlreadyExist(username)) {
      return { error: 'This username is already in use' };
   }

   const { error } = await supabase.from('profiles').update({ email, username }).eq('id', userId);
   revalidatePath(ROUTES.PROFILE);
   return { error: error?.message ?? '' };
};

export const updateProfileAvatar = async (
   file: File,
   userId: string,
): Promise<{ error: string; success?: boolean }> => {
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

   if (!res.ok) {
      const data = await res.json().catch(() => null);
      return { error: data?.error?.message };
   }

   const { secure_url } = await res.json();
   const { error } = await supabase.from('profiles').update({ avatar_url: secure_url }).eq('id', userId);

   if (error) return { error: error.message };

   revalidatePath(ROUTES.PROFILE);
   return { error: '', success: true };
};

export const submitResetPasswordMail = async (email: string) => {
   const supabase = await createSupabaseServerClient();
   const origin = (await headers()).get('origin');
   const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}${ROUTES.RESET_PASSWORD}`,
   });
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
