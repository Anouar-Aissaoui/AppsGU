import React, { useEffect } from 'react';
import type { AppInfo } from '../types';
import AppItem from './AppItem';

interface AppListProps {
  apps: AppInfo[];
  activeSlug: string | null;
  isPanel: boolean;
}

const AppList: React.FC<AppListProps> = ({ apps, activeSlug, isPanel }) => {
  useEffect(() => {
    const scriptId = 'app-item-list-schema';
    document.getElementById(scriptId)?.remove();
    
    if (apps.length === 0) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    
    const itemListElement = apps.map((app, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${window.location.origin}/app/${app.slug}`,
      "name": app.title
    }));

    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": itemListElement
    });

    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [apps]);

  return (
    <section className="py-8 lg:p-4">
      <div className="container mx-auto px-4 lg:p-0">
        {apps.length > 0 ? (
          <ul className={`grid gap-4 ${isPanel ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
            {apps.map((app) => <AppItem key={app.slug} app={app} isActive={app.slug === activeSlug} />)}
          </ul>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl text-zinc-700 mb-4 animate-pulse">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <p className="text-gray-500 text-lg">No apps found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppList;
