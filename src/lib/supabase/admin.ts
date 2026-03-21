import type { Database } from '@db/types/database.ts';

import { createClient } from '@supabase/supabase-js';
import 'server-only';

export const createSupabaseAdminClient = () =>
   createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
