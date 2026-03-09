'use client';

import { ReleaseByIdDetails } from '../../types/releaseTypes';

import styles from './TrackList.module.scss';

type Track = ReleaseByIdDetails['release_tracks'][number];

const TrackItem = ({
   index,
   track,
   isActive,
   onSelect,
}: {
   track: Track;
   index: number;
   isActive: boolean;
   onSelect: (id: string) => void;
}) => (
   <li>
      <button
         onClick={() => onSelect(track.tracks.id)}
         className={`${styles.trackTab} ${isActive ? styles.active : ''}`}
      >
         <span className={styles.trackNum}>{String(index + 1).padStart(2, '0')}</span>
         <span className={styles.trackTitle}>{track.tracks.title}</span>
         <span className={styles.trackDuration}>{'0:30'}</span>
      </button>
   </li>
);

export default TrackItem;
