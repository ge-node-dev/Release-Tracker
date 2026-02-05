import { redirect } from 'next/navigation';

import Pagination from '@/shared/ui/Pagination';
import ReleaseCard from '@/shared/ui/ReleaseCard';

import { getReleasesList } from '../../services/releaseServices';

import styles from './ReleasesList.module.scss';

const ReleasesList = async ({ page }: { page: string }) => {
   const currentPage = Number(page);

   if (currentPage === 1) {
      redirect('/');
   }

   const { data, error, totalPages } = await getReleasesList({
      period: 'all_time',
      page: currentPage || 1,
   });

   // FIXME: fix totalCountError - https://github.com/supabase/supabase-js/issues/1571
   const hasError = error?.totalCountError;
   const isOutOfBounds = !totalPages || currentPage > totalPages;

   if (hasError || isOutOfBounds) {
      redirect('/');
   }

   return (
      <>
         <section className={styles.wrapper}>
            <div className={styles.releasesGrid}>
               {data.map((release) => (
                  <ReleaseCard key={release.id} release={release} />
               ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage || 1} />
         </section>
      </>
   );
};

export default ReleasesList;
