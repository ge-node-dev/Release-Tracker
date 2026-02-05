import { createSupabaseServerClient } from '@/lib/supabase/server';
import { ReleaseQueryParams, RELEASES_PERIODS_LIMITS } from '@/modules/release/types/releaseTypes';
import { getDateRange } from '@/shared/utils/getDateRange';

import { RELEASE_BY_EXTERNAL_KEY_QUERY, RELEASES_OF_THE_WEEK_QUERY, RELEASES_QUERY } from './query';

export const getReleasesList = async ({ period, page = 1, sortOrder = 'desc' }: ReleaseQueryParams) => {
   const supabase = await createSupabaseServerClient();

   const limit = RELEASES_PERIODS_LIMITS[period];

   const fromIndex = (page - 1) * limit;
   const toIndex = fromIndex + limit - 1;

   let releasesQuery = supabase.from('releases').select(RELEASES_QUERY);

   let totalCountQuery = supabase.from('releases').select('id', { head: true, count: 'exact' });

   if (period !== 'all_time') {
      const { to, from } = getDateRange(period);

      releasesQuery = releasesQuery.gte('release_date', from).lte('release_date', to);
      totalCountQuery = totalCountQuery.gte('release_date', from).lte('release_date', to);
   }

   const { count: totalCount, error: totalCountError } = await totalCountQuery;

   if (totalCountError) {
      return {
         error: { totalCountError: true },
      };
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
      totalCount: totalCount ?? 0,
      hasMore: totalCount !== null && toIndex < totalCount - 1,
      totalPages: totalCount === null ? 0 : Math.ceil(totalCount / limit),
   };
};

export const getReleaseByExternalKey = async (externalKey: string) => {
   const supabase = await createSupabaseServerClient();

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
   const supabase = await createSupabaseServerClient();

   const { data, error } = await supabase
      .from('releases')
      .select(RELEASES_OF_THE_WEEK_QUERY)
      .order('fans_number', { ascending: false })
      .limit(1)
      .maybeSingle();

   if (error) {
      throw new Error('Failed to fetch release of the week', { cause: error });
   }

   return data;
};
