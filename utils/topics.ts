import type { AppInfo } from '../types';
import { slugify } from './slugify';

export interface TopicMeta {
    slug: string;
    name: string;
}

function extractUnlimitedPhrases(text: string): string[] {
    if (!text) return [];
    const matches = text.match(/Unlimited\s+[A-Za-z0-9+&\s]+/g) || [];
    return matches
        .map(m => m.replace(/!+$/, '').trim())
        .map(m => m.replace(/\s{2,}/g, ' '));
}

export function collectTopics(apps: AppInfo[]): TopicMeta[] {
    const topicMap = new Map<string, string>();
    for (const app of apps) {
        const sources = [app.description, app.longDescription];
        for (const source of sources) {
            for (const phrase of extractUnlimitedPhrases(source)) {
                const s = slugify(phrase);
                if (!topicMap.has(s)) topicMap.set(s, phrase);
            }
        }
        const hasModMenu = /mod\s*menu/i.test(app.title) || /mod\s*menu/i.test(app.description) || /mod\s*menu/i.test(app.longDescription);
        if (hasModMenu) {
            topicMap.set('mod-menu', 'Mod Menu');
        }
    }
    return Array.from(topicMap.entries())
        .map(([slug, name]) => ({ slug, name }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function appsForTopic(topicSlug: string, apps: AppInfo[]): AppInfo[] {
    const normalized = topicSlug.toLowerCase();
    const byUnlimited = (app: AppInfo): boolean => {
        const phrases = [app.description, app.longDescription]
            .flatMap(t => extractUnlimitedPhrases(t));
        return phrases.some(p => slugify(p) === normalized);
    };
    const byModMenu = (app: AppInfo): boolean => /mod\s*menu/i.test(app.title) || /mod\s*menu/i.test(app.description) || /mod\s*menu/i.test(app.longDescription);

    if (normalized === 'mod-menu') {
        return apps.filter(byModMenu);
    }
    return apps.filter(byUnlimited);
}

