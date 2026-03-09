const ARTIST_FRAGMENT = `
  release_artists (
    artists (id, name)
  )
` as const;

const GENRE_FRAGMENT = `
  release_genres (
    genres (id, title)
  )
` as const;

const BASE_RELEASE_FIELDS = `
  id,
  title,
  cover_url,
  release_date,
  external_key,
  ${ARTIST_FRAGMENT}
` as const;

export const RELEASES_QUERY = `
  ${BASE_RELEASE_FIELDS},
  comments(count)
` as const;

export const RELEASES_OF_THE_WEEK_QUERY = `
  rating_avg,
  ${BASE_RELEASE_FIELDS},
  ${GENRE_FRAGMENT}
` as const;
