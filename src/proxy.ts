import { type NextRequest, NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { validateUrlSearchParams } from '@/shared/utils/validateUrlSearchParams';

export const proxy = async (request: NextRequest) => {
   const searchParams = await request.nextUrl.searchParams;

   if (searchParams.size > 0) {
      const url = request.nextUrl.clone();
      const validatedSearchParams = validateUrlSearchParams(url.searchParams);

      if (validatedSearchParams.toString() !== searchParams.toString()) {
         url.search = validatedSearchParams.toString();
         return NextResponse.redirect(url);
      }
   }

   const isAuthRoute = request.nextUrl.pathname.includes('/auth');

   if (isAuthRoute) {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.auth.getUser();

      if (data.user) {
         return NextResponse.redirect(new URL('/', request.url));
      }
   }

   return NextResponse.next({
      request: {
         headers: request.headers,
      },
   });
};

export const config = {
   matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
