import type { Metadata } from 'next';

import '@/shared/styles/globals.scss';

import { ViewTransition } from 'react';

import { geistSans } from '@/shared/utils/integrations/fonts';

export const metadata: Metadata = {
   title: 'Release Tracker',
   description: 'Release Tracker',
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
