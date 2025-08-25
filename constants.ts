import type { AppInfo } from './types';

export const APPS_DATA: AppInfo[] = [
    { 
        slug: "altstore",
        img: "https://i.imgur.com/rq3p0eE.png", 
        author: "Riley Testut", 
        title: "AltStore Guide", 
        description: "An educational guide to AltStore for sideloading apps on iOS without a jailbreak.",
        version: "1.7.1",
        size: "25 MB",
        category: "Utilities",
        lastUpdated: "2024-07-29",
        officialUrl: "https://altstore.io/",
        longDescription: `AltStore provides a method for installing unofficial apps (.ipa files) onto iOS devices. Unlike other methods, it doesn't require a jailbreak. Instead, it uses your own Apple ID to sign applications, which are then treated by iOS as if you developed them yourself.

How it Works:
- **AltServer:** A companion app for macOS and Windows that runs in the background on your computer.
- **App Signing:** AltServer handles the installation and refreshing of apps, re-signing them every seven days to prevent expiration.
- **Wi-Fi Refresh:** As long as your device is on the same Wi-Fi network as AltServer, your apps can refresh automatically.`,
        faqs: [
            { question: "Is AltStore safe to use?", answer: "AltStore is widely considered safe as it's open-source and uses Apple's official development system for app installation. However, the safety of the apps you sideload depends entirely on their source. Only install .ipa files from developers you trust." },
            { question: "Does using AltStore void my device warranty?", answer: "No, using AltStore does not void your Apple warranty because it does not involve jailbreaking or modifying the core operating system." },
            { question: "What are the limitations of a free Apple ID?", answer: "With a standard, free Apple ID, you can sign up to 3 apps at a time, and they must be refreshed every 7 days. A paid Apple Developer account removes most of these limitations." }
        ]
    },
    { 
        slug: "dreameshort-coins-mods-review",
        img: "https://i.imgur.com/qKcgXd2.png", 
        author: "Feature Analysis", 
        title: "DreameShort Coins Mods Review", 
        description: "An analysis of mods claiming to add unlimited coins to the DreameShort app.",
        version: "2.1.0",
        size: "12 MB",
        category: "Entertainment",
        lastUpdated: "2024-07-29",
        officialUrl: "https://play.google.com/store/apps/details?id=com.dreame.shortdrama",
        longDescription: `This is an educational review of third-party modifications for the DreameShort app that claim to provide unlimited coins. These mods often promise to unlock premium content without payment.

Claimed Features:
- Unlocking all VIP stories and episodes.
- Providing a large or unlimited amount of in-app currency (coins).
- Removing advertisements for uninterrupted viewing.

It's important to understand the significant risks associated with such tools. Using them can lead to a permanent ban from the service and may expose your device to malware.`,
        faqs: [
            { question: "Are in-app currency mods safe for my account?", answer: "No, they are generally unsafe. Developers can easily detect unusual currency levels on your account, which violates their Terms of Service and often results in an immediate and permanent ban." },
            { question: "Where do these mods come from?", answer: "These modifications are created by unknown third parties and distributed outside of official app stores. They carry a high risk of containing malware or spyware designed to steal your personal information." }
        ]
    },
    { 
        slug: "cod-mobile-mod-menu-review",
        img: "https://i.imgur.com/HJXUIFC.png", 
        author: "Feature Analysis", 
        title: "COD Mobile MOD Menu Review", 
        description: "An analysis of mod menus for Call of Duty: Mobile and their features.",
        version: "3.5.2",
        size: "98 MB",
        category: "Games",
        lastUpdated: "2024-07-29",
        officialUrl: "https://www.callofduty.com/mobile",
        longDescription: `This review examines third-party mod menus for Call of Duty: Mobile. These tools are designed to give players unfair advantages in gameplay by altering game functions.

Commonly Claimed Features:
- **Aimbot:** Automatically locks the player's aim onto opponents.
- **Wallhack (ESP):** Allows players to see opponents through walls and other obstacles.
- **Increased Mobility:** Features like super jump or speed hacks.

Using such modifications is a direct violation of the game's security and enforcement policy. Activision employs sophisticated anti-cheat systems to detect and penalize offenders.`,
        faqs: [
             { question: "What is the penalty for using mods in COD: Mobile?", answer: "The penalty for using mods or cheats is severe and typically results in a permanent ban of the user's account. Hardware-level (device) bans can also be issued in some cases." },
             { question: "Do 'anti-ban' features in mods actually work?", answer: "No. Claims of 'anti-ban' features are almost always false marketing. Anti-cheat systems are constantly updated, making any bypass temporary at best. The risk of detection and a ban is extremely high." }
        ]
    },
    { 
        slug: "irecovery-guide",
        img: "https://i.imgur.com/MSsLgHs.png", 
        author: "Educational Guide", 
        title: "iRecovery Guide", 
        description: "A guide on data recovery methods for mobile devices.",
        version: "4.0.1",
        size: "30 MB",
        category: "Utilities",
        lastUpdated: "2024-07-29",
        officialUrl: "https://support.apple.com/guide/icloud/restore-or-set-up-your-ios-device-mm908356f67b/icloud",
        longDescription: `This guide provides information on data recovery concepts for mobile devices. When you delete a file, the space it occupies is marked as available, but the data may remain until it's overwritten. Recovery tools scan for this recoverable data.

Recovery Methods:
- **From Device Storage:** Tools scan the internal memory for traces of deleted files. Success is not guaranteed and decreases over time.
- **From Cloud Backups:** The most reliable method. Restoring from an iCloud or Google Drive backup can recover photos, contacts, and more.

For the highest chance of success, always maintain regular backups of your important data using the official cloud services provided by Apple and Google.`,
        faqs: [
            { question: "What is the best way to prevent permanent data loss?", answer: "Regularly backing up your device is the only guaranteed way to prevent data loss. Enable automatic iCloud or Google Drive backups in your device settings." },
            { question: "Can data be recovered after a factory reset?", answer: "No. A factory reset securely erases and encrypts the device's storage, making the original data permanently unrecoverable by consumer-grade tools." }
        ]
    },
    { 
        slug: "efootball-2024-mod-review",
        img: "https://i.imgur.com/jnmtM3E.png", 
        author: "Feature Analysis", 
        title: "eFootball 2024 Mod Review", 
        description: "An analysis of mods claiming to add unlimited GP and coins in eFootball 2024.",
        version: "8.1.0",
        size: "150 MB",
        category: "Games",
        lastUpdated: "2024-07-29",
        officialUrl: "https://www.konami.com/efootball/en/",
        longDescription: `An educational review of third-party mods for eFootball 2024. These mods often claim to provide unlimited in-game resources like GP and eFootball Coins.

Claimed Benefits:
- Unlimited GP to sign players and renew contracts.
- Unlocking legendary players and special packs.
- Free access to premium store items.

Using these mods is against Konami's Terms of Service. In-game currency and player data are stored on secure servers, making client-side modifications easily detectable. Attempting to alter these values can lead to severe account penalties.`,
        faqs: [
            { question: "Is it possible to get unlimited GP in eFootball?", answer: "No, it is not legitimately possible. GP and Coins are server-sided currencies. Any tool claiming to modify them is likely a scam or will result in your account being banned." },
            { question: "What are the risks of downloading eFootball mods?", answer: "The risks include permanent account suspension, loss of all your progress and players, and the potential for malware infection on your device from unofficial download sources." }
        ]
    },
    { 
        slug: "fc-mobile-24-25-mod-review",
        img: "https://i.imgur.com/FcTO2xT.png", 
        author: "Feature Analysis", 
        title: "FC Mobile 24/25 Mod Review", 
        description: "An analysis of mods for EA FC Mobile claiming to offer free FC Points and Gems.",
        version: "1.2.5",
        size: "125 MB",
        category: "Games",
        lastUpdated: "2024-07-29",
        officialUrl: "https://www.ea.com/games/ea-sports-fc/fc-mobile",
        longDescription: `This is an analysis of tools and mods for EA Sports FC Mobile that claim to generate unlimited FC Points and Gems. These premium currencies are used to acquire top players and items in the game.

Stated Features:
- Adding large quantities of FC Points to an account.
- Providing unlimited Gems for use in the store.

EA has a zero-tolerance policy against cheating. FC Points and Gems are managed on EA's secure servers. Any unauthorized attempt to alter these values is a violation of the User Agreement and will be flagged by their anti-cheat systems.`,
        faqs: [
            { question: "Can my FC Mobile account be banned for using mods?", answer: "Yes, absolutely. Using any third-party tool to gain an unfair advantage or alter game data will almost certainly lead to a temporary or permanent ban on your account." }
        ]
    },
    { 
        slug: "roblox-mod-review",
        img: "https://i.imgur.com/ItBBn9z.png", 
        author: "Educational Guide", 
        title: "Roblox Mod & Exploit Guide", 
        description: "An educational guide on how exploits and mod menus work in Roblox.",
        version: "2.605.0",
        size: "105 MB",
        category: "Games",
        lastUpdated: "2024-07-29",
        officialUrl: "https://www.roblox.com/",
        longDescription: `This guide explains how exploits and mod menus function within the Roblox platform. These are external programs that inject scripts into the game client to execute unauthorized functions.

Common Exploit Functions:
- **Player Modifications:** Fly, noclip (walk through walls), god mode (invincibility).
- **Game Manipulation:** Modifying in-game physics or player data.

Using exploits is a serious violation of the Roblox Terms of Use. Roblox uses an anti-cheat system called Byfron to detect and prevent exploitation. Accounts caught using these tools face escalating penalties, including permanent bans.`,
        faqs: [
            { question: "Is it safe to download Roblox exploits?", answer: "No. The vast majority of exploit programs available for download are bundled with malware, keyloggers, or ransomware that can compromise your computer and steal your Roblox account and other personal information." }
        ]
    },
    { 
        slug: "instagram-plus-plus-review",
        img: "https://i.imgur.com/M5mKDJ8.png", 
        author: "Security Analysis", 
        title: "Instagram++ Review", 
        description: "A security and feature analysis of tweaked Instagram clients.",
        version: "20.1",
        size: "88 MB",
        category: "Social",
        lastUpdated: "2024-07-29",
        officialUrl: "https://www.instagram.com/",
        longDescription: `This is a review of tweaked Instagram clients like Instagram++. These are modified versions of the official app that offer features not available in the standard version.

Common Features:
- Downloading photos, videos, and stories.
- Disabling read receipts in direct messages.
- Viewing stories anonymously.

While these features may seem appealing, using a modified social media app presents a significant security risk. You are required to enter your login credentials into an untrusted application, which could lead to your account being compromised or your data being stolen.`,
        faqs: [
            { question: "Is it safe to log into Instagram++ with my account?", answer: "It is extremely unsafe. You are giving your username and password to an unverified, third-party application. There is no guarantee that your credentials are not being stored, sold, or used for malicious purposes." }
        ]
    },
    { 
        slug: "discord-nitro-mods-review",
        img: "https://i.imgur.com/tvz8mmU.jpeg", 
        author: "Security Analysis", 
        title: "Discord Nitro Mods Review", 
        description: "An analysis of client mods that claim to provide free Discord Nitro.",
        version: "N/A",
        size: "5 MB",
        category: "Social",
        lastUpdated: "2024-07-29",
        officialUrl: "https://discord.com/nitro",
        longDescription: `This review covers Discord client modifications that claim to unlock Discord Nitro features for free. These mods work by altering the Discord app on your device to visually enable perks.

How They Work:
- **Client-Side Unlocks:** They trick your local Discord client into displaying custom emojis or animated avatars.
- **No Real Perks:** These changes are only visible to you. Other users will not see your custom emojis, and you do not get server boosts or larger upload sizes, as those are handled by Discord's servers.

Using client mods is a violation of Discord's Terms of Service and can result in your account being disabled. Furthermore, these mods can contain token loggers that steal your account credentials.`,
        faqs: [
            { question: "Can I get real Discord Nitro for free with a mod?", answer: "No. All core Nitro features are validated by Discord's servers. Any mod claiming to give you free Nitro is misleading and likely dangerous to your account's security." }
        ]
    },
    { 
        slug: "pokemon-go-spoofer-review",
        img: "https://i.imgur.com/2X6jMHU.png", 
        author: "Feature Analysis", 
        title: "Pokemon Go Spoofer Review", 
        description: "An educational analysis of location spoofing tools for Pokémon Go.",
        version: "0.275.0",
        size: "115 MB",
        category: "Games",
        lastUpdated: "2024-07-29",
        officialUrl: "https://pokemongolive.com/",
        longDescription: `This is a review of location spoofing applications for Pokémon Go. These tools allow players to virtually change their GPS location, enabling them to play the game from anywhere in the world.

Common Features:
- **Teleport:** Instantly change your location to specific coordinates.
- **Joystick:** A virtual joystick to simulate walking.
- **Auto-Walk:** Automatically follow a pre-defined route.

Niantic, the developer of Pokémon Go, strictly prohibits cheating, including location spoofing. They have a three-strike discipline policy for offenders, which can result in the permanent termination of the player's account.`,
        faqs: [
            { question: "What is the 'three-strike' policy in Pokémon Go?", answer: "It's Niantic's disciplinary system. The first strike is a warning. The second is a temporary suspension (up to 30 days). The third strike results in a permanent account ban." },
            { question: "Are spoofing apps safe to download?", answer: "Many spoofing apps, especially free ones from untrusted sources, can be bundled with malware. Always exercise extreme caution when installing third-party software." }
        ]
    },
     { 
        slug: "monopoly-go-plus-plus-review",
        img: "https://i.imgur.com/ahghT00.jpeg", 
        author: "Feature Analysis", 
        title: "Monopoly Go++ Review", 
        description: "An analysis of mods for Monopoly Go claiming to offer unlimited dice and cash.",
        version: "1.13.0",
        size: "75 MB",
        category: "Games",
        lastUpdated: "2024-07-29",
        officialUrl: "https://www.scopely.com/en/games/monopoly-go",
        longDescription: `An educational review of mods for the game Monopoly Go. These modified versions often claim to give players unlimited resources, such as dice rolls and in-game cash.

Claimed Features:
- Infinite dice rolls, removing the need to wait or pay.
- Unlimited cash for property upgrades.

Dice rolls and cash balances in Monopoly Go are stored and managed on Scopely's game servers. Any attempt to modify these values from the game client is easily detected and considered a violation of the game's terms of service, which can lead to an account ban.`,
        faqs: [
            { question: "Can mods give you unlimited dice in Monopoly Go?", answer: "No, this is not possible. The number of dice you have is a server-sided value. Client mods cannot legitimately change this. Tools that claim to do so are often fake and may be harmful to your device." }
        ]
    }
];
