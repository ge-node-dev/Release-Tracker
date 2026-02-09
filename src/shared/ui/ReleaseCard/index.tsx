import type { ReleaseWithArtists } from '@/modules/release/types/releaseTypes';

import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

import { formatReleaseDate } from '@/shared/utils/date/formatReleaseDate';

import styles from './ReleaseCard.module.scss';

const ReleaseCard = ({ release }: { release: ReleaseWithArtists }) => {
   const artistsNames = release.release_artists?.map((artist) => artist.artists.name).join(', ');

   return (
      <Link prefetch={false} className={styles.card} href={`/release/${release.external_key}`}>
         <div className={styles.cardImageWrapper}>
            <Image
               fill={true}
               sizes="311px"
               alt={release.title}
               className={styles.cardImage}
               src={release.cover_url || ''}
            />
            <div className={styles.cardImageOverlay}>
               <Image
                  width={40}
                  alt="Play"
                  height={40}
                  className={styles.cardPlayIcon}
                  src={'/assets/icons/playCircle.svg'}
               />
            </div>
         </div>
         <div className={styles.cardInfo}>
            <h3 className={styles.cardTitle}>{release.title}</h3>
            <p className={styles.cardArtistsNames}>{artistsNames}</p>
            <p className={styles.cardDate}>{formatReleaseDate(release.release_date)}</p>
         </div>
      </Link>
   );
};

export const ReleaseCardSkeleton = () => {
   return (
      <div className={styles.card}>
         <div className={styles.cardImageWrapper}>
            <Skeleton height="100%" style={{ display: 'block' }} containerClassName={styles.cardImage} />
         </div>
         <div className={styles.cardInfo}>
            <Skeleton height={22} width="80%" style={{ marginBottom: '4px' }} />
            <Skeleton height={18} width="60%" style={{ marginBottom: '4px' }} />
            <Skeleton height={16} width="40%" />
         </div>
      </div>
   );
};

export default ReleaseCard;
