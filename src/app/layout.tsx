import type { Metadata } from 'next';

import '@/shared/styles/globals.scss';

import { ViewTransition } from 'react';

import AuthModal from '@/modules/auth/components/AuthModal';
import { AuthModalProvider } from '@/shared/providers/AuthModalProvider';
import { AuthProvider } from '@/shared/providers/AuthProvider';
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
            <ViewTransition>
               <AuthProvider>
                  <AuthModalProvider>
                     {children}
                     <AuthModal />
                  </AuthModalProvider>
               </AuthProvider>
            </ViewTransition>
         </body>
      </html>
   );
}
