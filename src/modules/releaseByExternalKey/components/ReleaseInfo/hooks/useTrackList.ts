'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getTrackPreviewUrl } from '@/modules/releaseByExternalKey/services/releaseByExternalKeyServices';
import { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';

export const useTrackList = (tracks: ReleaseByExternalKeyType['release_tracks']) => {
   const [activeTrackId, setActiveTrackId] = useState<null | string>(null);
   const [soundTrackPreview, setSoundTrackPreview] = useState<null | string>(null);

   const activeIndex = activeTrackId ? tracks.findIndex((t) => t.tracks.id === activeTrackId) : -1;
   const activeTrack = activeIndex >= 0 ? tracks[activeIndex] : null;
   const activeTrackDeezerId = activeIndex >= 0 ? tracks[activeIndex].tracks.deezer_track_id : null;

   useEffect(() => {
      if (!activeTrackDeezerId) return;

      let cancelled = false;

      getTrackPreviewUrl(activeTrackDeezerId).then((result) => {
         if (cancelled) return;
         if (result.error) {
            toast.error(result.error);
         }
         setSoundTrackPreview(result.url);
      });

      return () => {
         cancelled = true;
      };
   }, [activeTrackDeezerId]);

   useEffect(() => {
      return () => {
         setSoundTrackPreview(null);
         setActiveTrackId(null);
      };
   }, []);

   return { activeTrack, setActiveTrackId, soundTrackPreview, setSoundTrackPreview };
};
