import { getReleasesList } from '../services/releaseServices';

export enum RELEASES_PERIODS_LIMITS {
   this_week = 15,
   this_month = 25,
   all_time = 45,
}

export type ReleasePeriods = keyof typeof RELEASES_PERIODS_LIMITS;

export type ReleaseWithArtists = Awaited<ReturnType<typeof getReleasesList>>['data'][number];

export interface ReleaseQueryParams {
   page: number;
   period: ReleasePeriods;
   sortOrder?: 'asc' | 'desc';
}
