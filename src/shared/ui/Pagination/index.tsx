'use client';
import Image from 'next/image';

import LinkButton from '@/shared/ui/LinkButton';
import { getPageHref, getVisiblePages } from '@/shared/utils/pagination';

import styles from './Pagination.module.scss';

interface PaginationProps {
   totalPages: number;
   currentPage: number;
   maxVisiblePages?: number;
}

const Pagination = ({ totalPages, currentPage, maxVisiblePages = 5 }: PaginationProps) => {
   if (!totalPages || totalPages < 2) return null;

   const isFirstPage = currentPage === 1;
   const isLastPage = currentPage === totalPages;
   const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

   return (
      <div className={styles.pagination}>
         <LinkButton ariaLabel="Previous page" ariaDisabled={isFirstPage} href={getPageHref(currentPage - 1)}>
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
               <LinkButton
                  key={page}
                  href={getPageHref(+page)}
                  ariaLabel={`Page ${page}`}
                  className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
               >
                  {page}
               </LinkButton>
            );
         })}

         <LinkButton
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
