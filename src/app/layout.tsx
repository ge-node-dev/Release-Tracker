import type { Metadata } from 'next';

import localFont from 'next/font/local';

import '@/shared/styles/globals.scss';

const geistSans = localFont({
   variable: '--font-geist-sans',
   src: [
      {
         weight: '400',
         style: 'normal',
         path: '../fonts/Geist-Regular.woff2',
      },
      {
         weight: '500',
         style: 'normal',
         path: '../fonts/Geist-Medium.woff2',
      },
      {
         weight: '600',
         style: 'normal',
         path: '../fonts/Geist-SemiBold.woff2',
      },
      {
         weight: '700',
         style: 'normal',
         path: '../fonts/Geist-Bold.woff2',
      },
   ],
});

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
         <body className={`${geistSans.variable} antialiased`}>{children}</body>
      </html>
   );
}
