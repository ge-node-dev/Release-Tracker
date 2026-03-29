import { Database } from '@db/types/database';

export type Profile = null | Database['public']['Tables']['profiles']['Row'];
