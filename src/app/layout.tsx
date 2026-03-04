import type { Metadata, Viewport } from 'next';

import '@/shared/styles/globals.scss';

import { ViewTransition } from 'react';

import { geistSans } from '@/shared/utils/integrations/fonts';

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
      <html lang="en">
         <body className={`${geistSans.variable} antialiased`}>
            <ViewTransition>{children}</ViewTransition>
         </body>
      </html>
   );
}
