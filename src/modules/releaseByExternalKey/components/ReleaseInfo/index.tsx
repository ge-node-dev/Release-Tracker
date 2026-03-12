'use client';
import Image from 'next/image';

import TrackList from '@/modules/releaseByExternalKey/components/TrackList';
import { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';

import { useTrackList } from './hooks/useTrackList';

import styles from './ReleaseInfo.module.scss';

const ReleaseInfo = ({ release }: { release: ReleaseByExternalKeyType }) => {
   const { activeTrack, setActiveTrackId, soundTrackPreview, setSoundTrackPreview } = useTrackList(
      release.release_tracks,
   );

   return (
      <>
         <div className={styles.bannerWrapper}>
            <span className={styles.absoluteTitle}>{release.title}</span>
            {release.cover_url && (
               <Image
                  width={500}
                  height={500}
                  sizes="500px"
                  quality={100}
                  priority={true}
                  alt={release.title}
                  src={release.cover_url}
                  className={styles.bannerImage}
               />
            )}
            <div className={styles.textWrapper}>
               <h1 className={styles.title}>{release.title}</h1>
               <h3 className={styles.artists}>
                  {release.release_artists.map((artist) => artist.artists.name).join(', ')}
               </h3>
            </div>
         </div>

         <TrackList
            activeTrack={activeTrack}
            coverUrl={release.cover_url}
            tracks={release.release_tracks}
            setActiveTrackId={setActiveTrackId}
            soundTrackPreview={soundTrackPreview}
            setSoundTrackPreview={setSoundTrackPreview}
            artistsName={release.release_artists.map((artist) => artist.artists.name).join(', ')}
         />
      </>
   );
};

export default ReleaseInfo;
