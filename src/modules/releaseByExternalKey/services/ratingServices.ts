'use server';

import { revalidatePath, updateTag } from 'next/cache';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { setFlash } from '@/shared/ui/FlashToaster';
import { RELEASES_CACHE_TAG } from '@/shared/utils/constants';
import { getAuthenticatedUser } from '@/shared/utils/data/getAuthenticatedUser';

import { RatingCooldown } from '../types/ratingTypes';

export const checkRatingCooldown = async (releaseId: string): Promise<RatingCooldown> => {
   const user = await getAuthenticatedUser();

   if (!user) {
      return { can_rate: false, last_rated_at: null, cooldown_until: null };
   }

   const supabase = await createSupabaseServerClient();

   const { data, error } = await supabase.rpc('check_rating_cooldown', {
      p_user_id: user.id,
      p_release_id: releaseId,
   });

   if (error || !data || data.length === 0) {
      return { can_rate: true, last_rated_at: null, cooldown_until: null };
   }

   return data[0] as RatingCooldown;
};

export const getUserRating = async (releaseId: string, userId?: string): Promise<null | number> => {
   const targetUserId = userId ?? (await getAuthenticatedUser())?.id;

   if (!targetUserId) {
      return null;
   }

   const supabase = await createSupabaseServerClient();

   const { data } = await supabase
      .from('release_ratings')
      .select('rating')
      .eq('release_id', releaseId)
      .eq('user_id', targetUserId)
      .maybeSingle();

   return data?.rating ?? null;
};

export const submitRating = async (
   releaseId: string,
   rating: number,
   releaseExternalKey: string,
): Promise<{ success: boolean }> => {
   const user = await getAuthenticatedUser();

   if (!user) {
      return { success: false };
   }

   const supabase = await createSupabaseServerClient();

   const { data: cooldownData } = await supabase.rpc('check_rating_cooldown', {
      p_user_id: user.id,
      p_release_id: releaseId,
   });

   if (cooldownData && cooldownData.length > 0) {
      const { can_rate, cooldown_until } = cooldownData[0] as RatingCooldown;

      if (!can_rate) {
         const now = new Date();
         const cooldownDate = new Date(cooldown_until!);
         const diffMs = cooldownDate.getTime() - now.getTime();
         const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
         const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

         await setFlash({
            type: 'error',
            message: `You can rate the album only once per 24 hours.\n\nTry again in ${diffHours}h ${diffMinutes}m`,
         });
         return { success: false };
      }
   }

   const { data: existingRating } = await supabase
      .from('release_ratings')
      .select('id')
      .eq('release_id', releaseId)
      .eq('user_id', user.id)
      .maybeSingle();

   let error: null | Error = null;

   if (existingRating) {
      const { error: updateRatingError } = await supabase
         .from('release_ratings')
         .update({ rating, updated_at: new Date().toISOString() })
         .eq('id', existingRating.id);

      error = updateRatingError ?? null;
   } else {
      const { error: insertRatingError } = await supabase.from('release_ratings').insert({
         rating,
         user_id: user.id,
         release_id: releaseId,
      });

      error = insertRatingError ?? null;
   }

   if (error) {
      await setFlash({ type: 'error', message: error.message });
      return { success: false };
   }

   await setFlash({ type: 'success', message: 'Rating submitted' });
   revalidatePath(`/release/${releaseExternalKey}`);

   return { success: true };
};
