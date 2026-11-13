import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://devsdecide.com';
  const routes = ['', '/contact', '/case-study', '/privacy'];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : route === '/privacy' ? 0.3 : 0.8,
  }));
}
