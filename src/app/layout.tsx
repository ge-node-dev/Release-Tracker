import type { Metadata, Viewport } from 'next';

import '@/shared/styles/globals.scss';

import { Suspense, ViewTransition } from 'react';

import ThemeProvider from '@/shared/providers/ThemeProvider';
import { FlashToasterProvider } from '@/shared/ui/FlashToaster';
import { InterFont, JetBrainsMonoFont, OswaldFont } from '@/shared/utils/integrations/fonts';

export const metadata: Metadata = {
   title: 'Release Tracker',
   description: 'Release Tracker',
};

export const viewport: Viewport = {
   initialScale: 1,
   width: 'device-width',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" suppressHydrationWarning={true}>
         <body className={`${OswaldFont.variable} ${InterFont.variable} ${JetBrainsMonoFont.variable} antialiased`}>
            <ThemeProvider>
               <ViewTransition>{children}</ViewTransition>
               <Suspense fallback={null}>
                  <FlashToasterProvider />
               </Suspense>
            </ThemeProvider>
         </body>
      </html>
   );
}
