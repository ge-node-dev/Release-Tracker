import { getReleaseByExternalKey } from '../services/releaseServices';

export type ReleaseByExternalKeyType = Awaited<ReturnType<typeof getReleaseByExternalKey>>;
