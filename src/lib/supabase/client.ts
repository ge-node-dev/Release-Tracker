import type { Database } from '@db/types/database.ts';

import { createClient } from '@supabase/supabase-js';

export const createSupabaseBrowserClient = createClient<Database>(
   process.env.SUPABASE_URL!,
   process.env.SUPABASE_PUBLISHABLE_KEY!,
);
