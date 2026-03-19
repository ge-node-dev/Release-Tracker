import type { Metadata } from 'next';

import CommentsSection from '@/modules/releaseByExternalKey/components/CommentsSection';
import ReleaseInfo from '@/modules/releaseByExternalKey/components/ReleaseInfo';
import { getReleaseByExternalKey } from '@/modules/releaseByExternalKey/services/releaseByExternalKeyServices';

import styles from './ReleasePage.module.scss';

export const generateMetadata = async ({ params }: { params: Promise<Record<string, string>> }): Promise<Metadata> => {
   const { url } = await params;
   const release = await getReleaseByExternalKey(url);

   const artistNames = release.release_artists
      .map((item) => item.artists?.name)
      .filter(Boolean)
      .join(', ');
   const title = `${release.title} — ${artistNames}`;

   return {
      title,
      description: `${title} — listen and explore on Release Tracker.`,
      openGraph: {
         title,
         images: release.cover_url ? [{ url: release.cover_url }] : [],
      },
   };
};

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
