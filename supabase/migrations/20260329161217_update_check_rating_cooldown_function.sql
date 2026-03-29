set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_rating_cooldown(p_user_id uuid, p_release_id uuid)
 RETURNS TABLE(can_rate boolean, last_rated_at timestamp with time zone, cooldown_until timestamp with time zone)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
    v_last_rated_at timestamptz;
BEGIN
    SELECT GREATEST(created_at, updated_at) INTO v_last_rated_at
    FROM public.release_ratings
    WHERE user_id = p_user_id AND release_id = p_release_id;
    
    RETURN QUERY
    SELECT
        (v_last_rated_at IS NULL OR v_last_rated_at < (now() - INTERVAL '24 hours')) AS can_rate,
        v_last_rated_at,
        (v_last_rated_at + INTERVAL '24 hours') AS cooldown_until;
END;
$function$
;


