import type { MetadataRoute } from 'next';

import { createSupabaseStaticClient } from '@/lib/supabase/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

   const supabase = createSupabaseStaticClient();
   const { data: releases } = await supabase.from('releases').select('external_key, release_date');

   const releaseUrls: MetadataRoute.Sitemap = (releases ?? []).map((release) => ({
      priority: 0.7,
      changeFrequency: 'monthly',
      url: `${siteUrl}/release/${release.external_key}`,
      lastModified: release.release_date ? new Date(release.release_date) : new Date(),
   }));

   return [
      {
         url: siteUrl,
         priority: 1.0,
         changeFrequency: 'daily',
         lastModified: new Date(),
      },
      ...releaseUrls,
   ];
}
