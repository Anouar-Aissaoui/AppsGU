import React, { useEffect, useMemo } from 'react';
import Header from './Header';
import AppList from './AppList';
import AppListSkeleton from './AppListSkeleton';
import JsonLdSchema from './JsonLdSchema';
import type { AppInfo } from '../types';
import { appsForTopic, collectTopics } from '../utils/topics';
import { updateMetaTags } from '../utils/seo';

interface TopicPageViewProps {
    topicSlug: string;
    allApps: AppInfo[];
    isLoading: boolean;
}

const TopicPageView: React.FC<TopicPageViewProps> = ({ topicSlug, allApps, isLoading }) => {
    const topics = useMemo(() => collectTopics(allApps), [allApps]);
    const topic = useMemo(() => topics.find(t => t.slug === topicSlug) || { slug: topicSlug, name: topicSlug.replace(/-/g, ' ') }, [topicSlug, topics]);
    const filteredApps = useMemo(() => (isLoading ? [] : appsForTopic(topicSlug, allApps)), [topicSlug, allApps, isLoading]);

    useEffect(() => {
        if (isLoading) return;
        const baseUrl = window.location.origin;
        const canonicalUrl = `${baseUrl}/topic/${topicSlug}`;
        const appCount = filteredApps.length;
        updateMetaTags({
            title: `${topic.name} – ${appCount}+ Apps | AppsGU`,
            description: `Explore ${appCount}+ apps with ${topic.name.toLowerCase()} for iOS & Android.`,
            canonical: canonicalUrl,
            ogType: 'website'
        });
    }, [topicSlug, topic, filteredApps, isLoading]);

    return (
        <div className="min-h-screen text-white animate-fade-in">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <a href="/topic" className="inline-block mb-8 text-[#00ff88] hover:underline transition-colors">&larr; All topics</a>
                <h1 className="text-4xl font-black text-white mb-2">{topic.name}</h1>
                <p className="text-2xl text-[#00ff88] font-bold mb-8">Apps featuring {topic.name.toLowerCase()}</p>
                {isLoading ? (
                    <AppListSkeleton isPanel={false} />
                ) : (
                    <>
                        <JsonLdSchema type="breadcrumb" data={{ items: [ { name: 'Apps', url: `${window.location.origin}/` }, { name: 'Topics', url: `${window.location.origin}/topic` }, { name: topic.name, url: `${window.location.origin}/topic/${topicSlug}` } ] }} />
                        <JsonLdSchema type="itemList" data={{ items: filteredApps.slice(0, 20).map(app => ({ name: app.title, url: `${window.location.origin}/app/${app.slug}` })) }} />
                        <AppList apps={filteredApps} activeSlug={null} isPanel={false} />
                    </>
                )}
            </main>
        </div>
    );
};

export default TopicPageView;

