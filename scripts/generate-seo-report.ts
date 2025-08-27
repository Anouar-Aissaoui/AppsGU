import fs from 'fs';
import { APPS_DATA } from '../constants.ts';

const SITE_URL = process.env.SITE_URL || 'https://www.appsg.site';

type PageRecommendation = {
  url: string;
  title: string;
  metaDescription: string;
  h1: string;
  headers: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  imageAltSuggestions?: string[];
  internalLinks: { url: string; anchor: string }[];
  canonical: string;
  robots?: string;
  schemaSuggestion?: any;
};

const clamp = (str: string, max: number) => (str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str);

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const getAppSeoName = (title: string, category: string): string => {
  const lowerTitle = title.toLowerCase();
  const keywords = ['mod', 'menu', '++', 'spoofer', 'hack', 'cheat', 'tweak'];
  if (keywords.some(k => lowerTitle.includes(k))) return title;
  if (category === 'Games') return `${title} Mod`;
  if (category === 'Social') return `${title}++`;
  return `${title} Mod`;
};

function extractUnlimitedPhrases(description: string): string[] {
  const matches = description.match(/Unlimited\s+[A-Za-z&\s]+!?/g) || [];
  return matches.map(m => m.replace(/!+$/, '').trim()).slice(0, 2);
}

const recommendations: { sitewide: any; pages: PageRecommendation[] } = {
  sitewide: {
    targetUrl: SITE_URL,
    canonicalHost: 'www.appsg.site',
    totalApps: APPS_DATA.length,
    categories: Array.from(new Set(APPS_DATA.map(a => a.category))).map(c => ({
      name: c,
      slug: slugify(c),
      count: APPS_DATA.filter(a => a.category === c).length
    }))
  },
  pages: []
};

// Home page
{
  const total = APPS_DATA.length;
  const title = clamp('iOS & Android Modded Apps – Free Downloads | AppsGU', 60);
  const meta = clamp(`Download ${total}+ free modded apps for iOS & Android. Safe guides, FAQs, and popular mods updated regularly.`, 160);
  const h1 = 'Download Free iOS & Android Modded Apps';
  const headers = ['Top Downloads', 'Browse by Category', 'FAQs'];
  const internalLinks = Array.from(new Set(APPS_DATA.map(a => a.category)))
    .slice(0, 4)
    .map(c => ({ url: `${SITE_URL}/category/${slugify(c)}`, anchor: `${c} mods` }));
  recommendations.pages.push({
    url: `${SITE_URL}/`,
    title,
    metaDescription: meta,
    h1,
    headers,
    primaryKeyword: 'modded apps',
    secondaryKeywords: ['iOS mods', 'Android mods', 'free downloads', 'app tweaks'],
    internalLinks,
    canonical: `${SITE_URL}/`,
    schemaSuggestion: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'AppsGU',
      url: SITE_URL
    }
  });
}

// Category pages
for (const category of Array.from(new Set(APPS_DATA.map(a => a.category)))) {
  const slug = slugify(category);
  const appsInCat = APPS_DATA.filter(a => a.category === category);
  const count = appsInCat.length;
  const title = clamp(`Best ${category} Mods & Apps – Free Download | AppsGU`, 60);
  const meta = clamp(`Top ${count}+ ${category.toLowerCase()} mods for iOS & Android. Safe downloads, guides, and FAQs.`, 160);
  const h1 = `Best ${category} Mods & Apps`;
  const headers = ['Top Downloads', 'Popular Apps', 'FAQs'];
  const internalLinks = appsInCat.slice(0, 4).map(a => ({ url: `${SITE_URL}/app/${a.slug}`, anchor: `${a.title} mod download` }));
  recommendations.pages.push({
    url: `${SITE_URL}/category/${slug}`,
    title,
    metaDescription: meta,
    h1,
    headers,
    primaryKeyword: `${category} mods`,
    secondaryKeywords: ['iOS mods', 'Android mods', 'free download', `${category.toLowerCase()} apps`],
    internalLinks,
    canonical: `${SITE_URL}/category/${slug}`,
    schemaSuggestion: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: h1,
      url: `${SITE_URL}/category/${slug}`
    }
  });
}

// App pages
for (const app of APPS_DATA) {
  const appSeo = getAppSeoName(app.title, app.category);
  const title = clamp(`${appSeo} v${app.version} – Free Download | AppsGU`, 60);
  const meta = clamp(`Download ${appSeo} v${app.version} for iOS & Android. ${app.description}`, 160);
  const h1 = `${appSeo} v${app.version} Download`;
  const headers = ['About This Mod', 'Key Features', 'Installation', 'FAQs'];
  const unlimited = extractUnlimitedPhrases(app.description);
  const secondary = [
    'iOS mod',
    'Android mod',
    'free download',
    `${app.category.toLowerCase()} mod`,
    ...unlimited.map(u => u.toLowerCase())
  ].slice(0, 5);
  const sameCat = APPS_DATA.filter(a => a.category === app.category && a.slug !== app.slug).slice(0, 2);
  const internalLinks = [
    { url: `${SITE_URL}/category/${slugify(app.category)}`, anchor: `${app.category} mods` },
    ...sameCat.map(a => ({ url: `${SITE_URL}/app/${a.slug}`, anchor: `Download ${a.title} Mod` }))
  ];
  recommendations.pages.push({
    url: `${SITE_URL}/app/${app.slug}`,
    title,
    metaDescription: meta,
    h1,
    headers,
    primaryKeyword: appSeo.toLowerCase(),
    secondaryKeywords: secondary,
    imageAltSuggestions: [
      `${appSeo} mod icon v${app.version} for iOS & Android`,
      `Download ${appSeo} – ${app.category} modded app`
    ],
    internalLinks,
    canonical: `${SITE_URL}/app/${app.slug}`,
    schemaSuggestion: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: app.title,
      applicationCategory: `${app.category}Application`,
      operatingSystem: 'iOS, Android',
      softwareVersion: app.version
    }
  });
}

fs.mkdirSync('./public', { recursive: true });
fs.writeFileSync('./public/seo-report.json', JSON.stringify(recommendations, null, 2), 'utf8');
console.log('✅ SEO report generated at /public/seo-report.json');
