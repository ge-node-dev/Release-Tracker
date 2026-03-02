import type { Database } from '@db/types/database.ts';

import { createClient } from '@supabase/supabase-js';

export const createSupabaseAdminClient = () =>
   createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
