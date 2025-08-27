import React, { useEffect } from 'react';
import type { AppInfo } from '../types';
import { slugify } from '../utils/slugify';
import { updateMetaTags } from '../utils/seo';
import ShareButtons from './ShareButtons';
import RelatedApps from './RelatedApps';

// SEO Component for managing head tags and structured data
const SeoHead: React.FC<{ app: AppInfo }> = ({ app }) => {
    useEffect(() => {
        const baseUrl = window.location.origin;
        const canonicalUrl = `${baseUrl}/app/${app.slug}`;
        const year = new Date().getFullYear();

        // Helper to generate a more accurate name for SEO, avoiding redundancy
        const getAppSeoName = (title: string): string => {
            const lowerTitle = title.toLowerCase();
            const keywords = ['mod', 'menu', '++', 'spoofer', 'hack', 'cheat', 'tweak'];
            if (keywords.some(keyword => lowerTitle.includes(keyword))) {
                return title; // Already contains a keyword, return as is
            }
            // More specific keywords based on category
            if (app.category === 'Games') return `${title} Mod Menu`;
            if (app.category === 'Social') return `${title}++`;
            return `${title} Mod`; // Default fallback
        };
        const appSeoName = getAppSeoName(app.title);

        updateMetaTags({
            title: `${appSeoName} v${app.version} – Free Download | AppsGU`,
            description: `Download ${appSeoName} v${app.version} for iOS & Android. ${app.description}`,
            canonical: canonicalUrl,
            ogType: 'article',
            ogImage: app.img,
        });

        // JSON-LD Structured Data
        const cleanupJsonLd = () => {
            document.querySelectorAll('script[data-app-detail-jsonld]').forEach(el => el.remove());
        };

        const addJsonLd = (data: object) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-app-detail-jsonld', 'true');
            script.innerHTML = JSON.stringify(data);
            document.head.appendChild(script);
        };
        
        cleanupJsonLd(); // Clean up from previous render

        // SoftwareApplication Schema
        addJsonLd({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": app.title,
            "description": app.longDescription,
            "applicationCategory": app.category + "Application",
            "operatingSystem": "iOS, Android",
            "softwareVersion": app.version,
            "publisher": { "@type": "Organization", "name": "AppsGU" },
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "downloadUrl": canonicalUrl,
            "screenshot": app.img,
            "image": [app.img]
        });

        // BreadcrumbList Schema
        addJsonLd({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Apps", "item": baseUrl },
                { "@type": "ListItem", "position": 2, "name": app.title, "item": canonicalUrl }
            ]
        });

        // FAQPage Schema
        if (app.faqs && app.faqs.length > 0) {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": app.faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
                }))
            });
        }

        // HowTo Schema (Programmatic SEO) for AltStore
        if (app.slug === 'altstore') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Install AltStore on iPhone/iPad (Windows & macOS)",
                "totalTime": "PT10M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "supply": [
                    { "@type": "HowToSupply", "name": "iPhone or iPad" },
                    { "@type": "HowToSupply", "name": "Lightning/USB‑C cable" }
                ],
                "tool": [
                    { "@type": "HowToTool", "name": "AltServer (Windows/macOS)" }
                ],
                "step": [
                    { "@type": "HowToStep", "name": "Install AltServer", "text": "Download and install AltServer on your Windows PC or Mac." },
                    { "@type": "HowToStep", "name": "Connect your device", "text": "Connect your iPhone/iPad via USB and trust the computer when prompted." },
                    { "@type": "HowToStep", "name": "Install AltStore", "text": "Open AltServer and choose Install AltStore, then select your device." },
                    { "@type": "HowToStep", "name": "Sign in with Apple ID", "text": "Enter your Apple ID (free account works) to sign the app." },
                    { "@type": "HowToStep", "name": "Trust the certificate", "text": "On your device: Settings → General → Device Management → Trust your Apple ID." },
                    { "@type": "HowToStep", "name": "Launch AltStore", "text": "Open AltStore on your device and start sideloading .ipa files." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for DreameShort Coins
        if (app.slug === 'dreameshort-coins') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate DreameShort Coins (iOS & Android)",
                "totalTime": "PT3M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Download Plugin", "text": "Tap Download and follow the on-screen instructions." },
                    { "@type": "HowToStep", "name": "Open DreameShort", "text": "Sign in to your account to sync." },
                    { "@type": "HowToStep", "name": "Enjoy Coins & Bonuses", "text": "Coins and daily bonuses apply automatically after activation." }
                ]
            });
        }

        return cleanupJsonLd;
    }, [app]);

    return null;
};

// Breadcrumbs Component
const Breadcrumbs: React.FC<{ app: AppInfo }> = ({ app }) => {
    return (
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <a href="/" className="hover:text-[#00ff88]">Apps</a>
                </li>
                <li className="flex items-center mx-2">
                    <i className="fas fa-chevron-right fa-xs"></i>
                </li>
                <li className="flex items-center">
                    <span className="text-gray-400">{app.title}</span>
                </li>
            </ol>
        </nav>
    );
};


interface AppDetailViewProps {
  app: AppInfo;
  allApps: AppInfo[];
  isPanel: boolean;
}

const AppDetailView: React.FC<AppDetailViewProps> = ({ app, allApps, isPanel }) => {
  const computedDownloadUrl = React.useMemo(() => {
    const isTapTweak = (app.author || '').toLowerCase() === 'taptweak';
    if (!isTapTweak) return undefined;
    return `https://realuserchecker.com/?app=${encodeURIComponent(app.title)}&dev=TapTweak.com`;
  }, [app]);
  return (
    <>
      <SeoHead app={app} />
      <div className="container mx-auto px-4 py-8 animate-fade-in">
          {!isPanel && (
              <a href="/" className="inline-block mb-8 text-[#00ff88] hover:underline transition-colors">
                  &larr; Back to all apps
              </a>
          )}
          
          {isPanel && <div className="mb-4 h-4"></div>}
          
          <Breadcrumbs app={app}/>

          <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-6 md:p-8 shadow-2xl shadow-black/30">
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                  <img 
                      src={app.img} 
                      alt={`Hero image – ${app.title} ${app.category} Mod v${app.version} for iOS & Android`}
                      title={`${app.title} Mod v${app.version} – iOS & Android Download`}
                      width={160}
                      height={160}
                      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-3xl shadow-lg flex-shrink-0"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      sizes="(min-width: 768px) 160px, 128px"
                  />
                  <div className="flex-grow">
                      <div className="text-sm font-bold text-[#00ff88] uppercase tracking-wider">{app.author}</div>
                      <h1 className="text-4xl md:text-5xl font-black text-white my-1">{app.slug === 'altstore' ? 'AltStore – iOS App Installer' : app.slug === 'dreameshort-coins' ? 'DreameShort Coins – Unlimited Coins & Bonuses' : app.title}</h1>
                      <div className="flex items-center gap-x-4 gap-y-1 text-gray-400 text-sm mb-4 flex-wrap">
                          <span>Version: {app.version}</span>
                          <span className="hidden sm:inline">|</span>
                          <span>Size: {app.size}</span>
                           <span className="hidden sm:inline">|</span>
                           <a href={`/category/${slugify(app.category)}`} className="hover:text-[#00ff88] hover:underline">Category: {app.category}</a>
                      </div>
                      <p className="text-base text-gray-300 mb-6">{app.description}</p>
                      <button 
                          data-c-l-url={computedDownloadUrl}
                          onClick={() => {
                              const anyWindow = window as any;
                              if (typeof anyWindow.call_locker === 'function') {
                                  try { anyWindow.call_locker(); return; } catch {}
                              }
                              if (computedDownloadUrl) {
                                  window.location.href = computedDownloadUrl;
                              }
                          }}
                          className="bg-[#00ff88] text-zinc-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all duration-300 transform hover:scale-105">
                          DOWNLOAD NOW
                      </button>
                      <ShareButtons app={app} />
                  </div>
              </div>
              <hr className="border-zinc-700 my-8" />
              <div>
                  <h2 className="text-2xl font-bold text-white mb-4">About This Mod</h2>
                  <div className="text-gray-400 whitespace-pre-line leading-relaxed prose prose-invert prose-p:text-gray-400 prose-ul:text-gray-400">
                      {app.longDescription}
                  </div>
              </div>

             {app.faqs && app.faqs.length > 0 && (
                <>
                    <hr className="border-zinc-700 my-8" />
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {app.faqs.map((faq, index) => (
                                <div key={index}>
                                    <h3 className="font-bold text-white text-lg mb-2">{faq.question}</h3>
                                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
             )}
            <RelatedApps currentAppSlug={app.slug} category={app.category} allApps={allApps} />
          </div>
      </div>
    </>
  );
}

export default AppDetailView;