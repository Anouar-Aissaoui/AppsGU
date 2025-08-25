import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 md:w-20 md:h-20 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21,12h-0.5c-0.6-1.7-1.6-3.1-3-4.1l2.2-2.2c0,0,0,0,0,0C20.1,5.9,20.5,6,21,6c1.7,0,3-1.3,3-3c0-1.7-1.3-3-3-3s-3,1.3-3,3 c0,0.5,0.1,0.9,0.3,1.3c0,0,0,0,0,0l-2.5,2.5c-2.4-1.1-5.1-1.1-7.5,0L5.7,4.3c0,0,0,0,0,0C5.9,3.9,6,3.5,6,3c0-1.7-1.3-3-3-3 S0,1.3,0,3c0,1.7,1.3,3,3,3c0.5,0,0.9-0.1,1.3-0.3c0,0,0,0,0,0l2.2,2.2c-1.3,1-2.4,2.4-3,4.1H3c-1.7,0-3,1.3-3,3c0,1.7,1.3,3,3,3 h0.5c1.3,3.6,4.7,6,8.5,6c3.8,0,7.2-2.4,8.5-6H21c1.7,0,3-1.3,3-3C24,13.3,22.7,12,21,12z M21,16H3c-0.5,0-1-0.4-1-1s0.5-1,1-1 c10.1,0,7.6,0,18,0c0.5,0,1,0.4,1,1S21.5,16,21,16z" />
          </svg>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-wide text-white [text-shadow:0_0_15px_rgba(0,255,136,0.4),0_0_30px_rgba(0,255,136,0.2)]">AppsGU</h1>
          <h6 className="text-base font-light text-gray-400">- #1 Free Mods Store for iOS & Android -</h6>
        </div>
      </div>
    </header>
  );
};

export default Header;