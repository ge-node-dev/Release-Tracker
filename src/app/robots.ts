import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

   return {
      sitemap: `${siteUrl}/sitemap.xml`,
      rules: {
         allow: '/',
         userAgent: '*',
         disallow: ['/profile', '/api/', '/reset-password'],
      },
   };
}
