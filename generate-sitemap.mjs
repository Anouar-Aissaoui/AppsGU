import fs from 'fs';
import { APPS_DATA } from './constants.ts';

const BASE_URL = process.env.SITE_URL || 'https://www.appsg.site';
const currentDate = new Date().toISOString().split('T')[0];

// Generate sitemap XML
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Individual App Pages -->`;

  // Add app pages
  APPS_DATA.forEach(app => {
    sitemap += `
  <url>
    <loc>${BASE_URL}/app/${app.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  sitemap += `
  
  <!-- Category Pages -->`;

  // Get unique categories and add category pages
  const categories = [...new Set(APPS_DATA.map(app => app.category))];
  categories.forEach(category => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
    sitemap += `
  <url>
    <loc>${BASE_URL}/category/${categorySlug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

// Write sitemap to file
const sitemapContent = generateSitemap();
fs.writeFileSync('./public/sitemap.xml', sitemapContent, 'utf8');

console.log('✅ Sitemap generated successfully!');
console.log(`📄 Generated ${APPS_DATA.length} app pages and ${[...new Set(APPS_DATA.map(app => app.category))].length} category pages`);
console.log('🔗 Sitemap available at: /sitemap.xml');