export const CACHE_12H = { stale: 3600 * 12, revalidate: 4000 * 12 };

const weekInSeconds = 3600 * 24 * 7;
export const CACHE_1W = { stale: weekInSeconds, revalidate: weekInSeconds };

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RELEASES_CACHE_TAG = 'RELEASES';
