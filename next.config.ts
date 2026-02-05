import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   reactCompiler: true,
   sassOptions: {
      prependData: `@use "@/shared/styles/_mixins.scss" as *; @use "@/shared/styles/_variables.scss" as *;`,
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn-images.dzcdn.net',
         },
      ],
   },
};

export default nextConfig;
