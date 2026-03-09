import Image from 'next/image';

import { ReleaseByExternalKeyType } from '@/modules/releaseByExternalKey/types/releaseTypes';

import styles from './ReleaseBanner.module.scss';

const ReleaseBanner = ({ release }: { release: ReleaseByExternalKeyType }) => {
   return (
      <>
         <div className={styles.bannerWrapper}>
            <span className={styles.absoluteTitle}>{release.title}</span>
            {release.cover_url && (
               <Image
                  width={500}
                  height={500}
                  sizes="500px"
                  quality={100}
                  priority={true}
                  alt={release.title}
                  src={release.cover_url}
                  className={styles.bannerImage}
               />
            )}
            <div className={styles.textWrapper}>
               <h1 className={styles.title}>{release.title}</h1>
               <h3 className={styles.artists}>
                  {release.release_artists.map((artist) => artist.artists.name).join(', ')}
               </h3>
            </div>
         </div>
      </>
   );
};

export default ReleaseBanner;
