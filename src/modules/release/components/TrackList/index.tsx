'use client';
import { useState } from 'react';

import { ReleaseByIdDetails } from '@/modules/release/types/releaseTypes';

import styles from './TrackList.module.scss';

const TrackList = ({ tracks }: { tracks: ReleaseByIdDetails['release_tracks'] }) => {
   const [activeTrack, setActiveTrack] = useState<null | number>(null);

   return (
      <aside className={styles.wrapper}>
         <div className={styles.info}>
            <span>Tracklist</span>
            <span>{tracks.length}</span>
         </div>
         <ul>
            {tracks.map(({ position, tracks: { id, title } }, index) => (
               <li key={id}>
                  <button
                     onClick={() => setActiveTrack(position)}
                     className={`${styles.trackTab} ${activeTrack === position ? styles.active : ''}`}
                  >
                     <span className={styles.trackNum}>{index < 9 ? `0${index + 1}` : index + 1}</span>
                     <span className={styles.trackTitle}>{title}</span>
                     <span className={styles.trackDuration}>{'0:30'}</span>
                  </button>
               </li>
            ))}
         </ul>
      </aside>
   );
};

export default TrackList;
