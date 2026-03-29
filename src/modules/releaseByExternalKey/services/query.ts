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
    parent_id (id),
    profiles (id, username, avatar_url)
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

export const RELEASE_BY_EXTERNAL_KEY_QUERY = `
${BASE_RELEASE_FIELDS},
release_tracks (
  position,
  tracks (
    id,
    title,
    deezer_track_id
  )
),
${COMMENT_FRAGMENT},
${GENRE_FRAGMENT},
release_ratings (
  id,
  rating
)
` as const;
