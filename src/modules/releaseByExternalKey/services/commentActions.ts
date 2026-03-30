'use server';

import { revalidatePath, updateTag } from 'next/cache';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { RELEASES_CACHE_TAG } from '@/shared/constants';
import { setFlash } from '@/shared/ui/FlashToaster';
import { getAuthenticatedUser } from '@/shared/utils/data/getAuthenticatedUser';

export const submitComment = async (
   releaseId: string,
   content: string,
   externalKey: string,
   parentId?: null | string,
): Promise<{ success: boolean }> => {
   const trimmed = content.trim();

   const user = await getAuthenticatedUser();

   if (!user) {
      await setFlash({ type: 'error', message: 'You must be signed in to comment' });
      return { success: false };
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
      await setFlash({ type: 'error', message: error.message });
      return { success: false };
   }

   await setFlash({ type: 'success', message: 'Comment added successfully' });
   updateTag(RELEASES_CACHE_TAG);
   revalidatePath(`/release/${externalKey}`);

   return { success: true };
};

export const deleteComment = async (commentId: string, externalKey: string): Promise<{ success: boolean }> => {
   const supabase = await createSupabaseServerClient();

   const { error } = await supabase.from('comments').delete().eq('id', commentId);
   if (error) {
      await setFlash({ type: 'error', message: error.message });
      return { success: false };
   }

   await setFlash({ type: 'success', message: 'Comment deleted successfully' });
   updateTag(RELEASES_CACHE_TAG);
   revalidatePath(`/release/${externalKey}`);
   return { success: true };
};
