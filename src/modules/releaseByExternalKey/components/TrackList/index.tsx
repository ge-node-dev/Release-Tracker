'use client';

import AudioPlayer from '@/modules/releaseByExternalKey/components/AudioPlayer';
import { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';

import TrackItem from './segments/TrackItem';

import styles from './TrackList.module.scss';

type Props = {
   artistsName: string;
   coverUrl?: null | string;
   soundTrackPreview: null | string;
   setActiveTrackId: (id: null | string) => void;
   setSoundTrackPreview: (url: null | string) => void;
   tracks: ReleaseByExternalKeyType['release_tracks'];
   activeTrack: null | ReleaseByExternalKeyType['release_tracks'][number];
};

const TrackList = ({
   tracks,
   coverUrl,
   activeTrack,
   artistsName,
   setActiveTrackId,
   soundTrackPreview,
   setSoundTrackPreview,
}: Props) => {
   const activeIndex = activeTrack ? tracks.findIndex((t) => t.tracks.id === activeTrack.tracks.id) : -1;

   const handlePrev = () => {
      if (activeIndex > 0) setActiveTrackId(tracks[activeIndex - 1].tracks.id);
   };

   const handleNext = () => {
      if (activeIndex >= 0 && activeIndex < tracks.length - 1) setActiveTrackId(tracks[activeIndex + 1].tracks.id);
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
                  onSelect={(id) => setActiveTrackId(id)}
                  isActive={item.tracks.id === activeTrack?.tracks.id}
               />
            ))}
         </ul>
         {activeTrack && (
            <AudioPlayer
               coverUrl={coverUrl}
               trackSubtitle={artistsName}
               soundTrackPreview={soundTrackPreview}
               trackTitle={activeTrack.tracks.title}
               onPrev={activeIndex > 0 ? handlePrev : undefined}
               onNext={activeIndex < tracks.length - 1 ? handleNext : undefined}
               onPlayerClose={() => {
                  setSoundTrackPreview(null);
                  setActiveTrackId(null);
               }}
            />
         )}
      </aside>
   );
};

export default TrackList;
