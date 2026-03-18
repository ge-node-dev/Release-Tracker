import Link from 'next/link';

import { getPaginationCount } from '@/modules/release/services/releaseServices';
import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import { ArrowIcon as UiArrowIcon } from '@/shared/ui/Icons';
import { buildPageHref, getVisiblePages } from '@/shared/utils/data/pagination';

import styles from './Pagination.module.scss';

const ARROW_ICON_SIZE = 18;

interface PaginationProps {
   currentPage: number;
   maxVisiblePages?: number;
   currentPeriod: ReleasePeriod;
}

const ArrowIcon = ({ rotate }: { rotate?: string }) => (
   <UiArrowIcon
      width={ARROW_ICON_SIZE}
      height={ARROW_ICON_SIZE}
      style={{
         minWidth: ARROW_ICON_SIZE,
         minHeight: ARROW_ICON_SIZE,
         ...(rotate && { transform: `rotate(${rotate})` }),
      }}
   />
);

const Pagination = async ({ currentPage, currentPeriod, maxVisiblePages = 3 }: PaginationProps) => {
   const { totalPages } = await getPaginationCount(currentPeriod);
   if (!totalPages || totalPages < 2) return null;

   const isFirstPage = currentPage === 1;
   const isLastPage = currentPage === totalPages;
   const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

   const navigateTo = (page: number) => buildPageHref(currentPeriod, page);

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
