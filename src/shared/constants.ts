export const CACHE_10MIN = { stale: 300, expire: 3600, revalidate: 600 };
export const CACHE_12H = { stale: 300, expire: 86400, revalidate: 43200 };
export const CACHE_1W = { stale: 300, expire: 2592000, revalidate: 604800 };

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RELEASES_CACHE_TAG = 'RELEASES';

export const ROUTES = {
   AUTH: '/auth',
   PROFILE: '/profile',
   RESET_PASSWORD: '/reset-password',
};

export const AVATAR_WIDTHS_BY_SIZE = {
   small: 46,
   large: 278,
   medium: 75,
   extraSmall: 22,
} as const;
