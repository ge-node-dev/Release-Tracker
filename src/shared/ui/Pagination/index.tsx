import Link from 'next/link';

import { ArrowIcon as UiArrowIcon } from '@/shared/ui/Icons';
import { getVisiblePages } from '@/shared/utils/data/pagination';

import styles from './Pagination.module.scss';

const ARROW_ICON_SIZE = 18;

interface PaginationProps {
   totalPages: number;
   currentPage: number;
   maxVisiblePages?: number;
   buildHref: (page: number) => string;
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

const Pagination = ({ buildHref, totalPages, currentPage, maxVisiblePages = 3 }: PaginationProps) => {
   if (!totalPages || totalPages < 2) return null;

   const isFirstPage = currentPage === 1;
   const isLastPage = currentPage === totalPages;
   const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

   return (
      <div className={styles.pagination}>
         <Link
            prefetch={false}
            href={buildHref(currentPage - 1)}
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
                  href={buildHref(+page)}
                  className={`${styles.paginationLink} ${page === currentPage ? styles.active : ''}`}
               >
                  {page}
               </Link>
            ),
         )}

         <Link
            prefetch={false}
            href={buildHref(currentPage + 1)}
            className={`${styles.arrowLink} ${isLastPage ? styles.disabled : ''}`}
         >
            <ArrowIcon rotate="180deg" />
         </Link>
      </div>
   );
};

export default Pagination;
