import fs from 'fs';
import { APPS_DATA } from '../constants.ts';

const SITE_URL = process.env.SITE_URL || 'https://www.appsg.site';

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const nowRfc2822 = new Date().toUTCString();

const items = APPS_DATA.slice(0, 50).map(app => {
  const link = `${SITE_URL}/app/${app.slug}`;
  const title = `${app.title} v${app.version} – Free Download`;
  const description = `${app.description} — iOS & Android.`;
  return `    <item>
      <title>${xmlEscape(title)}</title>
      <link>${xmlEscape(link)}</link>
      <guid isPermaLink="true">${xmlEscape(link)}</guid>
      <description><![CDATA[<p>${xmlEscape(description)}</p><img src="${xmlEscape(app.img)}" alt="${xmlEscape(app.title)} – ${xmlEscape(app.category)} mod preview" width="512" height="512" />]]></description>
      <category>${xmlEscape(app.category)}</category>
      <pubDate>${nowRfc2822}</pubDate>
    </item>`;
}).join('\n');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AppsGU – Latest Mods</title>
    <link>${SITE_URL}/</link>
    <description>Newest iOS & Android modded apps and tools.</description>
    <language>en-us</language>
    <lastBuildDate>${nowRfc2822}</lastBuildDate>
${items}
  </channel>
</rss>`;

fs.mkdirSync('./public', { recursive: true });
fs.writeFileSync('./public/rss.xml', rss, 'utf8');
console.log('✅ RSS generated at /public/rss.xml');

