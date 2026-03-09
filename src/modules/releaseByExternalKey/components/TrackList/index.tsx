'use client';
import { useEffect, useState } from 'react';

import { getTrackPreviewUrl } from '@/modules/releaseByExternalKey/services/releaseServices';
import { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';

import AudioPlayer from '../AudioPlayer';

import TrackItem from './TrackItem';

import styles from './TrackList.module.scss';

type Props = {
   artistsName: string;
   coverUrl?: null | string;
   tracks: ReleaseByExternalKeyType['release_tracks'];
};

const TrackList = ({ tracks, coverUrl, artistsName }: Props) => {
   const [activeTrackId, setActiveTrackId] = useState<null | string>(null);
   const [previewUrl, setPreviewUrl] = useState<null | string>(null);

   const activeIndex = activeTrackId ? tracks.findIndex((t) => t.tracks.id === activeTrackId) : -1;

   const activeTrack = activeIndex >= 0 ? tracks[activeIndex] : null;

   useEffect(() => {
      const trackId = activeTrack?.tracks.deezer_track_id;

      if (!trackId) {
         return;
      }

      let cancelled = false;

      getTrackPreviewUrl(trackId).then((url) => {
         if (!cancelled) setPreviewUrl(url);
      });

      return () => {
         cancelled = true;
      };
   }, [activeTrack?.tracks.deezer_track_id]);

   useEffect(() => {
      return () => {
         setPreviewUrl(null);
         setActiveTrackId(null);
      };
   }, []);

   const handleSelect = (id: string) => setActiveTrackId(id);

   const handlePrev = () => {
      setActiveTrackId((prev) => {
         const idx = prev ? tracks.findIndex((t) => t.tracks.id === prev) : -1;
         return idx > 0 ? tracks[idx - 1].tracks.id : prev;
      });
   };

   const handleNext = () => {
      setActiveTrackId((prev) => {
         const idx = prev ? tracks.findIndex((t) => t.tracks.id === prev) : -1;
         return idx >= 0 && idx < tracks.length - 1 ? tracks[idx + 1].tracks.id : prev;
      });
   };

   return (
      <aside className={styles.wrapper}>
         <div className={styles.info}>
            <span>Tracklist</span>
            <span>{tracks.length}</span>
         </div>
         <ul>
            {tracks.map((item, index) => (
               <TrackItem
                  track={item}
                  index={index}
                  key={item.tracks.id}
                  onSelect={handleSelect}
                  isActive={item.tracks.id === activeTrackId}
               />
            ))}
         </ul>
         {previewUrl && activeTrack && (
            <AudioPlayer
               coverUrl={coverUrl}
               previewUrl={previewUrl}
               trackSubtitle={artistsName}
               trackTitle={activeTrack.tracks.title}
               onPrev={activeIndex > 0 ? handlePrev : undefined}
               onNext={activeIndex < tracks.length - 1 ? handleNext : undefined}
               onPlayerClose={() => {
                  setPreviewUrl(null);
                  setActiveTrackId(null);
               }}
            />
         )}
      </aside>
   );
};

export default TrackList;
