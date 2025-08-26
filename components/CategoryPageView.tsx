import React, { useMemo, useEffect } from 'react';
import { slugify } from '../utils/slugify';
import AppList from './AppList';
import Header from './Header';
import { updateMetaTags } from '../utils/seo';
import type { AppInfo } from '../types';
import AppListSkeleton from './AppListSkeleton';
import OtherCategories from './OtherCategories';
import JsonLdSchema from './JsonLdSchema';

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
            title: `${appCount}+ Best ${categoryName} Mods & Apps - Free iOS Android Download (${year})`,
            description: `🔥 Top ${appCount}+ ${categoryName.toLowerCase()} mods & modded apps for iOS/Android! Download ${exampleApps} + more premium features unlocked. Safe installation guides. Updated ${year}.`,
            canonical: canonicalUrl,
            robots: 'index, follow'
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
                    Best {categoryName} Mods & Apps
                </h1>
                <p className="text-2xl text-[#00ff88] font-bold mb-8">Top downloads in {categoryName}</p>
                {isLoading ? (
                    <AppListSkeleton isPanel={false} />
                ) : (
                    <>
                        <JsonLdSchema
                            type="breadcrumb"
                            data={{
                                items: [
                                    { name: 'Apps', url: `${window.location.origin}/` },
                                    { name: categoryName, url: `${window.location.origin}/category/${categorySlug}` }
                                ]
                            }}
                        />
                        <JsonLdSchema
                            type="itemList"
                            data={{
                                items: filteredApps.slice(0, 20).map(app => ({
                                    name: app.title,
                                    url: `${window.location.origin}/app/${app.slug}`
                                }))
                            }}
                        />
                        <AppList apps={filteredApps} activeSlug={null} isPanel={false} />
                        <OtherCategories currentCategorySlug={categorySlug} allApps={allApps} />
                    </>
                )}
            </main>
        </div>
    );
};

export default CategoryPageView;