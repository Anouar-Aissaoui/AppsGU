import React, { useMemo, useEffect } from 'react';
import { APPS_DATA } from '../constants';
import { slugify } from '../utils/slugify';
import AppList from './AppList';
import Header from './Header';
import { updateMetaTags } from '../utils/seo';

interface CategoryPageViewProps {
    categorySlug: string;
}

const CategoryPageView: React.FC<CategoryPageViewProps> = ({ categorySlug }) => {
    const categoryName = useMemo(() => {
        const app = APPS_DATA.find(app => slugify(app.category) === categorySlug);
        return app ? app.category : 'Unknown Category';
    }, [categorySlug]);

    const filteredApps = useMemo(() => {
        return APPS_DATA.filter(app => slugify(app.category) === categorySlug);
    }, [categorySlug]);

    useEffect(() => {
        if (categoryName === 'Unknown Category') return;

        const baseUrl = window.location.origin;
        const canonicalUrl = `${baseUrl}/category/${categorySlug}`;
        const year = new Date().getFullYear();
        
        updateMetaTags({
            title: `Best ${categoryName} Apps & Mods for iOS & Android (${year}) | AppsGU`,
            description: `Discover and download the top-rated ${categoryName} apps, mods, and tweaks for both iOS & Android. Get the latest free versions, fully updated for ${year}.`,
            canonical: canonicalUrl
        });

    }, [categorySlug, categoryName]);

    return (
        <div className="min-h-screen text-white animate-fade-in">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <a href="/" className="inline-block mb-8 text-[#00ff88] hover:underline transition-colors">
                    &larr; Back to all apps
                </a>
                <h1 className="text-4xl font-black text-white mb-2">
                    Browsing Category
                </h1>
                <p className="text-2xl text-[#00ff88] font-bold mb-8">{categoryName}</p>

                <AppList apps={filteredApps} activeSlug={null} isPanel={false} />
            </main>
        </div>
    );
};

export default CategoryPageView;