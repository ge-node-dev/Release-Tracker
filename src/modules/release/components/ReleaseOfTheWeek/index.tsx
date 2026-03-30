import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

import { getReleaseOfTheWeek } from '@/modules/release/services/releaseServices';
import { Badge } from '@/shared/ui/Badge';
import LinkButton from '@/shared/ui/Buttons/LinkButton';

import styles from './ReleaseOfTheWeek.module.scss';

const ReleaseOfTheWeek = async () => {
   const releaseOfTheWeek = await getReleaseOfTheWeek();

   if (!releaseOfTheWeek) return null;

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
                  className={styles.coverImage}
                  sizes="(min-width: 1440px) 650px,
          (min-width: 1024px) 45vw,
          (min-width: 768px) 80vw,
          (min-width: 480px) 90vw,
          100vw"
               />
            </Link>
         </div>
         <div className={styles.infoContainer}>
            <div className={styles.info}>
               <span className={styles.absoluteTitle}>{title}</span>
               <span className={styles.releaseOfTheWeek}>RELEASE OF THE WEEK</span>
               <h1 className={styles.title}>title</h1>
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
         <div className={styles.coverContainer}>
            <div
               className={styles.coverImage}
               style={{
                  padding: 0,
                  width: '100%',
                  border: 'none',
                  aspectRatio: '1 / 1',
               }}
            >
               <Skeleton height="100%" containerClassName={styles.coverSkeleton} />
            </div>
         </div>

         <div className={styles.infoContainer}>
            <div className={styles.info}>
               <Skeleton width={200} height="1rem" />
               {/*Title*/}
               <div>
                  <Skeleton width="85%" height="clamp(1.8rem, 10vw, 8rem)" />
               </div>
               {/*Artists*/}
               <div>
                  <Skeleton width="60%" height="clamp(1.6rem, 3vw, 3rem)" />
               </div>
               {/*Genres*/}
               <div className={styles.genres}>
                  <Skeleton width={90} height={32} />
               </div>
               {/*Button*/}
               <div className={styles.listenNowBtn}>
                  <Skeleton width={220} height={55} />
               </div>
            </div>
         </div>
      </section>
   );
};

export default ReleaseOfTheWeek;
