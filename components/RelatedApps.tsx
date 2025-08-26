import React from 'react';
import type { AppInfo } from '../types';
import AppItem from './AppItem';

interface RelatedAppsProps {
  currentAppSlug: string;
  category: string;
  allApps: AppInfo[];
}

const RelatedApps: React.FC<RelatedAppsProps> = ({ currentAppSlug, category, allApps }) => {
  const relatedApps = allApps
    .filter(app => app.category === category && app.slug !== currentAppSlug)
    .sort(() => 0.5 - Math.random()) // Simple shuffle to show different apps on reload
    .slice(0, 3);

  if (relatedApps.length === 0) {
    return null;
  }

  return (
    <>
      <hr className="border-zinc-700 my-8" />
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Related Apps in {category}</h2>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {relatedApps.map(app => (
            <AppItem key={app.slug} app={app} isActive={false} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default RelatedApps;
