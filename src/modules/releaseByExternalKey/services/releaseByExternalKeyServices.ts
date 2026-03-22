import { cache } from 'react';

import { createSupabaseStaticClient } from '@/lib/supabase/client';

import { RELEASE_BY_EXTERNAL_KEY_QUERY } from './query';

export const getReleaseByExternalKey = cache(async (externalKey: string) => {
   const supabase = createSupabaseStaticClient();

   const { data, error } = await supabase
      .from('releases')
      .select(RELEASE_BY_EXTERNAL_KEY_QUERY)
      .eq('external_key', externalKey)
      .order('created_at', { ascending: false, referencedTable: 'comments' })
      .order('position', { ascending: true, referencedTable: 'release_tracks' })
      .maybeSingle();

   if (error) {
      throw new Error(`Failed to fetch release with external key: ${externalKey}`, { cause: error });
   }

   if (!data) {
      throw new Error(`Release with external key ${externalKey} not found`);
   }

   return data;
});