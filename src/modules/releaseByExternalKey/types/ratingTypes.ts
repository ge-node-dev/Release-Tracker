import { Database } from '@db/types/database';

export type ReleaseRating = Database['public']['Tables']['release_ratings']['Row'];
export type ReleaseRatingInsert = Database['public']['Tables']['release_ratings']['Insert'];
export type ReleaseRatingUpdate = Database['public']['Tables']['release_ratings']['Update'];

export type RatingStats = {
   count: number;
   average: number;
   distribution: Record<number, number>;
};

export type RatingCooldown = {
   can_rate: boolean;
   last_rated_at: null | string;
   cooldown_until: null | string;
};
