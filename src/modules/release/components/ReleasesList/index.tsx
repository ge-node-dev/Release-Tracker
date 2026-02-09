import Pagination from '@/shared/ui/Pagination';
import ReleaseCard from '@/shared/ui/ReleaseCard';

import { getReleasesList } from '../../services/releaseServices';

import styles from './ReleasesList.module.scss';

const PERIOD = 'all_time';

const ReleasesList = async ({ page }: { page: string }) => {
   const currentPage = Number(page) || 1;

   const { data } = await getReleasesList({
      period: PERIOD,
      page: currentPage,
   });

   return (
      <>
         <section className={styles.wrapper}>
            <div className={styles.releasesGrid}>
               {data.map((release) => (
                  <ReleaseCard key={release.id} release={release} />
               ))}
            </div>
            <div className={styles.paginationWrapper}>
               <Pagination period={PERIOD} currentPage={currentPage} />
            </div>
         </section>
      </>
   );
};

export default ReleasesList;
