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

   const handlePrev = activeIndex > 0 ? () => setActiveTrackId(tracks[activeIndex - 1].tracks.id) : undefined;

   const handleNext =
      activeIndex >= 0 && activeIndex < tracks.length - 1
         ? () => setActiveTrackId(tracks[activeIndex + 1].tracks.id)
         : undefined;

   const handleClose = () => {
      setSoundTrackPreview(null);
      setActiveTrackId(null);
   };

   useEffect(() => {
      if (!activeTrackDeezerId) return;

      let cancelled = false;

      getTrackPreviewUrl(activeTrackDeezerId).then((result) => {
         if (cancelled) return;
         if (result.error) toast.error(result.error);
         else setSoundTrackPreview(result.url);
      });

      return () => {
         cancelled = true;
      };
   }, [activeTrackDeezerId]);

   useEffect(
      () => () => {
         setSoundTrackPreview(null);
         setActiveTrackId(null);
      },
      [],
   );

   return { handleNext, handlePrev, activeTrack, handleClose, setActiveTrackId, soundTrackPreview };
};
