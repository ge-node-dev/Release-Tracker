import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types/Database';

export const createSupabaseBrowserClient = createClient<Database>(
   process.env.SUPABASE_URL!,
   process.env.SUPABASE_PUBLISHABLE_KEY!,
);
