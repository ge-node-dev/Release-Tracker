import { type NextRequest, NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { validateUrlSearchParams } from '@/shared/utils/browser/validateUrlSearchParams';

export const proxy = async (request: NextRequest) => {
   const searchParams = await request.nextUrl.searchParams;

   if (searchParams.size > 0) {
      const url = request.nextUrl.clone();
      const validatedSearchParams = validateUrlSearchParams(searchParams);

      if (validatedSearchParams.toString() !== searchParams.toString()) {
         url.search = validatedSearchParams.toString();
         return NextResponse.redirect(url);
      }
   }

   const isAuthRoute = request.nextUrl.pathname.includes('/auth');
   const isProfileRoute = request.nextUrl.pathname.includes('/profile');

   if (isAuthRoute || isProfileRoute) {
      const supabase = await createSupabaseServerClient();
      const { data } = await supabase.auth.getUser();

      if (isProfileRoute && !data.user) {
         return NextResponse.redirect(new URL('/auth', request.url));
      }

      if (isAuthRoute && data.user) {
         return NextResponse.redirect(new URL('/profile', request.url));
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
