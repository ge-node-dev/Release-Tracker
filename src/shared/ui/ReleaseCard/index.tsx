import type { ReleaseWithArtists } from '@/modules/release/types/releaseTypes';

import Link from 'next/link';

import BlurImage from '@/shared/HOC/withBlur';
import { formatReleaseDate } from '@/shared/utils/formatDate';

import styles from './ReleaseCard.module.scss';

const ReleaseCard = ({ release }: { release: ReleaseWithArtists }) => {
   const artist = release.release_artists?.[0].artists.name;

   return (
      <Link className={styles.card} href={`/release/${release.external_key}`}>
         <div className={styles.cardImageWrapper}>
            <BlurImage
               width={311}
               height={311}
               sizes="311px"
               alt={release.title}
               className={styles.cardImage}
               src={release.cover_url || ''}
            />
            <div className={styles.cardImageOverlay}>
               <BlurImage
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
            <p className={styles.cardArtistName}>{artist}</p>
            <p className={styles.cardDate}>{formatReleaseDate(release.release_date)}</p>
         </div>
      </Link>
   );
};

export default ReleaseCard;
