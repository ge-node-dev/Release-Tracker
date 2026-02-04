export const RELEASES_QUERY = `
  id,
  title,
  cover_url,
  fans_number,
  rating_avg,
  release_date,
  release_artists (
    artists (
      id,
      name
    )
  ),
  comments(count)
` as const;

export const RELEASE_BY_ID_QUERY = `
  id,
  title,
  cover_url,
  rating_avg,
  release_date,
  release_artists (
    artists (
      id,
      name
    )
  ),
  release_tracks (
    position,
    tracks (
      id,
      title,
      deezer_track_id
    )
  ),
  comments(
    id,
    user_id,
    content,
    created_at,
    updated_at,
    likes,
    parent_id(
      id,
      user_id,
      parent_id,
      content,
      created_at,
      updated_at,
      likes
    )
    )
` as const;
