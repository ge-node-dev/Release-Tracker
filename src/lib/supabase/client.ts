import type { Database } from '@db/types/database.ts';

import { createBrowserClient } from '@supabase/ssr';

export const createSupabaseStaticClient = () => {
   return createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
   );
};
