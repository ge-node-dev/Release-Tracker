import { SearchParams } from '@/shared/types';
import Pagination from '@/shared/ui/Pagination';
import ReleaseCard from '@/shared/ui/ReleaseCard';

import { getReleasesList } from '../../services/releaseServices';

import styles from './ReleasesList.module.scss';

const ReleasesList = async ({ searchParams }: { searchParams: Awaited<SearchParams> }) => {
   const { page, period } = searchParams;
   const currentPage = Number(page) || 1;
   const currentPeriod = period || 'this_week';

   const { data } = await getReleasesList({
      page: currentPage,
      period: currentPeriod,
   });

   return (
      <section className={styles.wrapper}>
         <div className={styles.releasesGrid}>
            {data.map((release) => (
               <ReleaseCard key={release.id} release={release} />
            ))}
         </div>
         <Pagination currentPage={currentPage} searchParams={searchParams} currentPeriod={currentPeriod} />
      </section>
   );
};

export default ReleasesList;
