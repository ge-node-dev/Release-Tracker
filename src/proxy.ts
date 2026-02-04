import { type NextRequest, NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

export const proxy = async (request: NextRequest) => {
   const response = NextResponse.next({
      request: {
         headers: request.headers,
      },
   });

   const supabase = await createSupabaseServerClient();
   const { data } = await supabase.auth.getUser();

   const isAuthRoute = request.nextUrl.pathname.includes('/auth');

   if (data.user && isAuthRoute) {
      return NextResponse.redirect(new URL('/', request.url));
   }

   return response;
};

export const config = {
   matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
