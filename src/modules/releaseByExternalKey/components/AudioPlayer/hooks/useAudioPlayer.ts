import { useEffect, useRef, useState } from 'react';

export const useAudioPlayer = (soundTrackPreview: null | string) => {
   const audioRef = useRef<HTMLAudioElement>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [progress, setProgress] = useState(0);
   const [duration, setDuration] = useState(0);
   const [volume, setVolume] = useState(50);
   const prevVolumeRef = useRef(50);
   const [isLooped, setIsLooped] = useState(false);

   useEffect(() => {
      if (!soundTrackPreview) return;

      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = volume / 100;
      audio.play().catch((e) => {
         if (e.name !== 'AbortError') console.error(e);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [soundTrackPreview]);

   const togglePlay = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) {
         audio.pause();
      } else {
         audio.play().catch(console.error);
      }
   };

   const handleTimeUpdate = () => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
   };

   const handleLoadedMetadata = () => {
      if (audioRef.current) setDuration(audioRef.current.duration);
   };

   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      const value = Number(e.target.value);
      audio.currentTime = (value / 100) * audio.duration;
      setProgress(value);
   };

   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (value > 0) prevVolumeRef.current = value;
      setVolume(value);
      if (audioRef.current) audioRef.current.volume = value / 100;
   };

   const toggleMute = () => {
      const next = volume > 0 ? 0 : prevVolumeRef.current;
      setVolume(next);
      if (audioRef.current) audioRef.current.volume = next / 100;
   };

   const toggleLoop = () => setIsLooped((prev) => !prev);

   return {
      volume,
      audioRef,
      duration,
      isLooped,
      progress,
      isPlaying,
      handleSeek,
      toggleLoop,
      toggleMute,
      togglePlay,
      handleTimeUpdate,
      handleVolumeChange,
      handleLoadedMetadata,
      onEmptied: () => setProgress(0),
      onPlay: () => setIsPlaying(true),
      onEnded: () => setIsPlaying(false),
      onPause: () => setIsPlaying(false),
   };
};
