import React from 'react';

interface JsonLdSchemaProps {
  type: 'website' | 'organization' | 'breadcrumb' | 'itemList' | 'siteNavigation';
  data?: any;
}

const JsonLdSchema: React.FC<JsonLdSchemaProps> = ({ type, data }) => {
  let schema = {};

  switch (type) {
    case 'website':
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AppsGU",
        "alternateName": "AppsGU - Free iOS Android Mods",
        "url": "https://www.appsg.site",
        "description": "Download 100+ free modded apps for iOS & Android. AltStore, Instagram++, game mods & more with safe installation guides.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.appsg.site/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://www.appsg.site/#organization"
        }
      };
      break;

    case 'organization':
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://www.appsg.site/#organization",
        "name": "AppsGU",
        "url": "https://www.appsg.site",
        "logo": {
          "@type": "ImageObject",
          "url": "https://i.imgur.com/rq3p0eE.png",
          "width": 512,
          "height": 512
        },
        "description": "Leading platform for free iOS and Android modded applications with safe installation guides and regular updates.",
        "foundingDate": "2023",
        "knowsAbout": [
          "iOS App Installation",
          "Android APK Mods", 
          "AltStore Setup",
          "Sideloading Apps",
          "Mobile App Modifications"
        ],
        "areaServed": "Worldwide",
        "serviceType": "Software Distribution Platform"
      };
      break;

    case 'breadcrumb':
      if (!data || !Array.isArray(data.items)) return null;
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data.items.map((item: { name: string; url: string }, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };
      break;

    case 'itemList':
      if (!data || !Array.isArray(data.items)) return null;
      schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": data.items.map((item: { name: string; url: string }, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          url: item.url,
          name: item.name
        }))
      };
      break;

    case 'siteNavigation':
      if (!data || !Array.isArray(data.items)) return null;
      schema = {
        "@context": "https://schema.org",
        "@type": "SiteNavigationElement",
        "name": data.items.map((it: { name: string }) => it.name),
        "url": data.items.map((it: { url: string }) => it.url)
      };
      break;

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonLdSchema;