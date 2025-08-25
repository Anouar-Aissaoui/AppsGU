import React, { useEffect } from 'react';
import type { AppInfo, FAQ } from '../types';

// SEO Component for managing head tags and structured data
const SeoHead: React.FC<{ app: AppInfo }> = ({ app }) => {
    useEffect(() => {
        const baseUrl = window.location.origin;
        const canonicalUrl = `${baseUrl}/app/${app.slug}`;

        // Basic Meta Tags
        document.title = `${app.title} for iOS & Android – Download (Latest Version)`;
        
        const metaDescriptionTag = document.getElementById('meta-description') as HTMLMetaElement;
        if (metaDescriptionTag) {
            metaDescriptionTag.content = `${app.title} lets you ${app.description.toLowerCase()}. Step-by-step install, features, FAQs. Updated ${new Date().getFullYear()}.`;
        }

        const canonicalLinkTag = document.getElementById('canonical-link') as HTMLLinkElement;
        if (canonicalLinkTag) {
            canonicalLinkTag.href = canonicalUrl;
        }

        // JSON-LD Structured Data
        const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
        existingScripts.forEach(script => script.remove());

        const addJsonLd = (data: object) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify(data);
            document.head.appendChild(script);
        };

        // SoftwareApplication Schema
        addJsonLd({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": app.title,
            "description": app.longDescription,
            "applicationCategory": app.category + "Application",
            "operatingSystem": "iOS, Android",
            "softwareVersion": app.version,
            "publisher": { "@type": "Organization", "name": "AppsGU Clone" },
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "downloadUrl": canonicalUrl,
            "screenshot": app.img
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

        return () => {
             const addedScripts = document.querySelectorAll('script[type="application/ld+json"]');
             addedScripts.forEach(script => script.remove());
        };
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
  isPanel: boolean;
}

const AppDetailView: React.FC<AppDetailViewProps> = ({ app, isPanel }) => {
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
                      alt={`${app.title} icon`}
                      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-3xl shadow-lg flex-shrink-0"
                  />
                  <div className="flex-grow">
                      <div className="text-sm font-bold text-[#00ff88] uppercase tracking-wider">{app.author}</div>
                      <h1 className="text-4xl md:text-5xl font-black text-white my-1">{app.title}</h1>
                      <div className="flex items-center gap-x-4 gap-y-1 text-gray-400 text-sm mb-4 flex-wrap">
                          <span>Version: {app.version}</span>
                          <span className="hidden sm:inline">|</span>
                          <span>Size: {app.size}</span>
                           <span className="hidden sm:inline">|</span>
                          <span>Category: {app.category}</span>
                      </div>
                      <p className="text-base text-gray-300 mb-6">{app.description}</p>
                      <button className="bg-[#00ff88] text-zinc-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all duration-300 transform hover:scale-105">
                          DOWNLOAD NOW
                      </button>
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
          </div>
      </div>
    </>
  );
}

export default AppDetailView;