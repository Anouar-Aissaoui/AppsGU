import React from 'react';
import type { AppInfo } from '../types';

interface ShareButtonsProps {
  app: AppInfo;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ app }) => {
  if (typeof window === 'undefined') {
    return null; // Don't render server-side
  }

  const shareUrl = window.location.href;
  const shareTitle = encodeURIComponent(`Check out ${app.title} on AppsGU!`);
  const redditTitle = encodeURIComponent(app.title);

  const socialLinks = [
    {
      name: 'Twitter',
      icon: 'fab fa-twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
      colorClass: 'hover:bg-[#1DA1F2] hover:border-[#1DA1F2]'
    },
    {
      name: 'Facebook',
      icon: 'fab fa-facebook-f',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      colorClass: 'hover:bg-[#1877F2] hover:border-[#1877F2]'
    },
    {
      name: 'Reddit',
      icon: 'fab fa-reddit-alien',
      url: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${redditTitle}`,
      colorClass: 'hover:bg-[#FF4500] hover:border-[#FF4500]'
    }
  ];

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-sm font-bold text-gray-400 mr-2">Share this app:</span>
        {socialLinks.map(social => (
            <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white transition-colors duration-200 ${social.colorClass} hover:text-white group`}
                aria-label={`Share on ${social.name}`}
            >
                <i className={`${social.icon} transition-transform group-hover:scale-110`}></i>
                <span className="font-semibold">{social.name}</span>
            </a>
        ))}
    </div>
  );
};

export default ShareButtons;