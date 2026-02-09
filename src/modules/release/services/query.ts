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

const COMMENT_FRAGMENT = `
  comments (
    id,
    user_id,
    content,
    created_at,
    updated_at,
    likes,
    parent_id (
      id, user_id, parent_id, content, created_at, updated_at, likes
    )
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

export const RELEASE_BY_EXTERNAL_KEY_QUERY = `
${BASE_RELEASE_FIELDS},
release_tracks (
  position,
  tracks (id, title, deezer_track_id)
),
${COMMENT_FRAGMENT},
${GENRE_FRAGMENT}
` as const;
