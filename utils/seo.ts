interface SeoData {
    title: string;
    description: string;
    canonical: string;
    ogType?: string;
    ogImage?: string;
}

const DEFAULT_OG_IMAGE = 'https://i.imgur.com/rq3p0eE.webp'; // Default OG image

export const updateMetaTags = (data: SeoData) => {
    const { title, description, canonical, ogType = 'website', ogImage = DEFAULT_OG_IMAGE } = data;

    // Document Title
    document.title = title;

    // Meta Description
    const metaDescriptionTag = document.getElementById('meta-description') as HTMLMetaElement;
    if (metaDescriptionTag) metaDescriptionTag.content = description;

    // Canonical Link
    const canonicalLinkTag = document.getElementById('canonical-link') as HTMLLinkElement;
    if (canonicalLinkTag) canonicalLinkTag.href = canonical;
    
    // --- Open Graph Tags ---
    const ogTypeTag = document.getElementById('og-type') as HTMLMetaElement;
    if (ogTypeTag) ogTypeTag.content = ogType;
    
    const ogUrlTag = document.getElementById('og-url') as HTMLMetaElement;
    if (ogUrlTag) ogUrlTag.content = canonical;

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