import { ReleasePeriod } from '@/modules/release/types/releaseTypes';

export type SearchParams = Promise<SearchParamsTypesMap>;

type SearchParamsTypesMap = {
   page: string;
   period: ReleasePeriod;
};
