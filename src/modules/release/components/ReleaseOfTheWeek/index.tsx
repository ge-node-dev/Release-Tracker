import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

import { getReleaseOfTheWeek } from '@/modules/release/services/releaseServices';
import { getGlowColorFromImage } from '@/modules/release/utils/color';
import { Badge } from '@/shared/ui/Badge';

import styles from './ReleaseOfTheWeek.module.scss';

const ReleaseOfTheWeek = async () => {
   const releaseOfTheWeek = await getReleaseOfTheWeek();

   if (!releaseOfTheWeek) {
      throw new Error('Failed to get release of the week');
   }

   const { title, cover_url, external_key, release_genres, release_artists } = releaseOfTheWeek;

   const artists = release_artists?.map(({ artists }) => artists.name).join(', ');

   if (!cover_url) {
      throw new Error('No image URL provided');
   }

   const imageBuffer = await fetch(cover_url).then((res) => res.arrayBuffer());
   const glowColor = await getGlowColorFromImage(Buffer.from(imageBuffer));
   const glowStyle = {
      background: `radial-gradient(circle, ${glowColor} 5%, transparent 90%)`,
   };

   const releaseHref = `/release/${external_key}`;

   return (
      <section className={styles.grid}>
         <div className={styles.infoContainer}>
            <Badge>
               <span>RELEASE OF THE WEEK</span>
            </Badge>
            <h1 className={styles.title}>{`${title.toUpperCase()}`}</h1>
            <h3 className={styles.artist}>{artists}</h3>
            <div className={styles.genres}>
               {release_genres?.map(({ genres }) => (
                  <Badge key={genres.id}>
                     <span>{genres.title}</span>
                  </Badge>
               ))}
            </div>
            <Link href={releaseHref} aria-label={'Listen now'} className={styles.listenNowBtn}>
               <Image width={24} height={24} alt={'Play'} src={'/assets/icons/play.svg'} />
               <span>Listen now</span>
            </Link>
         </div>
         <div className={styles.coverScene}>
            <div className={styles.coverContainer}>
               <div style={glowStyle} className={styles.glow} />
               <Link href={releaseHref} aria-label={'To release'}>
                  <Image
                     width={500}
                     height={500}
                     src={cover_url}
                     priority={true}
                     loading={'eager'}
                     draggable={false}
                     alt={'Release cover'}
                     sizes={'500px, 300px'}
                     className={styles.coverImage}
                  />
               </Link>
            </div>
         </div>
      </section>
   );
};

export const ReleaseOfTheWeekSkeleton = () => {
   return (
      <section className={styles.grid}>
         <div className={styles.infoContainer}>
            <Skeleton height={32} width={180} />
            <Skeleton height={82} width={'90%'} />
            <Skeleton height={36} width={'40%'} />
            <Skeleton height={32} width={150} className={styles.genres} />
            <Skeleton width={200} height={'4rem'} style={{ borderRadius: '30px' }} />
         </div>
         <div className={styles.coverSkeleton}>
            <Skeleton width={'100%'} height={'100%'} borderRadius={'30px'} />
         </div>
      </section>
   );
};

export default ReleaseOfTheWeek;
