export type ReleasePeriod = 'all_time' | 'this_week' | 'this_month';

export const RELEASES_PERIODS_LIMITS: Record<ReleasePeriod, number> = {
   all_time: 45,
   this_week: 15,
   this_month: 25,
} as const;

export interface ReleaseQueryParams {
   page: number;
   period: ReleasePeriod;
   sortOrder?: 'asc' | 'desc';
}
