import React, { useEffect } from 'react';
import type { AppInfo } from '../types';
import { slugify } from '../utils/slugify';
import { updateMetaTags } from '../utils/seo';
import ShareButtons from './ShareButtons';
import RelatedApps from './RelatedApps';

// SEO Component for managing head tags and structured data
const SeoHead: React.FC<{ app: AppInfo }> = ({ app }) => {
    useEffect(() => {
        const baseUrl = window.location.origin;
        const canonicalUrl = `${baseUrl}/app/${app.slug}`;
        const year = new Date().getFullYear();

        // Helper to generate a more accurate name for SEO, avoiding redundancy
        const getAppSeoName = (title: string): string => {
            const lowerTitle = title.toLowerCase();
            const keywords = ['mod', 'menu', '++', 'spoofer', 'hack', 'cheat', 'tweak'];
            if (keywords.some(keyword => lowerTitle.includes(keyword))) {
                return title; // Already contains a keyword, return as is
            }
            // More specific keywords based on category
            if (app.category === 'Games') return `${title} Mod Menu`;
            if (app.category === 'Social') {
                if (app.slug === 'discord-nitro-free') return `${title}`;
                return `${title}++`;
            }
            if (app.category === 'Utilities') return `${title}`;
            if (app.category === 'Entertainment') return `${title}`;
            return `${title}`; // Default fallback
        };
        const appSeoName = getAppSeoName(app.title);

        updateMetaTags({
            title: `${appSeoName} v${app.version} – Free Download | AppsGU`,
            description: `Download ${appSeoName} v${app.version} for iOS & Android. ${app.description}`,
            canonical: canonicalUrl,
            ogType: 'article',
            ogImage: app.img,
        });

        // JSON-LD Structured Data
        const cleanupJsonLd = () => {
            document.querySelectorAll('script[data-app-detail-jsonld]').forEach(el => el.remove());
        };

        const addJsonLd = (data: object) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-app-detail-jsonld', 'true');
            script.innerHTML = JSON.stringify(data);
            document.head.appendChild(script);
        };
        
        cleanupJsonLd(); // Clean up from previous render

        // SoftwareApplication Schema
        addJsonLd({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": app.title,
            "description": app.longDescription,
            "applicationCategory": app.category + "Application",
            "operatingSystem": "iOS, Android",
            "softwareVersion": app.version,
            "publisher": { "@type": "Organization", "name": "AppsGU" },
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "downloadUrl": canonicalUrl,
            "screenshot": app.img,
            "image": [app.img]
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

        // HowTo Schema (Programmatic SEO) for AltStore
        if (app.slug === 'altstore') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Install AltStore on iPhone/iPad (Windows & macOS)",
                "totalTime": "PT10M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "supply": [
                    { "@type": "HowToSupply", "name": "iPhone or iPad" },
                    { "@type": "HowToSupply", "name": "Lightning/USB‑C cable" }
                ],
                "tool": [
                    { "@type": "HowToTool", "name": "AltServer (Windows/macOS)" }
                ],
                "step": [
                    { "@type": "HowToStep", "name": "Install AltServer", "text": "Download and install AltServer on your Windows PC or Mac." },
                    { "@type": "HowToStep", "name": "Connect your device", "text": "Connect your iPhone/iPad via USB and trust the computer when prompted." },
                    { "@type": "HowToStep", "name": "Install AltStore", "text": "Open AltServer and choose Install AltStore, then select your device." },
                    { "@type": "HowToStep", "name": "Sign in with Apple ID", "text": "Enter your Apple ID (free account works) to sign the app." },
                    { "@type": "HowToStep", "name": "Trust the certificate", "text": "On your device: Settings → General → Device Management → Trust your Apple ID." },
                    { "@type": "HowToStep", "name": "Launch AltStore", "text": "Open AltStore on your device and start sideloading .ipa files." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for DreameShort Coins
        if (app.slug === 'dreameshort-coins') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate DreameShort Coins (iOS & Android)",
                "totalTime": "PT3M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Download Plugin", "text": "Tap Download and follow the on-screen instructions." },
                    { "@type": "HowToStep", "name": "Open DreameShort", "text": "Sign in to your account to sync." },
                    { "@type": "HowToStep", "name": "Enjoy Coins & Bonuses", "text": "Coins and daily bonuses apply automatically after activation." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for COD Mobile MOD Menu
        if (app.slug === 'cod-mobile-mod-menu') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Use COD Mobile MOD Menu (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install the MOD", "text": "Download and install the COD Mobile MOD Menu." },
                    { "@type": "HowToStep", "name": "Open COD Mobile", "text": "Launch the game; a floating icon appears." },
                    { "@type": "HowToStep", "name": "Toggle Features", "text": "Tap the icon to enable Aimbot, Wallhack, No Recoil, and SuperJump." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for eFootball 2024
        if (app.slug === 'efootball-2024-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate eFootball 2024 Mod (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install the Mod", "text": "Download eFootball 2024 Mod and install it on your device." },
                    { "@type": "HowToStep", "name": "Open the Game", "text": "Launch eFootball; resources sync to your account." },
                    { "@type": "HowToStep", "name": "Build Your Squad", "text": "Use Coins & GP to sign players and unlock VIP features." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for FC Mobile 24/25
        if (app.slug === 'fc-mobile-24-25-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate FC Mobile 24/25 Plugin (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Plugin", "text": "Download and install the FC Mobile plugin." },
                    { "@type": "HowToStep", "name": "Sign In", "text": "Open FC Mobile and sign in to your account." },
                    { "@type": "HowToStep", "name": "Use Resources", "text": "Points & Gems apply automatically for pack openings." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Roblox Mod Menu
        if (app.slug === 'roblox-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Use Roblox Mod Menu (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod Menu", "text": "Download and install the Roblox Mod Menu." },
                    { "@type": "HowToStep", "name": "Open Roblox", "text": "Launch Roblox; a floating icon appears on screen." },
                    { "@type": "HowToStep", "name": "Enable Features", "text": "Tap the icon to toggle Fly, God Mode, Super Jump, and Speed." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Instagram++
        if (app.slug === 'instagram-plus-plus') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Install and Use Instagram++ (iOS & Android)",
                "totalTime": "PT3M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Uninstall Stock App", "text": "Remove the official Instagram app to avoid conflicts." },
                    { "@type": "HowToStep", "name": "Install Instagram++", "text": "Download and install Instagram++ on your device." },
                    { "@type": "HowToStep", "name": "Enable Features", "text": "Open settings in Instagram++ to enable downloads and anonymous viewing." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Discord Nitro
        if (app.slug === 'discord-nitro-free') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Enable Discord Nitro Perks for Free",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Tool", "text": "Download and install the Discord Nitro tool." },
                    { "@type": "HowToStep", "name": "Sign In", "text": "Open Discord and sign in to your account." },
                    { "@type": "HowToStep", "name": "Use Perks", "text": "Enjoy Nitro emojis, HD streaming, and higher uploads while the client is active." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Pokemon Go Spoofer
        if (app.slug === 'pokemon-go-spoofer') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Use Pokemon Go Spoofer Safely (iOS & Android)",
                "totalTime": "PT3M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Spoofer", "text": "Download and install the Pokemon Go Spoofer on your device." },
                    { "@type": "HowToStep", "name": "Teleport & Wait", "text": "Teleport to the target location, then respect cooldown before any action." },
                    { "@type": "HowToStep", "name": "Use Joystick & Auto-Catch", "text": "Navigate with the joystick and enable auto-catch as needed." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Monopoly Go++
        if (app.slug === 'monopoly-go-plus-plus') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Monopoly Go++ (Unlimited Dice & Cash)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Monopoly Go++", "text": "Download and install Monopoly Go++ on your device." },
                    { "@type": "HowToStep", "name": "Launch the Game", "text": "Open Monopoly Go; resources sync automatically." },
                    { "@type": "HowToStep", "name": "Build Faster", "text": "Use unlimited dice and cash to progress quickly." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Match Masters Mod
        if (app.slug === 'match-masters-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Match Masters Mod (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install the Match Masters Mod on your device." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch Match Masters; resources will sync automatically." },
                    { "@type": "HowToStep", "name": "Use Boosters", "text": "Enjoy unlimited coins and boosters to progress faster." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for N.O.V.A. Legacy Mod
        if (app.slug === 'nova-legacy-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate N.O.V.A. Legacy Mod (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install the Mod", "text": "Download and install N.O.V.A. Legacy Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch N.O.V.A. Legacy; resources sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Gear", "text": "Use Money & Trilithium to upgrade weapons and armor." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Forge of Empires Mod
        if (app.slug === 'forge-of-empires-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Forge of Empires Mod (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Forge of Empires Mod." },
                    { "@type": "HowToStep", "name": "Open City", "text": "Launch FoE; diamonds and supplies sync automatically." },
                    { "@type": "HowToStep", "name": "Expand & Research", "text": "Use resources to expand, research and dominate events." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for CarX Street Mod
        if (app.slug === 'carx-street-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate CarX Street Mod (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install CarX Street Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch CarX Street; money syncs automatically." },
                    { "@type": "HowToStep", "name": "Upgrade & Tune", "text": "Customize builds and upgrades without limits." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Null's Brawl
        if (app.slug === 'nulls-brawl') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Install Null's Brawl (Private Server)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install App", "text": "Download and install Null's Brawl on your device." },
                    { "@type": "HowToStep", "name": "Create Profile", "text": "Open the app and set up your profile on the private server." },
                    { "@type": "HowToStep", "name": "Play", "text": "Enjoy boosted progression and custom features." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Mortal Kombat Mod
        if (app.slug === 'mortal-kombat-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Mortal Kombat Mod (iOS & Android)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install the Mortal Kombat Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch MK Mobile; souls and coins sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Roster", "text": "Use resources to unlock and upgrade fighters." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Loot Boy Mod
        if (app.slug === 'loot-boy-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Loot Boy Mod (Unlimited Diamonds, Tickets & Coins)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Loot Boy Mod on your device." },
                    { "@type": "HowToStep", "name": "Open Loot Boy", "text": "Launch the app; resources sync automatically." },
                    { "@type": "HowToStep", "name": "Open Packs", "text": "Use diamonds and tickets to unlock premium packs." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Bus Simulator: Ultimate Mod
        if (app.slug === 'bus-simulator-ultimate-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Bus Simulator: Ultimate Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Bus Simulator: Ultimate Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; money and gold sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Fleet", "text": "Buy buses and upgrades without limits." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Race Master 3D Mod
        if (app.slug === 'race-master-3d-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Race Master 3D Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Race Master 3D Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; money, nitro and shields sync automatically." },
                    { "@type": "HowToStep", "name": "Race", "text": "Use unlimited boosts to clear levels quickly." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for FR Legends Mod
        if (app.slug === 'fr-legends-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate FR Legends Mod (Unlimited Money)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install FR Legends Mod", "text": "Download and install FR Legends Mod on your device." },
                    { "@type": "HowToStep", "name": "Open the Game", "text": "Launch FR Legends; unlimited money will be available automatically." },
                    { "@type": "HowToStep", "name": "Upgrade & Tune", "text": "Buy cars, upgrades and tune settings for higher drift scores." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Dungeon Hunter 5 Mod
        if (app.slug === 'dungeon-hunter-5-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Dungeon Hunter 5 Mod (Unlimited Gems)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Dungeon Hunter 5 Mod on your device." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch DH5; gems will sync automatically to your account." },
                    { "@type": "HowToStep", "name": "Craft & Upgrade", "text": "Use gems to craft gear, upgrade skills and progress faster." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Looney Tunes™ World of Mayhem Mod
        if (app.slug === 'looney-tunes-world-of-mayhem-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Looney Tunes World of Mayhem Mod (Unlimited Gems & Gold)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Looney Tunes World of Mayhem Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; gems and gold will sync automatically." },
                    { "@type": "HowToStep", "name": "Build Your Squad", "text": "Use resources to unlock toons, upgrade abilities and battle." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Need for Speed™ No Limits Mod
        if (app.slug === 'need-for-speed-no-limits-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate NFS No Limits Mod (Unlimited Money & Gold)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Need for Speed No Limits Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch NFS No Limits; money and gold sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Garage", "text": "Buy cars, tune parts and dominate events." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Ice Age Adventures Mod
        if (app.slug === 'ice-age-adventures-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Ice Age Adventures Mod (Unlimited Acorns)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Ice Age Adventures Mod on your device." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; acorns will be available automatically." },
                    { "@type": "HowToStep", "name": "Rescue & Build", "text": "Use acorns to rescue friends, build camps and progress events." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Score! Hero 2022 Mod
        if (app.slug === 'score-hero-2022-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Score! Hero 2022 Mod (Unlimited Money)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Score! Hero 2022 Mod on your device." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch Score! Hero; money will be available automatically." },
                    { "@type": "HowToStep", "name": "Train & Progress", "text": "Use resources to train, unlock levels and progress your career." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Ninja Turtles: Legends Mod
        if (app.slug === 'ninja-turtles-legends-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Ninja Turtles: Legends Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Ninja Turtles: Legends Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; greenbacks and resources sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Heroes", "text": "Use resources to upgrade and progress through campaigns." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Guns of Boom Mod
        if (app.slug === 'guns-of-boom-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Guns of Boom Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Guns of Boom Mod on your device." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch GoB; money and gold sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Gear", "text": "Buy weapons and armor instantly with resources." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Mini World Mod
        if (app.slug === 'mini-world-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Mini World Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Mini World Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch Mini World; coins sync automatically." },
                    { "@type": "HowToStep", "name": "Unlock Skins", "text": "Use coins to unlock skins and items." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Blockman GO Mod
        if (app.slug === 'blockman-go-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Blockman GO Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Blockman GO Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch Blockman GO; GCubes and coins sync automatically." },
                    { "@type": "HowToStep", "name": "Enjoy Premium", "text": "Use resources to unlock premium features and items." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Dead by Daylight Mod
        if (app.slug === 'dead-by-daylight-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Dead by Daylight Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Dead by Daylight Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch DbD; auric cells and resources sync automatically." },
                    { "@type": "HowToStep", "name": "Customize", "text": "Unlock cosmetics and upgrades using resources." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for The Sims™ Mod
        if (app.slug === 'the-sims-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate The Sims™ Mod (Unlimited Money & SimCash)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install The Sims™ Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch The Sims Mobile; money & SimCash sync automatically." },
                    { "@type": "HowToStep", "name": "Build & Design", "text": "Create and upgrade your dream home with unlimited resources." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for LOL: Wild Rift Mod
        if (app.slug === 'lol-wild-rift-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate LOL: Wild Rift Mod (Unlimited Wild Cores)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Wild Rift Mod on your device." },
                    { "@type": "HowToStep", "name": "Open Wild Rift", "text": "Launch the game; Wild Cores sync automatically." },
                    { "@type": "HowToStep", "name": "Unlock Skins", "text": "Use cores to unlock skins and passes." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for PUBG Mobile Mod
        if (app.slug === 'pubg-mobile-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate PUBG Mobile Mod (Unlimited UC & Money)",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install PUBG Mobile Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch PUBG Mobile; UC and money sync automatically." },
                    { "@type": "HowToStep", "name": "Customize", "text": "Use resources to unlock skins and passes." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Last Day on Earth: Survival Mod
        if (app.slug === 'last-day-on-earth-survival-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Last Day on Earth: Survival Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install LDoE Survival Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; coins and gold sync automatically." },
                    { "@type": "HowToStep", "name": "Craft & Build", "text": "Use resources to craft gear and build your base." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for TeamFight Tactics Mod
        if (app.slug === 'teamfight-tactics-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate TeamFight Tactics Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install TeamFight Tactics Mod." },
                    { "@type": "HowToStep", "name": "Open TFT", "text": "Launch the game; coins and star fragments sync automatically." },
                    { "@type": "HowToStep", "name": "Customize", "text": "Unlock cosmetics and passes using resources." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Jetpack Joyride Mod
        if (app.slug === 'jetpack-joyride-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Jetpack Joyride Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Jetpack Joyride Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; coins sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Gear", "text": "Use coins to upgrade jetpacks, gadgets, and vehicles." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Baseball 9 Mod
        if (app.slug === 'baseball-9-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Baseball 9 Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Baseball 9 Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch Baseball 9; money and gems sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Team", "text": "Use resources to sign players and upgrade stats." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Photos+
        if (app.slug === 'photos-plus') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Recover Deleted Photos/Videos with Photos+",
                "totalTime": "PT3M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Photos+", "text": "Download and open Photos+ on your device." },
                    { "@type": "HowToStep", "name": "Choose Scan Type", "text": "Select quick or deep scan depending on when files were deleted." },
                    { "@type": "HowToStep", "name": "Preview & Restore", "text": "Select the files you want to recover and tap Restore." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Harry Potter: Puzzles & Spells Mod
        if (app.slug === 'harry-potter-puzzles-and-spells-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Harry Potter: Puzzles & Spells Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install HP: Puzzles & Spells Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; gold syncs automatically." },
                    { "@type": "HowToStep", "name": "Boost Levels", "text": "Use gold to unlock boosts and progress faster." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Injustice 2 Mod
        if (app.slug === 'injustice-2-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Injustice 2 Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Injustice 2 Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch Injustice 2; gems and credits sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Heroes", "text": "Use resources to unlock and upgrade characters." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for King of Thieves Mod
        if (app.slug === 'king-of-thieves-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate King of Thieves Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install King of Thieves Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; orbs and gold sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Dungeon", "text": "Use resources to upgrade dungeons and gear." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Monster Legends Mod
        if (app.slug === 'monster-legends-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Monster Legends Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Monster Legends Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; gems and gold sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Monsters", "text": "Use resources to level up monsters and craft runes." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Scrabble GO Mod
        if (app.slug === 'scrabble-go-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Scrabble GO Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Scrabble GO Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch Scrabble GO; gems sync automatically." },
                    { "@type": "HowToStep", "name": "Unlock Themes", "text": "Use gems to unlock themes and bonuses." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for State of Survival Mod
        if (app.slug === 'state-of-survival-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate State of Survival Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install State of Survival Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch SoS; biocaps and resources sync automatically." },
                    { "@type": "HowToStep", "name": "Build Faster", "text": "Use resources to build, research, and expand your settlement." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Hungry Shark Evolution Mod
        if (app.slug === 'hungry-shark-evolution-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Hungry Shark Evolution Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Hungry Shark Evolution Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; gems and coins sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Sharks", "text": "Use resources to upgrade sharks and accessories." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Soul Knight Mod
        if (app.slug === 'soul-knight-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Soul Knight Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Soul Knight Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; gems sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Characters", "text": "Use gems to upgrade characters and gear." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for Criminal Case Mod
        if (app.slug === 'criminal-case-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate Criminal Case Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install Criminal Case Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch the game; money syncs automatically." },
                    { "@type": "HowToStep", "name": "Solve Faster", "text": "Use resources to unlock hints and speed through cases." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for FRAG Pro Shooter Mod
        if (app.slug === 'frag-pro-shooter-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate FRAG Pro Shooter Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install FRAG Pro Shooter Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch FRAG; diamonds and coins sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Squad", "text": "Use resources to unlock and upgrade characters." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for DC Legends Mod
        if (app.slug === 'dc-legends-mod') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Activate DC Legends Mod",
                "totalTime": "PT2M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install Mod", "text": "Download and install DC Legends Mod." },
                    { "@type": "HowToStep", "name": "Open Game", "text": "Launch DC Legends; gems and energy sync automatically." },
                    { "@type": "HowToStep", "name": "Upgrade Team", "text": "Use resources to unlock and upgrade heroes." }
                ]
            });
        }

        // HowTo Schema (Programmatic SEO) for iRecovery
        if (app.slug === 'irecovery') {
            addJsonLd({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "How to Recover Deleted Photos/Videos with iRecovery",
                "totalTime": "PT5M",
                "estimatedCost": { "@type": "MonetaryAmount", "currency": "USD", "value": "0" },
                "step": [
                    { "@type": "HowToStep", "name": "Install iRecovery", "text": "Download and open iRecovery on your device." },
                    { "@type": "HowToStep", "name": "Choose Scan Type", "text": "Select quick or deep scan based on how long ago files were deleted." },
                    { "@type": "HowToStep", "name": "Preview & Restore", "text": "Preview found photos/videos and tap Restore to recover them." }
                ]
            });
        }

        return cleanupJsonLd;
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
  allApps: AppInfo[];
  isPanel: boolean;
}

const AppDetailView: React.FC<AppDetailViewProps> = ({ app, allApps, isPanel }) => {
  const computedDownloadUrl = React.useMemo(() => {
    const isTapTweak = (app.author || '').toLowerCase() === 'taptweak';
    if (!isTapTweak) return undefined;
    return `https://realuserchecker.com/?app=${encodeURIComponent(app.title)}&dev=TapTweak.com`;
  }, [app]);
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
                      alt={`Hero image – ${app.title} ${app.category} Mod v${app.version} for iOS & Android`}
                      title={`${app.title} Mod v${app.version} – iOS & Android Download`}
                      width={160}
                      height={160}
                      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-3xl shadow-lg flex-shrink-0"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      sizes="(min-width: 768px) 160px, 128px"
                  />
                  <div className="flex-grow">
                      <div className="text-sm font-bold text-[#00ff88] uppercase tracking-wider">{app.author}</div>
                      <h1 className="text-4xl md:text-5xl font-black text-white my-1">{
                        app.slug === 'altstore' ? 'AltStore – iOS App Installer' :
                        app.slug === 'dreameshort-coins' ? 'DreameShort Coins – Unlimited Coins & Bonuses' :
                        app.slug === 'cod-mobile-mod-menu' ? 'COD Mobile MOD Menu – Aimbot & Wallhack' :
                        app.slug === 'irecovery' ? 'iRecovery – Recover Deleted Photos & Videos' :
                        app.slug === 'efootball-2024-mod' ? 'eFootball 2024 – Unlimited Coins & GP' :
                        app.slug === 'fc-mobile-24-25-mod' ? 'FC Mobile 24/25 – Unlimited Points & Gems' :
                        app.slug === 'roblox-mod' ? 'Roblox Mod Menu – Fly, God Mode & Speed' :
                        app.slug === 'instagram-plus-plus' ? 'Instagram++ – Download Media & View Stories Anonymously' :
                        app.slug === 'discord-nitro-free' ? 'Discord Nitro – Free Emojis, HD Streaming & Uploads' :
                        app.slug === 'pokemon-go-spoofer' ? 'Pokemon Go Spoofer – Teleport, Joystick & Auto-Catch' :
                        app.slug === 'monopoly-go-plus-plus' ? 'Monopoly Go++ – Unlimited Dice & Cash' :
                        app.slug === 'match-masters-mod' ? 'Match Masters Mod – Unlimited Coins & Boosters' :
                        app.slug === 'nova-legacy-mod' ? 'N.O.V.A. Legacy Mod – Unlimited Money & Trilithium' :
                        app.slug === 'forge-of-empires-mod' ? 'Forge of Empires Mod – Unlimited Diamonds & Supplies' :
                        app.slug === 'carx-street-mod' ? 'CarX Street Mod – Unlimited Money & Upgrades' :
                        app.slug === 'nulls-brawl' ? "Null's Brawl – Private Server (Easy Install)" :
                        app.slug === 'mortal-kombat-mod' ? 'Mortal Kombat Mod – Unlimited Souls & Coins' :
                        app.slug === 'loot-boy-mod' ? 'Loot Boy Mod – Unlimited Diamonds, Tickets & Coins' :
                        app.slug === 'bus-simulator-ultimate-mod' ? 'Bus Simulator: Ultimate Mod – Unlimited Money & Gold' :
                        app.slug === 'race-master-3d-mod' ? 'Race Master 3D Mod – Unlimited Money, Nitro & Shields' :
                        app.slug === 'ninja-turtles-legends-mod' ? 'Ninja Turtles: Legends Mod – Unlimited Greenbacks' :
                        app.slug === 'guns-of-boom-mod' ? 'Guns of Boom Mod – Unlimited Money & Gold' :
                        app.slug === 'mini-world-mod' ? 'Mini World Mod – Unlimited Coins & Skins' :
                        app.slug === 'blockman-go-mod' ? 'Blockman GO Mod – Unlimited GCubes & Coins' :
                        app.slug === 'dead-by-daylight-mod' ? 'Dead by Daylight Mod – Unlimited Auric Cells' :
                        app.slug === 'the-sims-mod' ? 'The Sims™ Mod – Unlimited Money & SimCash' :
                        app.slug === 'lol-wild-rift-mod' ? 'LOL: Wild Rift Mod – Unlimited Wild Cores' :
                        app.slug === 'pubg-mobile-mod' ? 'PUBG Mobile Mod – Unlimited UC & Money' :
                        app.slug === 'last-day-on-earth-survival-mod' ? 'Last Day on Earth: Survival Mod – Unlimited Coins & Gold' :
                        app.slug === 'teamfight-tactics-mod' ? 'TeamFight Tactics Mod – Unlimited Coins & Star Fragments' :
                        app.slug === 'jetpack-joyride-mod' ? 'Jetpack Joyride Mod – Unlimited Coins' :
                        app.slug === 'baseball-9-mod' ? 'Baseball 9 Mod – Unlimited Money & Gems' :
                        app.slug === 'photos-plus' ? 'Photos+ – Recover Deleted Photos & Videos' :
                        app.slug === 'harry-potter-puzzles-and-spells-mod' ? 'Harry Potter: Puzzles & Spells Mod – Unlimited Gold' :
                        app.slug === 'injustice-2-mod' ? 'Injustice 2 Mod – Unlimited Gems & Credits' :
                        app.slug === 'king-of-thieves-mod' ? 'King of Thieves Mod – Unlimited Orbs & Gold' :
                        app.slug === 'monster-legends-mod' ? 'Monster Legends Mod – Unlimited Gems & Gold' :
                        app.slug === 'scrabble-go-mod' ? 'Scrabble GO Mod – Unlimited Gems' :
                        app.slug === 'state-of-survival-mod' ? 'State of Survival Mod – Unlimited Biocaps & Resources' :
                        app.slug === 'hungry-shark-evolution-mod' ? 'Hungry Shark Evolution Mod – Unlimited Gems & Coins' :
                        app.slug === 'soul-knight-mod' ? 'Soul Knight Mod – Unlimited Gems' :
                        app.slug === 'criminal-case-mod' ? 'Criminal Case Mod – Unlimited Money' :
                        app.slug === 'frag-pro-shooter-mod' ? 'FRAG Pro Shooter Mod – Unlimited Diamonds & Coins' :
                        app.slug === 'fr-legends-mod' ? 'FR Legends Mod – Unlimited Money & Drift Upgrades' :
                        app.slug === 'dc-legends-mod' ? 'DC Legends Mod – Unlimited Gems & Energy' :
                        app.slug === 'dungeon-hunter-5-mod' ? 'Dungeon Hunter 5 Mod – Unlimited Gems & Gear' :
                        app.slug === 'looney-tunes-world-of-mayhem-mod' ? 'Looney Tunes™ World of Mayhem Mod – Unlimited Gems & Gold' :
                        app.slug === 'need-for-speed-no-limits-mod' ? 'NFS No Limits Mod – Unlimited Money & Gold' :
                        app.slug === 'ice-age-adventures-mod' ? 'Ice Age Adventures Mod – Unlimited Acorns' :
                        app.slug === 'score-hero-2022-mod' ? 'Score! Hero 2022 Mod – Unlimited Money' :
                        app.title
                      }</h1>
                      <div className="flex items-center gap-x-4 gap-y-1 text-gray-400 text-sm mb-4 flex-wrap">
                          <span>Version: {app.version}</span>
                          <span className="hidden sm:inline">|</span>
                          <span>Size: {app.size}</span>
                           <span className="hidden sm:inline">|</span>
                           <a href={`/category/${slugify(app.category)}`} className="hover:text-[#00ff88] hover:underline">Category: {app.category}</a>
                      </div>
                      <p className="text-base text-gray-300 mb-6">{app.description}</p>
                      <button 
                          data-c-l-url={computedDownloadUrl}
                          onClick={() => {
                              const anyWindow = window as any;
                              if (typeof anyWindow.call_locker === 'function') {
                                  try { anyWindow.call_locker(); return; } catch {}
                              }
                              if (computedDownloadUrl) {
                                  window.location.href = computedDownloadUrl;
                              }
                          }}
                          className="bg-[#00ff88] text-zinc-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all duration-300 transform hover:scale-105">
                          DOWNLOAD NOW
                      </button>
                      <ShareButtons app={app} />
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
            <RelatedApps currentAppSlug={app.slug} category={app.category} allApps={allApps} />
          </div>
      </div>
    </>
  );
}

export default AppDetailView;