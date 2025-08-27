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
        {currentAppSlug === 'dreameshort-coins' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/entertainment">Entertainment mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/monopoly-go-plus-plus">Monopoly Go++ – Unlimited Dice & Cash</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/instagram-plus-plus">Instagram++ – Social mod</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'cod-mobile-mod-menu' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">More game mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/pokemon-go-spoofer">Pokemon Go Spoofer</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/roblox-mod">Roblox Mod Menu</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'irecovery' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/utilities">Utilities tools & installers</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/altstore">AltStore – iOS App Installer</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/photos-plus">Photos+ – Media Recovery</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'efootball-2024-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">More football & sports mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/fc-mobile-24-25-mod">FC Mobile 24/25 – Unlimited Points & Gems</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/need-for-speed-no-limits-mod">NFS No Limits – Unlimited Money & Gold</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'fc-mobile-24-25-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Sports & football mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/efootball-2024-mod">eFootball 2024 – Unlimited Coins & GP</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/roblox-mod">Roblox – Mod Menu</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'roblox-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Explore more game mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/cod-mobile-mod-menu">COD Mobile – MOD Menu</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/pokemon-go-spoofer">Pokemon Go Spoofer</a></li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default RelatedApps;
