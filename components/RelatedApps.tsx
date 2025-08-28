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
        {currentAppSlug === 'instagram-plus-plus' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/social">More social app tweaks</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/discord-nitro-free">Discord Nitro – Free Features</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/altstore">AltStore – iOS App Installer</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'discord-nitro-free' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/social">Explore more social tools</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/instagram-plus-plus">Instagram++ – Tweaked Client</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/altstore">AltStore – iOS App Installer</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'pokemon-go-spoofer' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">More AR & location tools</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/cod-mobile-mod-menu">COD Mobile – MOD Menu</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/roblox-mod">Roblox – Mod Menu</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'monopoly-go-plus-plus' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">More casual & board game mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/match-masters-mod">Match Masters – Unlimited Coins</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/looney-tunes-world-of-mayhem-mod">Looney Tunes – Unlimited Gems & Gold</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'match-masters-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Match-3 & casual game mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/monopoly-go-plus-plus">Monopoly Go++ – Unlimited Dice & Cash</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/harry-potter-puzzles-and-spells-mod">Harry Potter: Puzzles & Spells – Unlimited Gold</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'nova-legacy-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">More sci‑fi shooter mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/cod-mobile-mod-menu">COD Mobile – MOD Menu</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/frag-pro-shooter-mod">FRAG Pro Shooter – Unlimited Diamonds & Coins</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'forge-of-empires-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">City builder & strategy mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/top-war-mod">Top War – Unlimited Diamonds & Coins</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/war-and-order-mod">War and Order – Unlimited Gems & Coins</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'carx-street-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Racing & driving mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/need-for-speed-no-limits-mod">NFS No Limits – Unlimited Money & Gold</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/race-master-3d-mod">Race Master 3D – Unlimited Money & Nitro</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'nulls-brawl' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">More multiplayer & action mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/roblox-mod">Roblox – Mod Menu</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/frag-pro-shooter-mod">FRAG Pro Shooter – Unlimited Diamonds & Coins</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'mortal-kombat-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Fighting & action mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/injustice-2-mod">Injustice 2 – Unlimited Gems & Credits</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/dc-legends-mod">DC Legends – Unlimited Gems & Energy</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'loot-boy-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Card & loot apps</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/monopoly-go-plus-plus">Monopoly Go++ – Unlimited Dice & Cash</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/scrabble-go-mod">Scrabble GO – Unlimited Gems</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'bus-simulator-ultimate-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Simulation & driving mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/traffic-rider-mod">Traffic Rider – Unlimited Money & Cash</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/carx-street-mod">CarX Street – Unlimited Money</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'race-master-3d-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Racing & arcade mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/need-for-speed-no-limits-mod">NFS No Limits – Unlimited Money & Gold</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/carx-street-mod">CarX Street – Unlimited Money</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'ninja-turtles-legends-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Heroes & campaign mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/harry-potter-puzzles-and-spells-mod">HP: Puzzles & Spells – Unlimited Gold</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/monopoly-go-plus-plus">Monopoly Go++ – Unlimited Dice & Cash</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'guns-of-boom-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Shooter & action mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/cod-mobile-mod-menu">COD Mobile – MOD Menu</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/frag-pro-shooter-mod">FRAG Pro Shooter – Unlimited Diamonds & Coins</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'mini-world-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Sandbox & creative mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/blockman-go-mod">Blockman GO – Unlimited GCubes</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/monopoly-go-plus-plus">Monopoly Go++ – Unlimited Dice & Cash</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'blockman-go-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Creative & sandbox mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/mini-world-mod">Mini World – Unlimited Coins & Skins</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/roblox-mod">Roblox – Mod Menu</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'dead-by-daylight-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Survival & horror mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/mortal-kombat-mod">Mortal Kombat – Unlimited Souls & Coins</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/dc-legends-mod">DC Legends – Unlimited Gems & Energy</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'the-sims-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Life simulation & builder mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/world-chef-mod">World Chef – Unlimited Gems & Gold</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/top-war-mod">Top War – Unlimited Diamonds & Coins</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'lol-wild-rift-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">MOBA & competitive mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/teamfight-tactics-mod">TeamFight Tactics – Unlimited Coins</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/dislyte-mod">Dislyte – Unlimited Crystals & Gold</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'pubg-mobile-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Battle royale & shooter mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/cod-mobile-mod-menu">COD Mobile – MOD Menu</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/infinity-kingdom-mod">Infinity Kingdom – Unlimited Gems</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'last-day-on-earth-survival-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Survival & crafting mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/monster-legends-mod">Monster Legends – Unlimited Gems & Gold</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/top-war-mod">Top War – Unlimited Diamonds & Coins</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'teamfight-tactics-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Strategy & auto‑battler mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/lol-wild-rift-mod">LOL: Wild Rift – Unlimited Wild Cores</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/dislyte-mod">Dislyte – Unlimited Crystals & Gold</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'jetpack-joyride-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Arcade & casual mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/angry-birds-evolution-mod">Angry Birds Evolution – Unlimited Gems</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/harry-potter-puzzles-and-spells-mod">HP: Puzzles & Spells – Unlimited Gold</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'baseball-9-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Sports & baseball mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/efootball-2024-mod">eFootball 2024 – Unlimited Coins & GP</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/fc-mobile-24-25-mod">FC Mobile 24/25 – Unlimited Points & Gems</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'photos-plus' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/utilities">Utilities tools</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/irecovery">iRecovery – Restore deleted media</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/altstore">AltStore – iOS App Installer</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'harry-potter-puzzles-and-spells-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Match‑3 & puzzle mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/match-masters-mod">Match Masters – Unlimited Coins</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/angry-birds-evolution-mod">Angry Birds Evolution – Unlimited Gems</a></li>
            </ul>
          </div>
        )}
        {currentAppSlug === 'injustice-2-mod' && (
          <div className="mt-6 text-sm text-gray-400">
            <p className="mb-2">Helpful links:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><a className="text-[#00ff88] hover:underline" href="/category/games">Fighting & action mods</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/mortal-kombat-mod">Mortal Kombat – Unlimited Souls & Coins</a></li>
              <li><a className="text-[#00ff88] hover:underline" href="/app/dc-legends-mod">DC Legends – Unlimited Gems & Energy</a></li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default RelatedApps;
