import type { Metadata } from 'next';

import '@/shared/styles/globals.scss';
import { ViewTransition } from 'react';

import AuthForm from '@/modules/auth/components/AuthModal';
import Header from '@/modules/layout/components/Header';
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
      <ViewTransition>
         <AuthProvider>
            <AuthModalProvider>
               <html lang="en">
                  <body className={`${geistSans.variable} antialiased`}>
                     <Header />
                     <main className="mainContainer">{children}</main>
                  </body>
               </html>
               <AuthForm />
            </AuthModalProvider>
         </AuthProvider>
      </ViewTransition>
   );
}
