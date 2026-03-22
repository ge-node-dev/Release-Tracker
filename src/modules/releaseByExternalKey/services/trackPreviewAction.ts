'use server';

import { cacheLife } from 'next/cache';

import { CACHE_10MIN } from '@/shared/utils/constants';

export type GetTrackPreviewResult = { error?: string; url: null | string };

export const getTrackPreviewUrl = async (trackId: string | number): Promise<GetTrackPreviewResult> => {
   'use cache';
   cacheLife(CACHE_10MIN);

   const res = await fetch(`https://api.deezer.com/track/${trackId}`);
   const track = await res.json();
   if (track.error) {
      return { url: null, error: 'Error while playing track. Please try again later.' };
   }
   return { url: track.preview ?? null };
};