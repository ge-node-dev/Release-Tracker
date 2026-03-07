import ReleaseBanner from '@/modules/release/components/ReleaseBanner';
import TrackList from '@/modules/release/components/TrackList';
import { getReleaseByExternalKey } from '@/modules/release/services/releaseServices';

import styles from './ReleasePage.module.scss';

const ReleasePage = async ({ params }: { params: Promise<Record<string, string>> }) => {
   const { url } = await params;
   const release = await getReleaseByExternalKey(url);

   return (
      <div className={styles.pageWrapper}>
         <div className={styles.content}>
            <ReleaseBanner release={release} />
         </div>
         <TrackList tracks={release.release_tracks} />
      </div>
   );
};

export default ReleasePage;
