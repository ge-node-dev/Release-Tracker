import { ReleasePeriod } from '@/modules/release/types/releaseTypes';

const BASE_PATHS: Record<ReleasePeriod, string> = {
   this_week: '/',
   all_time: '/all-time',
   this_month: '/this-month',
};

export const buildPageHref = (period: ReleasePeriod, page: number): string => {
   const basePath = BASE_PATHS[period];

   if (page <= 1) return basePath;
   return basePath === '/' ? `/${page}` : `${basePath}/${page}`;
};
