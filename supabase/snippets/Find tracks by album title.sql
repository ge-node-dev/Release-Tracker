SELECT 
    r.title AS release_name,
    t.title AS track_name,
    t.external_key
FROM releases r
JOIN release_tracks rt ON r.id = rt.release_id
JOIN tracks t ON rt.track_id = t.id
WHERE r.title = 'OCTANE'