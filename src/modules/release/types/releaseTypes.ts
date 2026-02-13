import { getReleasesList } from '../services/releaseServices';

export enum RELEASES_PERIODS_LIMITS {
   this_week = 10,
   this_month = 20,
   all_time = 30,
}

export type ReleasePeriod = keyof typeof RELEASES_PERIODS_LIMITS;

export type ReleaseWithArtists = NonNullable<Awaited<ReturnType<typeof getReleasesList>>['data']>[number];

export interface ReleaseQueryParams {
   page: number;
   period: ReleasePeriod;
   sortOrder?: 'asc' | 'desc';
}
