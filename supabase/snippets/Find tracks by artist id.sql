SELECT t.title, t.audio_preview
FROM public.tracks t
JOIN public.track_artists ta ON t.id = ta.track_id
WHERE ta.artist_id = 'f2515bde-41db-4649-8536-d439592affcc';