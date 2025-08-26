import React, { useMemo, useEffect } from 'react';
import { slugify } from '../utils/slugify';
import AppList from './AppList';
import Header from './Header';
import { updateMetaTags } from '../utils/seo';
import type { AppInfo } from '../types';
import AppListSkeleton from './AppListSkeleton';
import OtherCategories from './OtherCategories';

interface CategoryPageViewProps {
    categorySlug: string;
    allApps: AppInfo[];
    isLoading: boolean;
}

const CategoryPageView: React.FC<CategoryPageViewProps> = ({ categorySlug, allApps, isLoading }) => {
    const categoryName = useMemo(() => {
        if (isLoading || allApps.length === 0) return 'Loading...';
        const app = allApps.find(app => slugify(app.category) === categorySlug);
        return app ? app.category : 'Unknown Category';
    }, [categorySlug, allApps, isLoading]);

    const filteredApps = useMemo(() => {
        if (isLoading) return [];
        return allApps.filter(app => slugify(app.category) === categorySlug);
    }, [categorySlug, allApps, isLoading]);

    useEffect(() => {
        if (categoryName === 'Unknown Category' || categoryName === 'Loading...' || filteredApps.length === 0) return;

        const baseUrl = window.location.origin;
        const canonicalUrl = `${baseUrl}/category/${categorySlug}`;
        const year = new Date().getFullYear();
        const appCount = filteredApps.length;
        const exampleApps = filteredApps.slice(0, 2).map(a => a.title).join(' and ');
        
        updateMetaTags({
            title: `Download ${appCount}+ Best ${categoryName} Mods for iOS & Android (${year})`,
            description: `Explore our collection of the top ${appCount}+ ${categoryName} apps and mods. Download popular titles like ${exampleApps} for free on AppsGU.`,
            canonical: canonicalUrl
        });

    }, [categorySlug, categoryName, filteredApps]);

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
                {isLoading ? (
                    <AppListSkeleton isPanel={false} />
                ) : (
                    <>
                        <AppList apps={filteredApps} activeSlug={null} isPanel={false} />
                        <OtherCategories currentCategorySlug={categorySlug} allApps={allApps} />
                    </>
                )}
            </main>
        </div>
    );
};

export default CategoryPageView;