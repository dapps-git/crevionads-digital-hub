export default async function handler(req, res) {
  const SITE_URL = 'https://www.crevionads.com';
  const BACKEND_URL = 'https://tweaki.pw/api';

  // Helper with 4 second timeout so search engines never hang
  const fetchWithTimeout = async (url) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!response.ok) return null;
      return await response.json();
    } catch {
      clearTimeout(timeout);
      return null;
    }
  };

  const formatDate = (dateStr) => {
    try {
      const d = dateStr ? new Date(dateStr) : new Date();
      return d.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  };

  // Fetch live services, blogs, and works
  const [servicesData, blogsData, worksData] = await Promise.all([
    fetchWithTimeout(`${BACKEND_URL}/services`),
    fetchWithTimeout(`${BACKEND_URL}/blogs`),
    fetchWithTimeout(`${BACKEND_URL}/works`),
  ]);

  // Fallback defaults if backend is temporarily unreachable
  const defaultServices = [
    { slug: 'digital-marketing', updatedAt: '2026-07-11' },
    { slug: 'brand-identity-design', updatedAt: '2026-07-11' },
    { slug: 'seo-content-strategy', updatedAt: '2026-07-11' },
    { slug: 'web-development', updatedAt: '2026-07-11' },
    { slug: 'social-media-management', updatedAt: '2026-07-11' },
    { slug: 'video-production', updatedAt: '2026-07-11' },
  ];

  const defaultBlogs = [
    { slug: '10-digital-marketing-trends-2025', updatedAt: '2026-05-21' },
  ];

  const services = Array.isArray(servicesData) && servicesData.length > 0
    ? servicesData
    : defaultServices;

  const blogs = Array.isArray(blogsData) && blogsData.length > 0
    ? blogsData
    : defaultBlogs;

  const works = Array.isArray(worksData) ? worksData : [];

  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // 1. Homepage
  xml += `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  // 2. Services (/services/:slug)
  services.forEach((s) => {
    if (s.slug) {
      xml += `  <url>\n    <loc>${SITE_URL}/services/${encodeURIComponent(s.slug)}</loc>\n    <lastmod>${formatDate(s.updatedAt || s.createdAt)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }
  });

  // 3. Blogs (/blog/:slug)
  blogs.forEach((b) => {
    if (b.slug) {
      xml += `  <url>\n    <loc>${SITE_URL}/blog/${encodeURIComponent(b.slug)}</loc>\n    <lastmod>${formatDate(b.updatedAt || b.createdAt)}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }
  });

  // 4. Works / Portfolio (/work/:id)
  works.forEach((w) => {
    if (w._id) {
      xml += `  <url>\n    <loc>${SITE_URL}/work/${encodeURIComponent(w._id)}</loc>\n    <lastmod>${formatDate(w.updatedAt || w.createdAt)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
    }
  });

  xml += '</urlset>';

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).send(xml);
}
