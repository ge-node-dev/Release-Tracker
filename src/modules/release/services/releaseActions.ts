'use server';

import { cacheLife } from 'next/cache';

import { CACHE_10MIN } from '@/shared/utils/constants';

export const getTrackPreviewUrl = async (trackId: string | number): Promise<null | string> => {
   'use cache';
   cacheLife(CACHE_10MIN);

   const res = await fetch(`https://api.deezer.com/track/${trackId}`);
   const track = await res.json();
   return track.preview ?? null;
};
