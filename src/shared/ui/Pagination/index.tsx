import { cacheLife, cacheTag } from 'next/cache';
import Image from 'next/image';

import { getPaginationCount } from '@/modules/release/services/releaseServices';
import { ReleasePeriod } from '@/modules/release/types/releaseTypes';
import { SearchParams } from '@/shared/types';
import LinkButton from '@/shared/ui/Buttons/LinkButton';
import { CACHE_12H } from '@/shared/utils/constants';
import { buildHrefWithParam, getVisiblePages } from '@/shared/utils/data/pagination';

import styles from './Pagination.module.scss';

interface PaginationProps {
   currentPage: number;
   maxVisiblePages?: number;
   currentPeriod: ReleasePeriod;
   searchParams: Awaited<SearchParams>;
}

const Pagination = async ({ currentPage, searchParams, currentPeriod, maxVisiblePages = 5 }: PaginationProps) => {
   'use cache';
   cacheLife(CACHE_12H);
   cacheTag(`releases-count-${currentPeriod}-${currentPage}`);
   cacheTag('RELEASES');

   const { totalPages } = await getPaginationCount(currentPeriod);
   if (!totalPages || totalPages < 2) return null;

   const isFirstPage = currentPage === 1;
   const isLastPage = currentPage === totalPages;
   const visiblePages = getVisiblePages(currentPage, totalPages, maxVisiblePages);

   const navigateTo = (newPage: number) => buildHrefWithParam(searchParams, 'page', newPage, 1);

   return (
      <div className={styles.pagination}>
         <LinkButton
            prefetch={false}
            ariaLabel="Previous page"
            ariaDisabled={isFirstPage}
            href={navigateTo(currentPage - 1)}
         >
            <Image width={15} height={15} alt="arrow icon" src="/assets/icons/arrow.svg" />
         </LinkButton>

         {visiblePages.map((page, index) => {
            if (page === '...') {
               return (
                  <span
                     aria-hidden="true"
                     className={styles.ellipsis}
                     key={`ellipsis-after-${visiblePages[index - 1]}`}
                  >
                     {page}
                  </span>
               );
            }

            return (
               <LinkButton
                  key={page}
                  prefetch={false}
                  href={navigateTo(+page)}
                  ariaLabel={`Page ${page}`}
                  active={currentPage === page}
                  ariaCurrent={currentPage === page}
               >
                  {page}
               </LinkButton>
            );
         })}

         <LinkButton
            prefetch={false}
            rotate={'180deg'}
            ariaLabel="Next page"
            ariaDisabled={isLastPage}
            href={buildHrefWithParam(searchParams, 'page', currentPage + 1, 1)}
         >
            <Image width={15} height={15} alt="arrow icon" src="/assets/icons/arrow.svg" />
         </LinkButton>
      </div>
   );
};

export default Pagination;
