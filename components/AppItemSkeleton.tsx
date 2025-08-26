import React from 'react';

const AppItemSkeleton: React.FC = () => {
  return (
    <li className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-4">
      <div className="flex items-center space-x-4 animate-pulse">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-zinc-700 rounded-2xl"></div>
        </div>
        <div className="flex-grow min-w-0 space-y-2">
          <div className="h-3 bg-zinc-700 rounded w-1/4"></div>
          <div className="h-5 bg-zinc-700 rounded w-3/4"></div>
          <div className="h-4 bg-zinc-700 rounded w-full"></div>
        </div>
      </div>
    </li>
  );
};

export default AppItemSkeleton;