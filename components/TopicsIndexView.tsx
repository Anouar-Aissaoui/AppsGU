import React, { useEffect, useMemo } from 'react';
import Header from './Header';
import JsonLdSchema from './JsonLdSchema';
import { collectTopics } from '../utils/topics';
import type { AppInfo } from '../types';
import { updateMetaTags } from '../utils/seo';

interface TopicsIndexViewProps {
    allApps: AppInfo[];
}

const TopicsIndexView: React.FC<TopicsIndexViewProps> = ({ allApps }) => {
    const topics = useMemo(() => collectTopics(allApps), [allApps]);

    useEffect(() => {
        const baseUrl = window.location.origin;
        updateMetaTags({
            title: 'Topics – Popular Mod Features | AppsGU',
            description: 'Browse topics like Unlimited Coins, Unlimited Gems, and Mod Menu across iOS & Android mods.',
            canonical: `${baseUrl}/topic`,
            ogType: 'website',
        });
    }, []);

    return (
        <div className="min-h-screen text-white animate-fade-in">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <a href="/" className="inline-block mb-8 text-[#00ff88] hover:underline transition-colors">&larr; Back to all apps</a>
                <h1 className="text-4xl font-black text-white mb-2">Popular Topics</h1>
                <p className="text-2xl text-[#00ff88] font-bold mb-8">Explore features across apps</p>
                <JsonLdSchema type="breadcrumb" data={{ items: [ { name: 'Apps', url: `${window.location.origin}/` }, { name: 'Topics', url: `${window.location.origin}/topic` } ] }} />
                <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {topics.map(t => (
                        <li key={t.slug}>
                            <a href={`/topic/${t.slug}`} className="block bg-[#1a1a1a] rounded-xl border p-4 transition-all duration-300 ease-in-out border-zinc-800 hover:border-[#00ff88]/50 hover:shadow-[0_0_25px_rgba(0,255,136,0.2)] hover:-translate-y-1">
                                <div className="text-lg font-bold text-white">{t.name}</div>
                                <p className="text-sm text-gray-400">See apps with {t.name.toLowerCase()}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default TopicsIndexView;

