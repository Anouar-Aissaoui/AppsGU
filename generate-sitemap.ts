import fs from 'fs';
import { APPS_DATA } from './constants.ts';

const BASE_URL = process.env.SITE_URL || 'https://www.appsg.site';
const currentDate = new Date().toISOString().split('T')[0];

const xmlEscape = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// Generate sitemap XML
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
`  <!-- Homepage -->\n` +
`  <url>\n` +
`    <loc>${BASE_URL}/</loc>\n` +
`    <lastmod>${currentDate}</lastmod>\n` +
`    <changefreq>daily</changefreq>\n` +
`    <priority>1.0</priority>\n` +
`  </url>`;

  // Add app pages
  APPS_DATA.forEach(app => {
    sitemap += `\n  <url>\n` +
      `    <loc>${BASE_URL}/app/${xmlEscape(app.slug)}</loc>\n` +
      `    <lastmod>${currentDate}</lastmod>\n` +
      `    <changefreq>weekly</changefreq>\n` +
      `    <priority>0.8</priority>\n` +
      `  </url>`;
  });

  // Get unique categories and add category pages
  const categories = [...new Set(APPS_DATA.map(app => app.category))];
  categories.forEach(category => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    sitemap += `\n  <url>\n` +
      `    <loc>${BASE_URL}/category/${xmlEscape(categorySlug)}</loc>\n` +
      `    <lastmod>${currentDate}</lastmod>\n` +
      `    <changefreq>weekly</changefreq>\n` +
      `    <priority>0.7</priority>\n` +
      `  </url>`;
  });

  sitemap += `\n</urlset>`;

  return sitemap;
};

// Write sitemap to file
const sitemapContent = generateSitemap();
fs.writeFileSync('./public/sitemap.xml', sitemapContent, 'utf8');

console.log('✅ Sitemap generated successfully!');
console.log(`📄 Generated ${APPS_DATA.length} app pages and ${[...new Set(APPS_DATA.map(app => app.category))].length} category pages`);
console.log('🔗 Sitemap available at: /sitemap.xml');

