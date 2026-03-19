import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import Pagination from '@/shared/ui/Pagination';
import ReleaseCard from '@/shared/ui/ReleaseCard';

import { getReleasesList, getReleasesListFirstPage } from '../../services/releaseServices';

import styles from './ReleasesList.module.scss';

interface Props {
   page: number;
   period: ReleasePeriod;
}

const ReleasesList = async ({ page, period }: Props) => {
   const { data } = page === 1 ? await getReleasesListFirstPage(period) : await getReleasesList({ page, period });

   return (
      <section className={styles.wrapper}>
         <div className={styles.releasesGrid}>
            {data.map((release) => (
               <ReleaseCard key={release.id} release={release} />
            ))}
         </div>
         <Pagination currentPage={page} currentPeriod={period} />
      </section>
   );
};

export default ReleasesList;
