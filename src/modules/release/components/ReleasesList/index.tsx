import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import { buildPageHref } from '@/modules/release/utils/buildPageHref';
import Pagination from '@/shared/ui/Pagination';
import ReleaseCard from '@/shared/ui/ReleaseCard';

import { getPaginationCount, getReleasesList } from '../../services/releaseServices';

import styles from './ReleasesList.module.scss';

interface Props {
   page: number;
   period: ReleasePeriod;
}

const ReleasesList = async ({ page, period }: Props) => {
   const [{ data }, { totalPages }] = await Promise.all([
      getReleasesList({ page, period }),
      getPaginationCount(period),
   ]);

   return (
      <section className={styles.wrapper}>
         <div className={styles.releasesGrid}>
            {data.map((release) => (
               <ReleaseCard key={release.id} release={release} />
            ))}
         </div>
         <Pagination
            currentPage={page}
            totalPages={totalPages}
            buildHref={(targetPage) => buildPageHref(period, targetPage)}
         />
      </section>
   );
};

export default ReleasesList;
