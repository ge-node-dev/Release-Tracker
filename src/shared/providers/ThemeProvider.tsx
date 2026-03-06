'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
   return (
      <NextThemesProvider enableSystem={true} defaultTheme="system" attribute="data-theme">
         {children}
      </NextThemesProvider>
   );
};

export default ThemeProvider;
