import { type NextRequest, NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { validateUrlSearchParams } from '@/shared/utils/browser/validateUrlSearchParams';

const AUTH_ROUTE = '/auth';
const PROFILE_ROUTE = '/profile';

export const proxy = async (request: NextRequest) => {
   const { pathname, searchParams } = request.nextUrl;

   if (searchParams.size > 0) {
      const validatedSearchParams = validateUrlSearchParams(searchParams);

      if (validatedSearchParams.toString() !== searchParams.toString()) {
         const url = request.nextUrl.clone();
         url.search = validatedSearchParams.toString();
         return NextResponse.redirect(url);
      }
   }

   const isAuthRoute = pathname.startsWith(AUTH_ROUTE);
   const isProfileRoute = pathname.startsWith(PROFILE_ROUTE);

   if (isAuthRoute || isProfileRoute) {
      const supabase = await createSupabaseServerClient();
      const {
         data: { user },
      } = await supabase.auth.getUser();
      const isAuthenticated = Boolean(user);

      if (isProfileRoute && !isAuthenticated) {
         const redirectUrl = new URL(AUTH_ROUTE, request.url);
         return NextResponse.redirect(redirectUrl);
      }

      if (isAuthRoute && isAuthenticated) {
         return NextResponse.redirect(new URL(PROFILE_ROUTE, request.url));
      }
   }

   return NextResponse.next({
      request: { headers: request.headers },
   });
};

export const config = {
   matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
