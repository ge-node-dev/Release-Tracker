'use client';
import Image from 'next/image';
import { createPortal } from 'react-dom';

import {
   AudioPlayerArrow,
   CloseIcon,
   NoVolumeIcon,
   PauseIcon,
   PlayIcon,
   RepeatIcon,
   VolumeIcon,
} from '@/shared/ui/Icons';
import { formatTrackTime } from '@/shared/utils/data/formatTrackTime';

import { useAudioPlayer } from './hooks/useAudioPlayer';

import styles from './AudioPlayer.module.scss';

type Props = {
   previewUrl: string;
   onNext?: () => void;
   onPrev?: () => void;
   trackTitle?: string;
   trackSubtitle: string;
   coverUrl?: null | string;
   onPlayerClose: () => void;
};

const AudioPlayer = ({ onNext, onPrev, coverUrl, previewUrl, trackTitle, onPlayerClose, trackSubtitle }: Props) => {
   const {
      onPlay,
      volume,
      onEnded,
      onPause,
      audioRef,
      duration,
      isLooped,
      progress,
      isPlaying,
      onEmptied,
      handleSeek,
      toggleLoop,
      toggleMute,
      togglePlay,
      handleTimeUpdate,
      handleVolumeChange,
      handleLoadedMetadata,
   } = useAudioPlayer(previewUrl);

   return createPortal(
      <div className={styles.wrapper}>
         <audio
            ref={audioRef}
            loop={isLooped}
            onPlay={onPlay}
            src={previewUrl}
            onEnded={onEnded}
            onPause={onPause}
            onEmptied={onEmptied}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
         />

         <div className={styles.trackInfo}>
            {coverUrl && (
               <Image
                  width={64}
                  height={64}
                  sizes="64px"
                  src={coverUrl}
                  alt="track cover"
                  className={styles.trackImage}
               />
            )}
            <div className={styles.trackTitlesWrapper}>
               {trackTitle && <h3 className={styles.trackTitle}>{trackTitle}</h3>}
               {trackSubtitle && <span className={styles.trackSubtitle}>{trackSubtitle}</span>}
            </div>
         </div>

         <div className={styles.controls}>
            <div className={styles.controlsButtons}>
               <button onClick={onPrev} disabled={!onPrev} aria-label="Previous" className={styles.arrowButton}>
                  <AudioPlayerArrow />
               </button>
               <button onClick={togglePlay} className={styles.playButton} aria-label={isPlaying ? 'Pause' : 'Play'}>
                  {!isPlaying ? <PlayIcon style={{ width: '16px', height: '16px' }} /> : <PauseIcon />}
               </button>
               <button onClick={onNext} aria-label="Next" disabled={!onNext} className={styles.arrowButton}>
                  <AudioPlayerArrow style={{ transform: 'rotate(180deg)' }} />
               </button>
               <button
                  aria-label="Repeat"
                  onClick={toggleLoop}
                  className={`${styles.repeatButton} ${isLooped ? styles.activeLoop : ''}`}
               >
                  <RepeatIcon width={20} height={20} />
               </button>
            </div>
            <div className={styles.progressSection}>
               <span className={styles.time}>{formatTrackTime((progress / 100) * duration)}</span>
               <input
                  min={0}
                  max={100}
                  type="range"
                  value={progress}
                  onChange={handleSeek}
                  className={styles.progress}
                  style={{ '--progress': `${progress}%` } as React.CSSProperties}
               />
               <span className={styles.time}>{formatTrackTime(duration)}</span>
            </div>
         </div>

         <div className={styles.rightSection}>
            <div className={styles.volumeSection}>
               <button onClick={toggleMute} className={styles.buttonVolume}>
                  {volume === 0 ? <NoVolumeIcon /> : <VolumeIcon />}
               </button>
               <input
                  min={0}
                  max={100}
                  type="range"
                  value={volume}
                  className={styles.volume}
                  onChange={handleVolumeChange}
                  style={{ '--volume': `${volume}%` } as React.CSSProperties}
               />
            </div>
            <button onClick={onPlayerClose} className={styles.closeIcon}>
               <CloseIcon />
            </button>
         </div>
      </div>,
      document.body,
   );
};

export default AudioPlayer;
