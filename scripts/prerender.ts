import fs from 'fs';
import path from 'path';
import { APPS_DATA } from '../constants.ts';

const SITE_URL = process.env.SITE_URL || 'https://www.appsg.site';

const ensureDir = (dir: string) => fs.mkdirSync(dir, { recursive: true });
const read = (p: string) => fs.readFileSync(p, 'utf8');
const write = (p: string, c: string) => fs.writeFileSync(p, c, 'utf8');

const clamp = (str: string, max: number) => (str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str);
const slugify = (text: string): string => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

function extractUnlimitedPhrases(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/Unlimited\s+[A-Za-z0-9+&\s]+/g) || [];
  return matches.map(m => m.replace(/!+$/, '').trim()).map(m => m.replace(/\s{2,}/g, ' '));
}

type Topic = { slug: string; name: string };
function collectTopics(): Topic[] {
  const map = new Map<string, string>();
  for (const app of APPS_DATA) {
    const sources = [app.description, app.longDescription];
    for (const source of sources) {
      for (const phrase of extractUnlimitedPhrases(source)) {
        const s = slugify(phrase);
        if (!map.has(s)) map.set(s, phrase);
      }
    }
    if (/mod\s*menu/i.test(app.title) || /mod\s*menu/i.test(app.description) || /mod\s*menu/i.test(app.longDescription)) {
      map.set('mod-menu', 'Mod Menu');
    }
  }
  return Array.from(map.entries()).map(([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
}

const replaceMeta = (html: string, { title, description, canonical, ogType = 'website', ogImage, ogImageAlt }: { title: string; description: string; canonical: string; ogType?: string; ogImage?: string; ogImageAlt?: string; }) => {
  let out = html;
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  out = out.replace(/(<meta id="meta-description"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(description)}$2`);
  out = out.replace(/(<link id="canonical-link"[^>]*href=")[^"]*("[^>]*>)/, `$1${esc(canonical)}$2`);
  out = out.replace(/(<meta id="og-type"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(ogType)}$2`);
  out = out.replace(/(<meta id="og-url"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(canonical)}$2`);
  out = out.replace(/(<meta id="og-title"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(title)}$2`);
  out = out.replace(/(<meta id="og-description"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(description)}$2`);
  if (ogImage) {
    out = out.replace(/(<meta id="og-image"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(ogImage)}$2`);
    out = out.replace(/(<meta id="twitter-image"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(ogImage)}$2`);
    if (ogImageAlt) {
      out = out.replace(/(<meta id="og-image-alt"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(ogImageAlt)}$2`);
      out = out.replace(/(<meta id="twitter-image-alt"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(ogImageAlt)}$2`);
    }
  }
  out = out.replace(/(<meta id="twitter-title"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(title)}$2`);
  out = out.replace(/(<meta id="twitter-description"[^>]*content=")[^"]*("[^>]*>)/, `$1${esc(description)}$2`);
  return out;
};

const injectJsonLd = (html: string, jsons: object[]) => {
  const scripts = jsons.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n');
  return html.replace('</head>', `${scripts}\n</head>`);
};

const distDir = path.resolve('./dist');
const templatePath = path.join(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('❌ Build not found. Run `npm run build` first.');
  process.exit(1);
}
const template = read(templatePath);

// Home
{
  const title = clamp('iOS & Android Modded Apps – Free Downloads | AppsGU', 60);
  const description = clamp('Download free modded apps and tweaks for iPhone, iPad and Android. Safe guides, FAQs and regular updates.', 160);
  const canonical = `${SITE_URL}/`;
  let html = replaceMeta(template, { title, description, canonical, ogType: 'website', ogImage: 'https://i.imgur.com/rq3p0eE.png', ogImageAlt: 'AppsGU – iOS & Android Mods' });
  // Simple FAQ + Categories ItemList JSON-LD for home
  const categoriesHome = Array.from(new Set(APPS_DATA.map(a => a.category)));
  const categoryItems = categoriesHome.map(c => ({ name: c, url: `${SITE_URL}/category/${slugify(c)}` }));
  html = injectJsonLd(html, [{
    '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
      { '@type': 'Question', name: 'Are these iOS/Android mods safe?', acceptedAnswer: { '@type': 'Answer', text: 'We provide guides and safety tips. Use responsibly, especially in online modes.' } },
      { '@type': 'Question', name: 'Do I need jailbreak or root?', acceptedAnswer: { '@type': 'Answer', text: 'No. Most apps work on standard iOS and Android devices without jailbreak or root.' } }
    ]
  }, {
    '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: categoryItems.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: it.url, name: it.name }))
  }]);
  const outPath = path.join(distDir, 'index.html');
  write(outPath, html);
}

// Categories
const categories = Array.from(new Set(APPS_DATA.map(a => a.category)));
for (const category of categories) {
  const slug = slugify(category);
  const items = APPS_DATA.filter(a => a.category === category).slice(0, 20).map(a => ({ name: a.title, url: `${SITE_URL}/app/${a.slug}` }));
  const title = clamp(`Best ${category} Mods – Free Download | AppsGU`, 60);
  const description = clamp(`Top ${items.length}+ ${category.toLowerCase()} mods for iOS & Android. Safe downloads and guides.`, 160);
  const canonical = `${SITE_URL}/category/${slug}`;
  let html = replaceMeta(template, { title, description, canonical, ogType: 'website', ogImage: 'https://i.imgur.com/rq3p0eE.png', ogImageAlt: `${category} mods – AppsGU` });
  html = injectJsonLd(html, [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Apps', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: category, item: canonical }
    ]},
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: it.url, name: it.name })) }
  ]);
  const dir = path.join(distDir, 'category', slug);
  ensureDir(dir);
  write(path.join(dir, 'index.html'), html);
}

// Apps
for (const app of APPS_DATA) {
  const getAppSeoName = (title: string, category: string): string => {
    const lower = title.toLowerCase();
    const keywords = ['mod', 'menu', '++', 'spoofer', 'hack', 'cheat', 'tweak'];
    if (keywords.some(k => lower.includes(k))) return title;
    if (category === 'Games') return `${title} Mod Menu`;
    if (category === 'Social') return `${title}++`;
    return title;
  };
  const appSeo = getAppSeoName(app.title, app.category);
  const title = clamp(`${appSeo} v${app.version} – Free Download | AppsGU`, 60);
  const description = clamp(`Download ${appSeo} v${app.version} for iOS & Android. ${app.description}`, 160);
  const canonical = `${SITE_URL}/app/${app.slug}`;
  if (app.slug === 'board-kings-hack') {
    console.log(`[prerender] Using image for ${app.slug}: ${app.img}`);
  }
  let html = replaceMeta(template, { title, description, canonical, ogType: 'article', ogImage: app.img, ogImageAlt: `${app.title} – ${app.category} mod preview` });
  if (app.slug === 'board-kings-hack') {
    // Programmatic SEO: HowTo JSON-LD specific to Board Kings
    const howTo = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Activate Board Kings Hack (Unlimited Gems, Coins & Rolls)',
      totalTime: 'PT2M',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
      step: [
        { '@type': 'HowToStep', name: 'Install Board Kings Hack', text: 'Tap Download and install the Board Kings Hack on your device.' },
        { '@type': 'HowToStep', name: 'Open and Finish Intro', text: 'Launch the game and complete the intro/tutorial sequence.' },
        { '@type': 'HowToStep', name: 'Resources Sync', text: 'Gems, coins and rolls sync automatically. Start rolling and upgrading.' }
      ]
    };
    const safeHtml = injectJsonLd(html, [howTo]);
    html = safeHtml;
  }
  const jsons: object[] = [];
  jsons.push({ '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: app.title, description: app.longDescription, applicationCategory: app.category + 'Application', operatingSystem: 'iOS, Android', softwareVersion: app.version, publisher: { '@type': 'Organization', name: 'AppsGU' }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, downloadUrl: canonical, screenshot: app.img, image: [app.img] });
  jsons.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Apps', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: app.title, item: canonical } ] });
  if (app.faqs && app.faqs.length > 0) {
    jsons.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: app.faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) });
  }
  html = injectJsonLd(html, jsons);
  const dir = path.join(distDir, 'app', app.slug);
  ensureDir(dir);
  write(path.join(dir, 'index.html'), html);
}

// Topics index and topic pages
{
  const topics = collectTopics();
  if (topics.length > 0) {
    // Topics index
    const title = clamp('Topics – Popular Mod Features | AppsGU', 60);
    const description = clamp('Browse topics like Unlimited Coins, Unlimited Gems, and Mod Menu across iOS & Android mods.', 160);
    const canonical = `${SITE_URL}/topic`;
    let html = replaceMeta(template, { title, description, canonical, ogType: 'website', ogImage: 'https://i.imgur.com/rq3p0eE.png', ogImageAlt: 'AppsGU Topics' });
    html = injectJsonLd(html, [
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Apps', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Topics', item: canonical } ] },
      { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: topics.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/topic/${t.slug}`, name: t.name })) }
    ]);
    const dir = path.join(distDir, 'topic');
    ensureDir(dir);
    write(path.join(dir, 'index.html'), html);

    // Individual topic pages
    for (const topic of topics) {
      const apps = APPS_DATA.filter(a => {
        if (topic.slug === 'mod-menu') {
          return /mod\s*menu/i.test(a.title) || /mod\s*menu/i.test(a.description) || /mod\s*menu/i.test(a.longDescription);
        }
        const phrases = extractUnlimitedPhrases(a.description + ' ' + a.longDescription).map(p => slugify(p));
        return phrases.includes(topic.slug);
      }).slice(0, 20);
      const titleT = clamp(`${topic.name} – ${apps.length}+ Apps | AppsGU`, 60);
      const descT = clamp(`Explore ${apps.length}+ apps with ${topic.name.toLowerCase()} for iOS & Android.`, 160);
      const canonicalT = `${SITE_URL}/topic/${topic.slug}`;
      let htmlT = replaceMeta(template, { title: titleT, description: descT, canonical: canonicalT, ogType: 'website', ogImage: 'https://i.imgur.com/rq3p0eE.png', ogImageAlt: `${topic.name} – AppsGU` });
      htmlT = injectJsonLd(htmlT, [
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Apps', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: 'Topics', item: `${SITE_URL}/topic` }, { '@type': 'ListItem', position: 3, name: topic.name, item: canonicalT } ] },
        { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: apps.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/app/${a.slug}`, name: a.title })) }
      ]);
      const tdir = path.join(distDir, 'topic', topic.slug);
      ensureDir(tdir);
      write(path.join(tdir, 'index.html'), htmlT);
    }
  }
}

console.log('✅ Prerender complete. Static pages written to dist/.');
