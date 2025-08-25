import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AppList from './components/AppList';
import AppDetailView from './components/AppDetailView';
import { useMediaQuery } from './hooks/useMediaQuery';
import { APPS_DATA } from './constants';
import type { AppInfo } from './types';

const App: React.FC = () => {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.origin === window.location.origin && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && anchor.target !== '_blank') {
        event.preventDefault();
        const newPath = anchor.pathname + anchor.search + anchor.hash;
        if (newPath !== window.location.pathname) {
          window.history.pushState({}, '', newPath);
          setPathname(newPath);
           if (!isDesktop || !newPath.startsWith('/app/')) {
                window.scrollTo(0, 0);
           }
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [isDesktop]);

  const selectedAppSlug = useMemo(() => {
    const match = pathname.match(/^\/app\/([a-zA-Z0-9-]+)/);
    return match ? match[1] : null;
  }, [pathname]);


  const selectedApp = useMemo(() => {
    return APPS_DATA.find(a => a.slug === selectedAppSlug) || null;
  }, [selectedAppSlug]);

  const filteredApps = useMemo<AppInfo[]>(() => {
    if (!searchTerm.trim()) {
      return APPS_DATA;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return APPS_DATA.filter(app =>
      app.title.toLowerCase().includes(lowercasedFilter) ||
      app.description.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm]);

  if (isDesktop) {
    return (
      <div className="min-h-screen text-white flex h-screen overflow-hidden">
        <aside className="w-full max-w-sm flex-shrink-0 flex flex-col border-r border-zinc-800 bg-[#141414]">
          <Header />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex-grow overflow-y-auto">
            <AppList apps={filteredApps} activeSlug={selectedAppSlug} />
          </div>
        </aside>
        <main className="flex-grow h-full overflow-y-auto">
          {selectedApp ? (
            <AppDetailView app={selectedApp} isPanel={true} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <i className="fas fa-arrow-left fa-2x mb-4"></i>
                <p className="text-xl">Select an app to view details</p>
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
    <div className="min-h-screen text-white">
      <Header />
      <main>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <AppList apps={filteredApps} activeSlug={null} />
      </main>
    </div>
  );
};

export default App;