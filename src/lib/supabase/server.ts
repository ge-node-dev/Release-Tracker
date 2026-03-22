import type { Database } from '@db/types/database.ts';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import 'server-only';

export const createSupabaseServerClient = async () => {
   const cookieStore = await cookies();

   return createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
      cookies: {
         getAll() {
            return cookieStore.getAll();
         },
         setAll(cookiesToSet) {
            try {
               cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
            } catch {
               // Cookies can only be modified in Server Actions or Route Handlers.
               // Ignore when called from Server Components or Proxy — session refresh
               // will be handled by Proxy via updateSession.
            }
         },
      },
   });
};
