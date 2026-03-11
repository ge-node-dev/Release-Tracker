'use server';
import { cacheLife } from 'next/cache';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { CACHE_10MIN } from '@/shared/utils/constants';

import { RELEASE_BY_EXTERNAL_KEY_QUERY } from './query';

export const getTrackPreviewUrl = async (trackId: string | number): Promise<null | string> => {
   'use cache';
   cacheLife(CACHE_10MIN);

   const res = await fetch(`https://api.deezer.com/track/${trackId}`);
   const track = await res.json();
   return track.preview ?? null;
};

export const getReleaseByExternalKey = async (externalKey: string) => {
   const supabase = await createSupabaseServerClient();

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
};
