export const CACHE_10MIN = { stale: 600, expire: 3600, revalidate: 600 };
export const CACHE_12H = { stale: 43200, expire: 86400, revalidate: 43200 };
export const CACHE_1W = { stale: 604800, expire: 2592000, revalidate: 604800 };

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RELEASES_CACHE_TAG = 'RELEASES';

export const ROUTES = {
   AUTH: '/auth',
   PROFILE: '/profile',
   RESET_PASSWORD: '/reset-password',
};
