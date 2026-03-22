import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   reactCompiler: true,
   cacheComponents: true,
   experimental: {
      instantNavigationDevToolsToggle: true,
   },
   sassOptions: {
      prependData: `@use "@/shared/styles/_mixins.scss" as *; @use "@/shared/styles/_variables.scss" as *; @use "@/shared/styles/_breakpoints.scss" as *; @use "@/shared/styles/_typography.scss" as *;`,
   },
   images: {
      qualities: [100, 75],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'cdn-images.dzcdn.net',
         },
         {
            protocol: 'https',
            hostname: 'cdnt-preview.dzcdn.net',
         },
         {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
         },
      ],
   },
   headers() {
      return [
         {
            source: '/:path*',
            headers: [
               {
                  value: 'on',
                  key: 'X-DNS-Prefetch-Control',
               },
               {
                  key: 'Strict-Transport-Security',
                  value: 'max-age=63072000; includeSubDomains; preload',
               },
               {
                  value: 'SAMEORIGIN',
                  key: 'X-Frame-Options',
               },
               {
                  value: 'nosniff',
                  key: 'X-Content-Type-Options',
               },
               {
                  key: 'Referrer-Policy',
                  value: 'strict-origin-when-cross-origin',
               },
               {
                  key: 'Permissions-Policy',
                  value: 'camera=(), microphone=(), geolocation=()',
               },
               {
                  key: 'Content-Security-Policy',
                  value: [
                     "default-src 'self'",
                     "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:",
                     "style-src 'self' 'unsafe-inline'",
                     "img-src 'self' data: https: blob:",
                     "font-src 'self' data:",
                     "connect-src 'self' https://*.supabase.co",
                     "media-src 'self' https://cdnt-preview.dzcdn.net",
                     "frame-ancestors 'self'",
                     "base-uri 'self'",
                     "form-action 'self'",
                  ].join('; '),
               },
            ],
         },
      ];
   },
};

export default nextConfig;
