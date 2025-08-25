import React, { useEffect } from 'react';
import type { AppInfo } from '../types';

interface AppDetailViewProps {
  app: AppInfo;
  isPanel: boolean;
}

const AppDetailView: React.FC<AppDetailViewProps> = ({ app, isPanel }) => {
  useEffect(() => {
    const originalTitle = document.title;
    const metaDescription = document.getElementById('meta-description') as HTMLMetaElement;
    const originalDescription = metaDescription ? metaDescription.content : '';

    document.title = `${app.title} Mod - AppsGU Clone`;
    if (metaDescription) {
        metaDescription.content = `Download the latest version of ${app.title}. ${app.description}. Get this mod for iOS & Android from the #1 Free Mods Store.`;
    }

    return () => {
        document.title = originalTitle;
        if (metaDescription) {
            metaDescription.content = originalDescription;
        }
    };
  }, [app]);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
        {!isPanel && (
            <a href="/#" className="inline-block mb-8 text-[#00ff88] hover:underline transition-colors">
                &larr; Back to all apps
            </a>
        )}
        <div className="bg-[#1a1a1a] rounded-xl border border-zinc-800 p-6 md:p-8 shadow-2xl shadow-black/30">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
                <img 
                    src={app.img} 
                    alt={`${app.title} icon`}
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-3xl shadow-lg flex-shrink-0"
                />
                <div className="flex-grow">
                    <div className="text-sm font-bold text-[#00ff88] uppercase tracking-wider">{app.author}</div>
                    <h1 className="text-4xl md:text-5xl font-black text-white my-1">{app.title}</h1>
                    <div className="flex items-center gap-x-4 gap-y-1 text-gray-400 text-sm mb-4 flex-wrap">
                        <span>Version: {app.version}</span>
                        <span className="hidden sm:inline">|</span>
                        <span>Size: {app.size}</span>
                    </div>
                    <p className="text-base text-gray-300 mb-6">{app.description}</p>
                    <button className="bg-[#00ff88] text-zinc-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-white hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all duration-300 transform hover:scale-105">
                        DOWNLOAD NOW
                    </button>
                </div>
            </div>
            <hr className="border-zinc-700 my-8" />
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">About This Mod</h2>
                <div className="text-gray-400 whitespace-pre-line leading-relaxed prose prose-invert prose-p:text-gray-400 prose-ul:text-gray-400">
                    {app.longDescription}
                </div>
            </div>
        </div>
    </div>
  );
}

export default AppDetailView;
