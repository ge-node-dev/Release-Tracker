import { redirect } from 'next/navigation';

import Pagination from '@/shared/ui/Pagination';
import ReleaseCard from '@/shared/ui/ReleaseCard';

import { getReleasesList } from '../../services/releaseServices';

import styles from './ReleasesList.module.scss';

const ReleasesList = async ({ page }: { page: string }) => {
   const currentPage = Number(page);

   // if (currentPage === 1) {
   //    redirect('/');
   // }

   const { data, error, totalPages } = await getReleasesList({
      period: 'all_time',
      page: isNaN(currentPage) ? 1 : currentPage,
   });
   // eslint-disable-next-line no-console
   console.log('totalPages', totalPages);
   // eslint-disable-next-line no-console
   console.log('currentPage', currentPage);
   // eslint-disable-next-line no-console
   console.log('data', data);
   // eslint-disable-next-line no-console
   console.log('error', error);
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
            <div className={styles.paginationWrapper}>
               <Pagination totalPages={totalPages} currentPage={currentPage || 1} />
            </div>
         </section>
      </>
   );
};

export default ReleasesList;
