import Link from 'next/link';

import { getReleaseOfTheWeek } from '@/modules/release/services/releaseServices';
import { getGlowColorFromImage } from '@/modules/release/utils/color';
import BlurImage from '@/shared/HOC/withBlur';
import { Badge } from '@/shared/ui/Badge';

import styles from './ReleaseOfTheWeek.module.scss';

export const ReleaseOfTheWeek = async () => {
   const releaseOfTheWeek = await getReleaseOfTheWeek();

   if (!releaseOfTheWeek) {
      throw new Error('Failed to get release of the week');
   }

   const { title, cover_url, external_key, release_genres, release_artists } = releaseOfTheWeek;

   const artists = release_artists?.map(({ artists }) => artists.name);

   if (!cover_url) {
      throw new Error('No image URL provided');
   }

   const imageBuffer = await fetch(cover_url).then((res) => res.arrayBuffer());
   const glowColor = await getGlowColorFromImage(Buffer.from(imageBuffer));
   const glowStyle = {
      background: `radial-gradient(circle, ${glowColor} 5%, transparent 90%)`,
   };

   return (
      <div className={styles.grid}>
         <div className={styles.infoContainer}>
            <Badge>
               <span>RELEASE OF THE WEEK</span>
            </Badge>
            <h1 className={styles.title}>{`${title.toUpperCase()}`}</h1>
            <h3 className={styles.artist}>{artists?.map((name) => name).join(', ')}</h3>
            <div className={styles.genres}>
               {release_genres?.map(({ genres }) => (
                  <Badge key={genres.id}>
                     <span>{genres.title}</span>
                  </Badge>
               ))}
            </div>
            <Link aria-label={'Listen now'} className={styles.listenNowBtn} href={`/release/${external_key}`}>
               <BlurImage width={24} height={24} alt={'Play'} src={'/assets/icons/play.svg'} />
               <span>Listen now</span>
            </Link>
         </div>
         <div className={styles.coverScene}>
            <div className={styles.coverContainer}>
               <div style={glowStyle} className={styles.glow} />
               <BlurImage
                  width={500}
                  height={500}
                  src={cover_url}
                  loading={'eager'}
                  draggable={false}
                  alt={'Release cover'}
                  sizes={'500px, 300px'}
                  className={styles.coverImage}
               />
            </div>
         </div>
      </div>
   );
};
