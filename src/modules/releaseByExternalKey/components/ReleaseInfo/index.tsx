'use client';
import type { Profile } from '@/modules/profile/types/profileTypes';

import Image from 'next/image';

import AlbumRating from '@/modules/releaseByExternalKey/components/AlbumRating';
import AudioPlayer from '@/modules/releaseByExternalKey/components/AudioPlayer';
import TrackList from '@/modules/releaseByExternalKey/components/TrackList';
import { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';
import Accordion from '@/shared/ui/Accordion';
import ActionButton from '@/shared/ui/Buttons/ActionButton';
import { formatReleaseDate } from '@/shared/utils/date/formatReleaseDate';

import { useTrackList } from './hooks/useTrackList';

import styles from './ReleaseInfo.module.scss';

const StartListeningButton = ({ onClick, className }: { className?: string; onClick?: () => void }) => {
   return (
      <ActionButton size="large" variant="red" onClick={onClick} className={className}>
         Start Listening
      </ActionButton>
   );
};

const ReleaseInfo = ({ release, userProfile }: { userProfile: Profile; release: ReleaseByExternalKeyType }) => {
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
                  draggable={false}
                  alt={release.title}
                  src={release.cover_url}
                  className={styles.bannerImage}
                  sizes="(max-width: 479px) 350px, (max-width: 1023px) 400px, 500px"
               />
            )}
            <StartListeningButton
               className={styles.startListeningButtonMobile}
               onClick={() => setActiveTrackId(tracks[0].tracks.id)}
            />
            <div className={styles.infoWrapper}>
               <span className={styles.releaseDate}>
                  {`Release date `}
                  <time dateTime={release.release_date}>{`// ${formatReleaseDate(release.release_date)}`}</time>
               </span>
               <h1 className={styles.title}>{release.title}</h1>
               <h3 className={styles.artists}>{artistsName}</h3>
               <AlbumRating
                  releaseId={release.id}
                  userProfile={userProfile}
                  rating={release.release_ratings}
                  releaseExternalKey={release.external_key}
               />
               <StartListeningButton
                  className={styles.startListeningButtonDesktop}
                  onClick={() => setActiveTrackId(tracks[0].tracks.id)}
               />
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
