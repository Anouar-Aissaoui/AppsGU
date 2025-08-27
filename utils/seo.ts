interface SeoData {
    title: string;
    description: string;
    canonical: string;
    ogType?: string;
    ogImage?: string;
    robots?: string; // e.g., "index, follow" or "noindex, follow"
}

const DEFAULT_OG_IMAGE = 'https://i.imgur.com/rq3p0eE.png'; // Default OG image

const CANONICAL_HOSTNAME = 'www.appsg.site';

function normalizeUrl(input: string): string {
    try {
        const base = typeof window !== 'undefined' ? window.location.origin : `https://${CANONICAL_HOSTNAME}`;
        const url = new URL(input, base);

        // Enforce https and canonical host
        url.protocol = 'https:';
        url.hostname = CANONICAL_HOSTNAME;

        // Remove tracking and non-canonical params
        const paramsToRemove = [
            'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
            'gclid', 'fbclid', 'ref', 'source', 'mc_cid', 'mc_eid', 'igsh', 'igshid'
        ];
        paramsToRemove.forEach(param => url.searchParams.delete(param));

        // Remove internal/filtering params from canonical
        url.searchParams.delete('category');
        url.searchParams.delete('page');
        url.searchParams.delete('q');

        // Re-serialize search (ensures empty string when no params)
        url.search = url.searchParams.toString() ? `?${url.searchParams.toString()}` : '';

        // Trailing slash policy: only root has trailing slash
        if (url.pathname !== '/' && url.pathname.endsWith('/')) {
            url.pathname = url.pathname.replace(/\/+$/, '');
        }

        return url.toString();
    } catch {
        return input;
    }
}

export const updateMetaTags = (data: SeoData) => {
    let { title, description, canonical, ogType = 'website', ogImage = DEFAULT_OG_IMAGE, robots } = data;

    // Enforce best-practice lengths
    const clamp = (str: string, max: number) => (str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str);
    title = clamp(title, 60);
    description = clamp(description, 160);

    // Document Title
    document.title = title;

    // Meta Description
    const metaDescriptionTag = document.getElementById('meta-description') as HTMLMetaElement;
    if (metaDescriptionTag) metaDescriptionTag.content = description;

    // Canonical Link
    const normalizedCanonical = normalizeUrl(canonical);
    const canonicalLinkTag = document.getElementById('canonical-link') as HTMLLinkElement;
    if (canonicalLinkTag) canonicalLinkTag.href = normalizedCanonical;

    // Robots meta
    if (typeof robots === 'string' && robots.trim().length > 0) {
        const robotsTag = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
        if (robotsTag) {
            robotsTag.content = robots;
        }
    }
    
    // --- Open Graph Tags ---
    const ogTypeTag = document.getElementById('og-type') as HTMLMetaElement;
    if (ogTypeTag) ogTypeTag.content = ogType;
    
    const ogUrlTag = document.getElementById('og-url') as HTMLMetaElement;
    if (ogUrlTag) ogUrlTag.content = normalizedCanonical;

    const ogTitleTag = document.getElementById('og-title') as HTMLMetaElement;
    if (ogTitleTag) ogTitleTag.content = title;

    const ogDescriptionTag = document.getElementById('og-description') as HTMLMetaElement;
    if (ogDescriptionTag) ogDescriptionTag.content = description;
    
    const ogImageTag = document.getElementById('og-image') as HTMLMetaElement;
    if (ogImageTag) ogImageTag.content = ogImage;

    // --- Twitter Card Tags ---
    const twitterCardTag = document.getElementById('twitter-card') as HTMLMetaElement;
    if (twitterCardTag) twitterCardTag.content = 'summary_large_image';

    const twitterTitleTag = document.getElementById('twitter-title') as HTMLMetaElement;
    if (twitterTitleTag) twitterTitleTag.content = title;
    
    const twitterDescriptionTag = document.getElementById('twitter-description') as HTMLMetaElement;
    if (twitterDescriptionTag) twitterDescriptionTag.content = description;

    const twitterImageTag = document.getElementById('twitter-image') as HTMLMetaElement;
    if (twitterImageTag) twitterImageTag.content = ogImage;
};
