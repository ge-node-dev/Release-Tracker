import CommentsSection from '@/modules/releaseByExternalKey/components/CommentsSection';
import ReleaseInfo from '@/modules/releaseByExternalKey/components/ReleaseInfo';
import { getReleaseByExternalKey } from '@/modules/releaseByExternalKey/services/releaseByExternalKeyServices';

import styles from './ReleasePage.module.scss';

const ReleasePage = async ({ params }: { params: Promise<Record<string, string>> }) => {
   const { url } = await params;
   const release = await getReleaseByExternalKey(url);

   return (
      <div className={styles.pageWrapper}>
         <div className={styles.content}>
            <ReleaseInfo release={release} />
            <CommentsSection releaseId={release.id} comments={release.comments} externalKey={release.external_key} />
         </div>
      </div>
   );
};

export default ReleasePage;
