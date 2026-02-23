import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   reactCompiler: true,
   output: 'standalone',
   cacheComponents: true,
   experimental: {
      viewTransition: true,
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn-images.dzcdn.net',
         },
      ],
   },
   sassOptions: {
      prependData: `@use "@/shared/styles/_mixins.scss" as *; @use "@/shared/styles/_variables.scss" as *; @use "@/shared/styles/_breakpoints.scss" as *; @use "@/shared/styles/_typography.scss" as *;`,
   },
};

export default nextConfig;
