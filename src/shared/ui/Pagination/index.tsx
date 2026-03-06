import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';

import { getPaginationCount } from '@/modules/release/services/releaseServices';
import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import { SearchParams } from '@/shared/types';
import { CACHE_1W, RELEASES_CACHE_TAG } from '@/shared/utils/constants';
import { buildHrefWithParam, getVisiblePages } from '@/shared/utils/data/pagination';

import styles from './Pagination.module.scss';

const ARROW_ICON_SIZE = 18;
const ARROW_ICON_SRC = '/assets/icons/arrow.svg';

interface PaginationProps {
   currentPage: number;
   maxVisiblePages?: number;
   currentPeriod: ReleasePeriod;
   searchParams: Awaited<SearchParams>;
}

const ArrowIcon = ({ rotate }: { rotate?: string }) => (
   <img
      alt="arrow icon"
      src={ARROW_ICON_SRC}
      width={ARROW_ICON_SIZE}
      height={ARROW_ICON_SIZE}
      style={{
         minWidth: ARROW_ICON_SIZE,
         minHeight: ARROW_ICON_SIZE,
         ...(rotate && { transform: `rotate(${rotate})` }),
      }}
   />
);

const Pagination = async ({ currentPage, searchParams, currentPeriod, maxVisiblePages = 3 }: PaginationProps) => {
   'use cache';
   cacheLife(CACHE_1W);
   cacheTag(`releases-count-${currentPeriod}-${currentPage}`);
   cacheTag(RELEASES_CACHE_TAG);

   const { totalPages } = await getPaginationCount(currentPeriod);
   if (!totalPages || totalPages < 2) return null;

   const isFirstPage = currentPage === 1;
   const isLastPage = currentPage === totalPages;
   const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

   const navigateTo = (page: number) => buildHrefWithParam(searchParams, 'page', page, 1);

   return (
      <div className={styles.pagination}>
         <Link
            prefetch={false}
            href={navigateTo(currentPage - 1)}
            className={`${styles.arrowLink} ${isFirstPage ? styles.disabled : ''}`}
         >
            <ArrowIcon />
         </Link>

         {visiblePages.map((page, index) =>
            page === '...' ? (
               <p aria-hidden="true" className={styles.ellipsis} key={`ellipsis-${visiblePages[index - 1]}`}>
                  {page}
               </p>
            ) : (
               <Link
                  key={page}
                  prefetch={false}
                  href={navigateTo(+page)}
                  className={`${styles.paginationLink} ${page === currentPage ? styles.active : ''}`}
               >
                  {page}
               </Link>
            ),
         )}

         <Link
            prefetch={false}
            href={navigateTo(currentPage + 1)}
            className={`${styles.arrowLink} ${isLastPage ? styles.disabled : ''}`}
         >
            <ArrowIcon rotate="180deg" />
         </Link>
      </div>
   );
};

export default Pagination;
