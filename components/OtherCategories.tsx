import React, { useMemo } from 'react';
import type { AppInfo } from '../types';
import { slugify } from '../utils/slugify';

interface OtherCategoriesProps {
  currentCategorySlug: string;
  allApps: AppInfo[];
}

const OtherCategories: React.FC<OtherCategoriesProps> = ({ currentCategorySlug, allApps }) => {
  const otherCategories = useMemo(() => {
    const uniqueCategorySet: Set<string> = new Set(allApps.map(app => app.category));
    const allCategories: string[] = Array.from(uniqueCategorySet);
    return allCategories
      .filter((category) => slugify(category) !== currentCategorySlug)
      .sort();
  }, [allApps, currentCategorySlug]);

  if (otherCategories.length === 0) {
    return null;
  }

  return (
    <>
      <hr className="border-zinc-700 my-8" />
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Browse Other Categories</h2>
        <div className="flex flex-wrap gap-3">
          {otherCategories.map(category => (
            <a
              key={category}
              href={`/category/${slugify(category)}`}
              className="px-4 py-2 text-md font-bold rounded-full transition-all duration-200 border bg-zinc-800 text-gray-300 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 hover:text-white"
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default OtherCategories;
