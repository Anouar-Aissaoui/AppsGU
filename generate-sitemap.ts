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

const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

function extractUnlimitedPhrases(description: string): string[] {
  const matches = description.match(/Unlimited\s+[A-Za-z0-9+&\s]+/g) || [];
  return matches
    .map(m => m.replace(/!+$/, '').trim())
    .map(m => m.replace(/\s{2,}/g, ' '))
    .slice(0, 2);
}

type Topic = { slug: string; name: string };

function collectTopics(): Topic[] {
  const topicMap = new Map<string, string>();
  for (const app of APPS_DATA) {
    // Unlimited X
    for (const phrase of extractUnlimitedPhrases(app.description)) {
      const name = phrase; // e.g., "Unlimited Coins"
      const s = slugify(name);
      if (!topicMap.has(s)) topicMap.set(s, name);
    }
    // Mod Menu
    if (/mod\s*menu/i.test(app.title) || /mod\s*menu/i.test(app.longDescription) || /mod\s*menu/i.test(app.description)) {
      topicMap.set('mod-menu', 'Mod Menu');
    }
  }
  // Return sorted topics by name
  return Array.from(topicMap.entries())
    .map(([slug, name]) => ({ slug, name }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Generate sitemap XML
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
`  <!-- Homepage -->\n` +
`  <url>\n` +
`    <loc>${BASE_URL}/</loc>\n` +
`    <lastmod>${currentDate}</lastmod>\n` +
`    <changefreq>daily</changefreq>\n` +
`    <priority>1.0</priority>\n` +
`  </url>`;

  // Add app pages with image
  APPS_DATA.forEach(app => {
    sitemap += `\n  <url>\n` +
      `    <loc>${BASE_URL}/app/${xmlEscape(app.slug)}</loc>\n` +
      `    <lastmod>${currentDate}</lastmod>\n` +
      `    <changefreq>weekly</changefreq>\n` +
      `    <priority>0.8</priority>\n` +
      `    <image:image>\n` +
      `      <image:loc>${xmlEscape(app.img)}</image:loc>\n` +
      `      <image:caption>${xmlEscape(app.title)} – ${xmlEscape(app.category)} mod preview</image:caption>\n` +
      `      <image:title>${xmlEscape(app.title)}</image:title>\n` +
      `    </image:image>\n` +
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

  // Topics index and topic detail pages (Programmatic SEO)
  const topics = collectTopics();
  if (topics.length > 0) {
    // Topics index page
    sitemap += `\n  <url>\n` +
      `    <loc>${BASE_URL}/topic</loc>\n` +
      `    <lastmod>${currentDate}</lastmod>\n` +
      `    <changefreq>weekly</changefreq>\n` +
      `    <priority>0.6</priority>\n` +
      `  </url>`;
    // Individual topic pages
    topics.forEach(t => {
      sitemap += `\n  <url>\n` +
        `    <loc>${BASE_URL}/topic/${xmlEscape(t.slug)}</loc>\n` +
        `    <lastmod>${currentDate}</lastmod>\n` +
        `    <changefreq>weekly</changefreq>\n` +
        `    <priority>0.6</priority>\n` +
        `  </url>`;
    });
  }

  sitemap += `\n</urlset>`;

  return sitemap;
};

// Write sitemap to file
const sitemapContent = generateSitemap();
fs.writeFileSync('./public/sitemap.xml', sitemapContent, 'utf8');

console.log('✅ Sitemap generated successfully!');
console.log(`📄 Generated ${APPS_DATA.length} app pages and ${[...new Set(APPS_DATA.map(app => app.category))].length} category pages`);
console.log('🔗 Sitemap available at: /sitemap.xml');

