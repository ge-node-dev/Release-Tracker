import { cacheLife, cacheTag } from 'next/cache';

import { createSupabaseStaticClient } from '@/lib/supabase/client';
import { ReleasePeriod, ReleaseQueryParams, RELEASES_PERIODS_LIMITS } from '@/modules/release/types/releaseTypes';
import { CACHE_12H, CACHE_1W, RELEASES_CACHE_TAG } from '@/shared/utils/constants';
import { getReleaseDateRange } from '@/shared/utils/date/getReleaseDateRange';

import { RELEASES_OF_THE_WEEK_QUERY, RELEASES_QUERY } from './query';

export const getReleasesListFirstPage = async (period: ReleasePeriod) => {
   'use cache';
   cacheLife(CACHE_1W);
   cacheTag(`releases-first-page-${period}`);
   cacheTag(RELEASES_CACHE_TAG);

   return await getReleasesList({ period, page: 1 });
};

export const getReleasesList = async ({ period, page = 1, sortOrder = 'desc' }: ReleaseQueryParams) => {
   const supabase = createSupabaseStaticClient();

   const limit = RELEASES_PERIODS_LIMITS[period];

   const fromIndex = (page - 1) * limit;
   const toIndex = fromIndex + limit - 1;

   let releasesQuery = supabase.from('releases').select(RELEASES_QUERY);

   if (period !== 'all_time') {
      const { to, from } = getReleaseDateRange(period);

      releasesQuery = releasesQuery.gte('release_date', from).lte('release_date', to);
   }

   const { data, error } = await releasesQuery
      .order('release_date', { ascending: sortOrder === 'asc' })
      .order('id', { ascending: sortOrder === 'asc' })
      .range(fromIndex, toIndex);

   if (error) {
      throw new Error('Failed to fetch releases list', { cause: error });
   }

   return {
      page,
      data: data ?? [],
   };
};

export const getReleaseOfTheWeek = async () => {
   'use cache';
   cacheLife(CACHE_12H);

   const supabase = createSupabaseStaticClient();
   const { to, from } = getReleaseDateRange('this_week');

   const { data, error } = await supabase
      .from('releases')
      .select(RELEASES_OF_THE_WEEK_QUERY)
      .gte('release_date', from)
      .lte('release_date', to)
      .order('fans_number', { ascending: false })
      .limit(1)
      .maybeSingle();

   if (error) {
      throw new Error('Failed to fetch release of the week', { cause: error });
   }

   return data;
};

export const getPaginationCount = async (period: ReleasePeriod) => {
   'use cache';
   cacheLife(CACHE_1W);
   cacheTag(`releases-count-${period}`);
   cacheTag(RELEASES_CACHE_TAG);

   const supabase = createSupabaseStaticClient();

   let totalCountQuery = supabase.from('releases').select('id', { head: true, count: 'exact' });

   if (period !== 'all_time') {
      const { to, from } = getReleaseDateRange(period);
      totalCountQuery = totalCountQuery.gte('release_date', from).lte('release_date', to);
   }

   const { count, error } = await totalCountQuery;

   if (error) {
      throw new Error('Failed to fetch releases count', { cause: error });
   }

   const limit = RELEASES_PERIODS_LIMITS[period];

   return {
      totalCount: count ?? 0,
      totalPages: count === null ? 0 : Math.ceil(count / limit),
   };
};
