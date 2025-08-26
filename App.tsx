import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import AppList from './components/AppList';
import AppDetailView from './components/AppDetailView';
import CategoryPageView from './components/CategoryPageView';
import AppListSkeleton from './components/AppListSkeleton';
import { useMediaQuery } from './hooks/useMediaQuery';
import { useDebounce } from './hooks/useDebounce';
import { APPS_DATA } from './constants';
import type { AppInfo } from './types';
import { updateMetaTags } from './utils/seo';
import { slugify } from './utils/slugify';

const getQueryParam = (param: string) => {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get(param) || '';
};

const getCategoryFromUrl = () => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    const categorySlug = params.get('category');
    if (!categorySlug) return null;
    const foundApp = APPS_DATA.find(app => slugify(app.category) === categorySlug);
    return foundApp ? foundApp.category : null;
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
    const scriptId = 'website-schema';
    const existingScript = document.getElementById(scriptId);
    if(existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AppsGU",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    });
    document.head.appendChild(script);
  }, []);

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
    const currentCategorySlug = currentUrl.searchParams.get('category') || '';
    
    const newCategorySlug = selectedCategory ? slugify(selectedCategory) : '';
    let needsUpdate = false;

    if (debouncedSearchTerm !== currentSearch) {
        if (debouncedSearchTerm) {
            currentUrl.searchParams.set('q', debouncedSearchTerm);
        } else {
            currentUrl.searchParams.delete('q');
        }
        needsUpdate = true;
    }

    if (newCategorySlug !== currentCategorySlug) {
        if (newCategorySlug) {
             currentUrl.searchParams.set('category', newCategorySlug);
        } else {
             currentUrl.searchParams.delete('category');
        }
        needsUpdate = true;
    }

    if (needsUpdate) {
      window.history.replaceState({}, '', currentUrl.toString());
    }
  }, [debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.origin === window.location.origin && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && anchor.target !== '_blank') {
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

  const { categorySlug, selectedAppSlug } = useMemo(() => {
    const catMatch = pathname.match(/^\/category\/([a-zA-Z0-9-]+)/);
    const appMatch = pathname.match(/^\/app\/([a-zA-Z0-9-]+)/);
    return {
      categorySlug: catMatch ? catMatch[1] : null,
      selectedAppSlug: appMatch ? appMatch[1] : null,
    };
  }, [pathname]);

  useEffect(() => {
    if (categorySlug || selectedAppSlug) {
        if(searchTerm) setSearchTerm('');
        if(selectedCategory) setSelectedCategory(null);
    }
  }, [categorySlug, selectedAppSlug, searchTerm, selectedCategory]);

  useEffect(() => {
    if (!categorySlug && !selectedAppSlug) {
      updateMetaTags({
        title: 'AppsGU | Third‑Party Tweaks & Mods for iOS & Android',
        description: 'Find third‑party apps, tweaks and emulators for iPhone, iPad and Android. Installation guides, FAQs and safety tips. Updated regularly.',
        canonical: window.location.origin,
      });
    }
  }, [categorySlug, selectedAppSlug]);

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
    setSelectedCategory(category === 'All' ? null : category);
    if (searchTerm) {
        setSearchTerm('');
    }
  };

  if (categorySlug) {
    return <CategoryPageView categorySlug={categorySlug} allApps={allApps} isLoading={isLoading} />;
  }

  if (isDesktop) {
    return (
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
            <AppDetailView app={selectedApp} isPanel={true} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-arrow-left'} fa-2x mb-4`}></i>
                <p className="text-xl">{isLoading ? 'Loading Apps...' : 'Select an app to view details'}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Mobile Layout
  if (selectedApp) {
    return <AppDetailView app={selectedApp} isPanel={false} />;
  }

  return (
    <div className="min-h-screen text-white animate-fade-in">
      <Header />
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
  );
};

export default App;