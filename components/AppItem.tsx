import React from 'react';
import type { AppInfo } from '../types';

interface AppItemProps {
  app: AppInfo;
}

const AppItem: React.FC<AppItemProps> = ({ app }) => {
  return (
    <li>
      <a href={`#/app/${app.slug}`} className="block bg-[#1a1a1a] rounded-xl border border-zinc-800 p-4 transition-all duration-300 ease-in-out cursor-pointer group hover:border-[#00ff88]/50 hover:shadow-[0_0_25px_rgba(0,255,136,0.2)] hover:-translate-y-1">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img 
              src={app.img} 
              alt={app.title} 
              className="w-16 h-16 object-cover rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105" 
            />
          </div>
          <div className="flex-grow min-w-0">
            <div className="text-xs font-bold text-[#00ff88] uppercase tracking-wider">{app.author}</div>
            <div className="text-lg font-bold text-white truncate">{app.title}</div>
            <p className="text-sm text-gray-400 truncate">{app.description}</p>
          </div>
        </div>
      </a>
    </li>
  );
};

export default AppItem;
