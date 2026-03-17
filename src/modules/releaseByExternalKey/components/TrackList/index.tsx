'use client';

import { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';

import TrackItem from './segments/TrackItem';

import styles from './TrackList.module.scss';

type Props = {
   isInline?: boolean;
   setActiveTrackId: (id: null | string) => void;
   tracks: ReleaseByExternalKeyType['release_tracks'];
   activeTrack: null | ReleaseByExternalKeyType['release_tracks'][number];
};

const TrackList = ({ tracks, isInline, activeTrack, setActiveTrackId }: Props) => (
   <aside className={isInline ? styles.inlineWrapper : styles.wrapper}>
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
   </aside>
);

export default TrackList;
