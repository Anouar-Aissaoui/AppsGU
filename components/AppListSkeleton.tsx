import React from 'react';
import AppItemSkeleton from './AppItemSkeleton';

interface AppListSkeletonProps {
  isPanel: boolean;
}

const AppListSkeleton: React.FC<AppListSkeletonProps> = ({ isPanel }) => {
  const skeletonCount = isPanel ? 8 : 6;

  return (
    <section className="py-8 lg:p-4">
      <div className="container mx-auto px-4 lg:p-0">
        <ul className={`grid gap-4 ${isPanel ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <AppItemSkeleton key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AppListSkeleton;