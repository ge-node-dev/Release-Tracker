import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

import { getReleaseOfTheWeek } from '@/modules/release/services/releaseServices';
import { Badge } from '@/shared/ui/Badge';
import LinkButton from '@/shared/ui/Buttons/LinkButton';

import styles from './ReleaseOfTheWeek.module.scss';

const ReleaseOfTheWeek = async () => {
   const releaseOfTheWeek = await getReleaseOfTheWeek();

   if (!releaseOfTheWeek) {
      throw new Error('Failed to get release of the week');
   }

   const { title, cover_url, external_key, release_genres, release_artists } = releaseOfTheWeek;

   const artists = release_artists?.map(({ artists }) => artists.name).join(' // ');

   if (!cover_url) {
      throw new Error('No image URL provided');
   }

   const releaseHref = `/release/${external_key}`;

   return (
      <section className={styles.grid}>
         <div className={styles.coverContainer}>
            <Link href={releaseHref} aria-label={'To release of the week'}>
               <Image
                  width={650}
                  height={650}
                  src={cover_url}
                  priority={true}
                  loading={'eager'}
                  draggable={false}
                  alt={'Release cover'}
                  sizes={'600px, 300px'}
                  className={styles.coverImage}
               />
            </Link>
         </div>
         <div className={styles.infoContainer}>
            <div className={styles.info}>
               <span className={styles.absoluteTitle}>{title}</span>
               <span className={styles.releaseOfTheWeek}>RELEASE OF THE WEEK</span>
               <h1 className={styles.title}>{title}</h1>
               <h3 className={styles.artist}>{artists}</h3>
               <div className={styles.genres}>
                  {release_genres?.map(({ genres }) => (
                     <Badge key={genres.id}>
                        <span>{genres.title}</span>
                     </Badge>
                  ))}
               </div>

               <LinkButton
                  size="large"
                  variant="red"
                  href={releaseHref}
                  ariaLabel={'Listen now'}
                  className={styles.listenNowBtn}
               >
                  <span>Listen now</span>
               </LinkButton>
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
