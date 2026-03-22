'use client';
import Image from 'next/image';

import AudioPlayer from '@/modules/releaseByExternalKey/components/AudioPlayer';
import TrackList from '@/modules/releaseByExternalKey/components/TrackList';
import { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';
import Accordion from '@/shared/ui/Accordion';

import { useTrackList } from './hooks/useTrackList';

import styles from './ReleaseInfo.module.scss';

const ReleaseInfo = ({ release }: { release: ReleaseByExternalKeyType }) => {
   const tracks = release.release_tracks;
   const { handleNext, handlePrev, activeTrack, handleClose, setActiveTrackId, soundTrackPreview } =
      useTrackList(tracks);

   const artistsName = release.release_artists.map((artist) => artist.artists.name).join(', ');

   return (
      <>
         <div className={styles.bannerWrapper}>
            <span className={styles.absoluteTitle}>{release.title}</span>
            {release.cover_url && (
               <Image
                  width={400}
                  height={400}
                  quality={100}
                  priority={true}
                  alt={release.title}
                  src={release.cover_url}
                  className={styles.bannerImage}
                  sizes="(max-width: 479px) 350px, (max-width: 1023px) 400px, 500px"
               />
            )}
            <div className={styles.textWrapper}>
               <h1 className={styles.title}>{release.title}</h1>
               <h3 className={styles.artists}>{artistsName}</h3>
            </div>
         </div>

         <TrackList tracks={tracks} activeTrack={activeTrack} setActiveTrackId={setActiveTrackId} />

         <div className={styles.bottomBar} data-player-visible={!!soundTrackPreview}>
            <AudioPlayer
               onPrev={handlePrev}
               onNext={handleNext}
               trackSubtitle={artistsName}
               onPlayerClose={handleClose}
               coverUrl={release.cover_url}
               soundTrackPreview={soundTrackPreview}
               trackTitle={activeTrack?.tracks.title}
            />
            <div className={styles.accordionBar}>
               <Accordion>
                  <TrackList
                     isInline={true}
                     tracks={tracks}
                     activeTrack={activeTrack}
                     setActiveTrackId={setActiveTrackId}
                  />
               </Accordion>
            </div>
         </div>
      </>
   );
};

export default ReleaseInfo;
