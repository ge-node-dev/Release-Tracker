import { ReleasePeriod } from '@/modules/release/types/releaseTypes';

const BASE_PATHS: Record<ReleasePeriod, string> = {
   this_week: '/',
   all_time: '/all-time',
   this_month: '/this-month',
};

export const getVisiblePages = (currentPage: number, totalPages: number, maxVisiblePages: number) => {
   if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
   }

   let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
   let end = start + maxVisiblePages - 1;

   if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisiblePages + 1);
   }

   const pages: (number | string)[] = Array.from({ length: end - start + 1 }, (_, i) => start + i);

   if (start > 1) {
      if (start > 2) pages.unshift('...');
      pages.unshift(1);
   }

   if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
   }

   return pages;
};

export const buildPageHref = (period: ReleasePeriod, page: number): string => {
   const basePath = BASE_PATHS[period];

   if (page <= 1) return basePath;
   return basePath === '/' ? `/${page}` : `${basePath}/${page}`;
};
