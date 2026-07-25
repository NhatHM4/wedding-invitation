import type { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savethedate.io.vn';

  // Lấy tất cả các thiệp cưới từ Supabase
  const { data: weddings } = await supabase
    .from('weddings')
    .select('slug, custom_domain, created_at');

  const weddingUrls: MetadataRoute.Sitemap = (weddings || []).map((w) => {
    const url = w.custom_domain
      ? `https://${w.custom_domain.replace(/^www\./, '')}`
      : `${baseUrl}/card/${w.slug}`;

    return {
      url: url,
      lastModified: w.created_at ? new Date(w.created_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...weddingUrls,
  ];
}
