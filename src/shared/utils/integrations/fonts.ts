import localFont from 'next/font/local';

export const geistSans = localFont({
   display: 'swap',
   variable: '--font-geist-sans',
   fallback: ['system-ui', 'arial', 'sans-serif'],
   src: [
      {
         weight: '400',
         style: 'normal',
         path: '../../../fonts/Geist-Regular.woff2',
      },
      {
         weight: '500',
         style: 'normal',
         path: '../../../fonts/Geist-Medium.woff2',
      },
      {
         weight: '600',
         style: 'normal',
         path: '../../../fonts/Geist-SemiBold.woff2',
      },
      {
         weight: '700',
         style: 'normal',
         path: '../../../fonts/Geist-Bold.woff2',
      },
   ],
});
