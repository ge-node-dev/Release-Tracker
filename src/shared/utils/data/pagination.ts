import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives';

import { SearchParams } from '@/shared/types';

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

export const buildHrefWithParam = (
   searchParams: Awaited<SearchParams>,
   key: string,
   value: string | number,
   defaultValue?: string | number,
) => {
   const params = new URLSearchParams(searchParams);

   const shouldDelete = value === defaultValue;

   if (shouldDelete) {
      params.delete(key);
   } else {
      if (key !== 'page' && params.has('page')) {
         params.set('page', '1');
      }

      params.set(key, String(value));
   }

   const query = params.toString();

   return query ? `?${query}` : '/';
};
