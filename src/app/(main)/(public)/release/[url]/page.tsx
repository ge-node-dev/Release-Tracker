import CommentsSection from '@/modules/releaseByExternalKey/components/CommentsSection';
import ReleaseBanner from '@/modules/releaseByExternalKey/components/ReleaseBanner';
import TrackList from '@/modules/releaseByExternalKey/components/TrackList';
import { getReleaseByExternalKey } from '@/modules/releaseByExternalKey/services/releaseByExternalKeyServices';

import styles from './ReleasePage.module.scss';

const ReleasePage = async ({ params }: { params: Promise<Record<string, string>> }) => {
   const { url } = await params;
   const release = await getReleaseByExternalKey(url);

   return (
      <div className={styles.pageWrapper}>
         <div className={styles.content}>
            <ReleaseBanner release={release} />
            <CommentsSection releaseId={release.id} comments={release.comments} externalKey={release.external_key} />
         </div>
         <TrackList
            coverUrl={release.cover_url}
            tracks={release.release_tracks}
            artistsName={release.release_artists.map((artist) => artist.artists.name).join(', ')}
         />
      </div>
   );
};

export default ReleasePage;
