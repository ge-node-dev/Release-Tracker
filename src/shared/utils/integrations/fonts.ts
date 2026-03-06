import { Inter, JetBrains_Mono, Oswald } from 'next/font/google';

export const OswaldFont = Oswald({
   display: 'swap',
   weight: ['400', '600'],
   variable: '--font-oswald',
   subsets: ['latin', 'cyrillic'],
   fallback: ['system-ui', 'arial', 'sans-serif'],
});

export const InterFont = Inter({
   display: 'swap',
   variable: '--font-inter',
   weight: ['400', '500', '900'],
   subsets: ['latin', 'cyrillic'],
   fallback: ['system-ui', 'arial', 'sans-serif'],
});

export const JetBrainsMonoFont = JetBrains_Mono({
   display: 'swap',
   subsets: ['latin'],
   weight: ['500', '600'],
   variable: '--font-mono',
   fallback: ['Courier New', 'monospace'],
});
