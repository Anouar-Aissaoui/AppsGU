import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import AppList from './components/AppList';
import AppDetailView from './components/AppDetailView';
import CategoryPageView from './components/CategoryPageView';
import TopicsIndexView from './components/TopicsIndexView';
import TopicPageView from './components/TopicPageView';
import AppListSkeleton from './components/AppListSkeleton';
import { useMediaQuery } from './hooks/useMediaQuery';
import { useDebounce } from './hooks/useDebounce';
import { APPS_DATA } from './constants';
import type { AppInfo } from './types';
import { updateMetaTags } from './utils/seo';
import { slugify } from './utils/slugify';
import JsonLdSchema from './components/JsonLdSchema';

const getQueryParam = (param: string) => {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get(param) || '';
};

const getCategoryFromUrl = () => {
    // Deprecated: category is now path-based at /category/:slug
    return null;
};


const App: React.FC = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [searchTerm, setSearchTerm] = useState<string>(getQueryParam('q'));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(getCategoryFromUrl());
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allApps, setAllApps] = useState<AppInfo[]>([]);

  useEffect(() => {
    // Simulate a network request to fetch app data
    const timer = setTimeout(() => {
      setAllApps(APPS_DATA);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    const allCategories = allApps.map(app => app.category);
    return ['All', ...Array.from(new Set(allCategories)).sort()];
  }, [allApps]);


  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
      setSearchTerm(getQueryParam('q'));
      setSelectedCategory(getCategoryFromUrl());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const currentSearch = currentUrl.searchParams.get('q') || '';
    let needsUpdate = false;

    if (debouncedSearchTerm !== currentSearch) {
        if (debouncedSearchTerm) {
            currentUrl.searchParams.set('q', debouncedSearchTerm);
        } else {
            currentUrl.searchParams.delete('q');
        }
        needsUpdate = true;
    }

    if (needsUpdate) {
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [debouncedSearchTerm]);

  // Redirect legacy ?category=... URLs to /category/:slug
  useEffect(() => {
    const url = new URL(window.location.href);
    const legacyCategory = url.searchParams.get('category');
    if (legacyCategory) {
      url.searchParams.delete('category');
      const remainingQuery = url.search ? url.search : '';
      const newPath = `/category/${legacyCategory}${remainingQuery}`;
      window.history.replaceState({}, '', newPath);
      setPathname(`/category/${legacyCategory}`);
    }
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.origin === window.location.origin && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && anchor.target !== '_blank') {
        // Allow opting out of SPA navigation with data-no-spa
        if (anchor.hasAttribute('data-no-spa')) return;
        event.preventDefault();
        const newPath = anchor.pathname + anchor.search + anchor.hash;
        if (newPath !== (window.location.pathname + window.location.search)) {
          window.history.pushState({}, '', newPath);
          setPathname(anchor.pathname);
           if (!isDesktop || !newPath.startsWith('/app/')) {
                window.scrollTo(0, 0);
           }
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isDesktop]);

  const { categorySlug, selectedAppSlug, topicSlug, isTopicsIndex } = useMemo(() => {
    const catMatch = pathname.match(/^\/category\/([a-zA-Z0-9-]+)/);
    const appMatch = pathname.match(/^\/app\/([a-zA-Z0-9-]+)/);
    const topicMatch = pathname.match(/^\/topic\/([a-zA-Z0-9-]+)/);
    const topicsIndex = pathname === '/topic';
    return {
      categorySlug: catMatch ? catMatch[1] : null,
      selectedAppSlug: appMatch ? appMatch[1] : null,
      topicSlug: topicMatch ? topicMatch[1] : null,
      isTopicsIndex: topicsIndex,
    };
  }, [pathname]);

  useEffect(() => {
    if (categorySlug || selectedAppSlug || topicSlug || isTopicsIndex) {
        if(searchTerm) setSearchTerm('');
        if(selectedCategory) setSelectedCategory(null);
    }
  }, [categorySlug, selectedAppSlug, topicSlug, isTopicsIndex, searchTerm, selectedCategory]);

  useEffect(() => {
    if (!categorySlug && !selectedAppSlug && !topicSlug && !isTopicsIndex) {
      const baseTitle = 'iOS & Android Modded Apps – Free Downloads | AppsGU';
      const baseDescription = 'Download free modded apps and tweaks for iPhone, iPad and Android. Safe guides, FAQs and regular updates.';
      const parts: string[] = [];
      if (selectedCategory) parts.push(`${selectedCategory} apps`);
      if (debouncedSearchTerm) parts.push(`search: ${debouncedSearchTerm}`);
      const suffix = parts.length > 0 ? ` – ${parts.join(' | ')}` : '';

      const origin = window.location.origin;
      const canonicalHome = selectedCategory
        ? `${origin}/category/${slugify(selectedCategory)}`
        : `${origin}/`;

      updateMetaTags({
        title: baseTitle + suffix,
        description: baseDescription,
        canonical: canonicalHome,
        robots: debouncedSearchTerm ? 'noindex, follow' : 'index, follow',
      });
      // Homepage FAQ JSON-LD (Programmatic)
      const cleanupHomeJsonLd = () => {
        document.querySelectorAll('script[data-home-jsonld]').forEach(el => el.remove());
      };
      cleanupHomeJsonLd();
      const addHomeJsonLd = (data: object) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-home-jsonld', 'true');
        script.innerHTML = JSON.stringify(data);
        document.head.appendChild(script);
      };
      addHomeJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {"@type":"Question","name":"Are these iOS/Android mods safe?","acceptedAnswer":{"@type":"Answer","text":"We provide guides and safety tips. Use responsibly, especially in online modes."}},
          {"@type":"Question","name":"Do I need jailbreak or root?","acceptedAnswer":{"@type":"Answer","text":"No. Most apps work on standard iOS and Android devices without jailbreak or root."}},
          {"@type":"Question","name":"How do I install?","acceptedAnswer":{"@type":"Answer","text":"Open an app page and tap Download. Follow the quick setup or HowTo steps provided."}}
        ]
      });
    }
  }, [categorySlug, selectedAppSlug, topicSlug, isTopicsIndex, selectedCategory, debouncedSearchTerm]);

  const selectedApp = useMemo(() => {
    if (isLoading) return null;
    return allApps.find(a => a.slug === selectedAppSlug) || null;
  }, [selectedAppSlug, allApps, isLoading]);

  const filteredApps = useMemo<AppInfo[]>(() => {
    if (isLoading) return [];
    let apps = allApps;
    
    if (selectedCategory && selectedCategory !== 'All') {
        apps = apps.filter(app => app.category === selectedCategory);
    }

    const lowercasedFilter = searchTerm.toLowerCase().trim();
    if (lowercasedFilter) {
      apps = apps.filter(app =>
        app.title.toLowerCase().includes(lowercasedFilter) ||
        app.description.toLowerCase().includes(lowercasedFilter)
      );
    }
    return apps;
  }, [searchTerm, selectedCategory, allApps, isLoading]);

  const handleSelectCategory = (category: string) => {
    if (category === 'All') {
      setSelectedCategory(null);
      if (searchTerm) setSearchTerm('');
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        setPathname('/');
      }
      return;
    }
    if (searchTerm) setSearchTerm('');
    const newPath = `/category/${slugify(category)}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
      setPathname(newPath);
    }
  };

  if (categorySlug) {
    return <CategoryPageView categorySlug={categorySlug} allApps={allApps} isLoading={isLoading} />;
  }

  if (isTopicsIndex) {
    return <TopicsIndexView allApps={allApps} />;
  }

  if (topicSlug) {
    return <TopicPageView topicSlug={topicSlug} allApps={allApps} isLoading={isLoading} />;
  }

  if (isDesktop) {
    return (
      <>
        <JsonLdSchema type="website" />
        <JsonLdSchema type="organization" />
        <JsonLdSchema
          type="siteNavigation"
          data={{ items: [
            { name: 'Home', url: `${window.location.origin}/` },
            { name: 'Topics', url: `${window.location.origin}/topic` }
          ] }}
        />
        <JsonLdSchema
          type="itemList"
          data={{
            items: filteredApps.slice(0, 20).map(app => ({
              name: app.title,
              url: `${window.location.origin}/app/${app.slug}`
            }))
          }}
        />
      <div className="min-h-screen text-white flex h-screen overflow-hidden animate-fade-in">
        <aside className="w-full max-w-sm flex-shrink-0 flex flex-col border-r border-zinc-800 bg-[#141414]">
          <Header />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <CategoryFilter categories={categories} selectedCategory={selectedCategory || 'All'} onSelectCategory={handleSelectCategory} />
          <div className="flex-grow overflow-y-auto">
            {isLoading ? (
              <AppListSkeleton isPanel={true} />
            ) : (
              <AppList apps={filteredApps} activeSlug={selectedAppSlug} isPanel={true}/>
            )}
          </div>
        </aside>
        <main className="flex-grow h-full overflow-y-auto">
          {selectedApp ? (
            <AppDetailView app={selectedApp} allApps={allApps} isPanel={true} />
          ) : (
            <div className="flex items-start justify-start h-full">
              <div className="w-full px-6 py-6">
                <h1 className="text-3xl font-black text-white mb-4">Download Free iOS & Android Modded Apps</h1>
                <div className="text-center text-gray-500">
                  <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-arrow-left'} fa-2x mb-4`}></i>
                  <p className="text-xl">{isLoading ? 'Loading Apps...' : 'Select an app to view details'}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      </>
    );
  }

  // Mobile Layout
  if (selectedApp) {
    return <AppDetailView app={selectedApp} allApps={allApps} isPanel={false} />;
  }

  return (
    <>
      <JsonLdSchema type="website" />
      <JsonLdSchema type="organization" />
      <JsonLdSchema
        type="siteNavigation"
        data={{ items: [
          { name: 'Home', url: `${window.location.origin}/` },
          { name: 'Topics', url: `${window.location.origin}/topic` }
        ] }}
      />
      <JsonLdSchema
        type="itemList"
        data={{
          items: filteredApps.slice(0, 20).map(app => ({
            name: app.title,
            url: `${window.location.origin}/app/${app.slug}`
          }))
        }}
      />
    <div className="min-h-screen text-white animate-fade-in">
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-black text-white mt-2 mb-4">Download Free iOS & Android Modded Apps</h1>
      </div>
      <main>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter categories={categories} selectedCategory={selectedCategory || 'All'} onSelectCategory={handleSelectCategory} />
        {isLoading ? (
          <AppListSkeleton isPanel={false} />
        ) : (
          <AppList apps={filteredApps} activeSlug={null} isPanel={false} />
        )}
      </main>
    </div>
    </>
  );
};

export default App;