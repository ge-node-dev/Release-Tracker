import { type NextRequest, NextResponse } from 'next/server';

import { validateUrlSearchParams } from '@/shared/utils/browser/validateUrlSearchParams';

import { ROUTES } from './shared/constants';

const hasSupabaseAuthCookie = (request: NextRequest): boolean => {
   return request.cookies
      .getAll()
      .some((cookie) => cookie.name.startsWith('sb-') && cookie.name.includes('auth-token'));
};

export const proxy = async (request: NextRequest) => {
   const { pathname, searchParams } = await request.nextUrl;

   if (searchParams.size > 0) {
      const validatedSearchParams = validateUrlSearchParams(searchParams);

      if (validatedSearchParams.toString() !== searchParams.toString()) {
         const url = request.nextUrl.clone();
         url.search = validatedSearchParams.toString();
         return NextResponse.redirect(url);
      }
   }

   const isAuthRoute = pathname.startsWith(ROUTES.AUTH);
   const isProfileRoute = pathname.startsWith(ROUTES.PROFILE);

   if (isAuthRoute || isProfileRoute) {
      const isAuthenticated = hasSupabaseAuthCookie(request);

      if (isProfileRoute && !isAuthenticated) {
         const redirectUrl = new URL(ROUTES.AUTH, request.url);
         return NextResponse.redirect(redirectUrl);
      }

      if (isAuthRoute && isAuthenticated) {
         return NextResponse.redirect(new URL(ROUTES.PROFILE, request.url));
      }
   }

   return NextResponse.next({
      request: { headers: request.headers },
   });
};

export const config = {
   matcher: [
      {
         source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
         missing: [
            { type: 'header', key: 'next-router-prefetch' },
            { key: 'purpose', type: 'header', value: 'prefetch' },
         ],
      },
   ],
};
