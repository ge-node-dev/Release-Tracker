'use server';

import { revalidatePath } from 'next/cache';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getAuthenticatedUser } from '@/shared/utils/data/getAuthenticatedUser';

export type SubmitCommentResult = { error?: string };

export const submitComment = async (
   releaseId: string,
   content: string,
   externalKey: string,
   parentId?: null | string,
): Promise<SubmitCommentResult> => {
   const trimmed = content.trim();

   const user = await getAuthenticatedUser();

   if (!user) {
      return { error: 'You must be signed in to comment' };
   }

   const supabase = await createSupabaseServerClient();
   const insert: { content: string; user_id: string; parent_id?: string; release_id: string } = {
      content: trimmed,
      user_id: user.id,
      release_id: releaseId,
   };
   if (parentId) insert.parent_id = parentId;

   const { error } = await supabase.from('comments').insert(insert);

   if (error) {
      return { error: error.message };
   }

   revalidatePath(`/release/${externalKey}`);
   return {};
};

export const deleteComment = async (
   commentId: string,
   externalKey: string,
): Promise<{ success: boolean; error: null | string }> => {
   const supabase = await createSupabaseServerClient();

   const { error } = await supabase.from('comments').delete().eq('id', commentId);
   if (error) {
      return { success: false, error: error.message };
   }
   revalidatePath(`/release/${externalKey}`);
   return { error: null, success: true };
};
