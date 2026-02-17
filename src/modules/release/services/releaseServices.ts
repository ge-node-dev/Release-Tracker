import { cacheLife, cacheTag } from 'next/cache';

import { createSupabaseStaticClient } from '@/lib/supabase/client';
import { ReleasePeriod, ReleaseQueryParams, RELEASES_PERIODS_LIMITS } from '@/modules/release/types/releaseTypes';
import { CACHE_12H } from '@/shared/utils/constants';
import { getReleaseDateRange } from '@/shared/utils/date/getReleaseDateRange';

import { RELEASE_BY_EXTERNAL_KEY_QUERY, RELEASES_OF_THE_WEEK_QUERY, RELEASES_QUERY } from './query';

export const getReleasesList = async ({ period, page = 1, sortOrder = 'desc' }: ReleaseQueryParams) => {
   'use cache';
   cacheLife(CACHE_12H);
   cacheTag(`releases-page-${page}`);

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

export const getReleaseByExternalKey = async (externalKey: string) => {
   const supabase = createSupabaseStaticClient();

   const { data, error } = await supabase
      .from('releases')
      .select(RELEASE_BY_EXTERNAL_KEY_QUERY)
      .eq('external_key', externalKey)
      .maybeSingle();

   if (error) {
      throw new Error(`Failed to fetch release with external key: ${externalKey}`, { cause: error });
   }

   if (!data) {
      throw new Error(`Release with external key ${externalKey} not found`);
   }

   return data;
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
