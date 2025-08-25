import React from 'react';
import type { AppInfo } from '../types';
import AppItem from './AppItem';

interface AppListProps {
  apps: AppInfo[];
  activeSlug: string | null;
}

const AppList: React.FC<AppListProps> = ({ apps, activeSlug }) => {
  return (
    <section className="py-8 lg:p-4">
      <div className="container mx-auto px-4 lg:p-0">
        {apps.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {apps.map((app) => <AppItem key={app.slug} app={app} isActive={app.slug === activeSlug} />)}
          </ul>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No apps found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AppList;
