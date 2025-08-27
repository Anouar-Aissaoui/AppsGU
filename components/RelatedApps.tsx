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
        {currentAppSlug === 'altstore' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/utilities">Utilities mods & tools</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/irecovery">iRecovery – Photo/Video Recovery</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/instagram-plus-plus">Instagram++ – Social mod</a></li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default RelatedApps;
