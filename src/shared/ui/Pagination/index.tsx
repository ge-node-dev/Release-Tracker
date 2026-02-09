import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';

import { getPaginationCount } from '@/modules/release/services/releaseServices';
import { ReleasePeriods } from '@/modules/release/types/releaseTypes';
import LinkButton from '@/shared/ui/LinkButton';
import { getPageHref, getVisiblePages } from '@/shared/utils/pagination';

import styles from './Pagination.module.scss';

interface PaginationProps {
   currentPage: number;
   period: ReleasePeriods;
   maxVisiblePages?: number;
}

const Pagination = async ({ period, currentPage, maxVisiblePages = 5 }: PaginationProps) => {
   'use cache';
   cacheLife({ stale: 3600 * 12, revalidate: 4000 * 12 });
   cacheTag(`releases-count-${period}`);

   const { totalPages } = await getPaginationCount(period);
   if (!totalPages || totalPages < 2) return null;

   const isFirstPage = currentPage === 1;
   const isLastPage = currentPage === totalPages;
   const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

   return (
      <div className={styles.pagination}>
         <LinkButton
            prefetch={false}
            ariaLabel="Previous page"
            ariaDisabled={isFirstPage}
            href={getPageHref(currentPage - 1)}
         >
            <Image width={15} height={15} alt="arrow icon" src="/assets/icons/arrow.svg" />
         </LinkButton>

         {visiblePages.map((page, index) => {
            if (page === '...') {
               return (
                  <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                     {page}
                  </span>
               );
            }

            return (
               <Link
                  key={page}
                  prefetch={false}
                  href={getPageHref(+page)}
                  className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
               >
                  {page}
               </Link>
            );
         })}

         <LinkButton
            prefetch={false}
            rotate={'180deg'}
            ariaLabel="Next page"
            ariaDisabled={isLastPage}
            href={getPageHref(currentPage + 1)}
         >
            <Image width={15} height={15} alt="arrow icon" src="/assets/icons/arrow.svg" />
         </LinkButton>
      </div>
   );
};

export default Pagination;
