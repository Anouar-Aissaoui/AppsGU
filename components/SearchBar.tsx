import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-[#00ff88]"></i>
          <input
            type="text"
            className="w-full bg-zinc-900 text-white placeholder-gray-500 border-2 border-zinc-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-[#00ff88] focus:ring-4 focus:ring-[#00ff88]/20 transition-all duration-300"
            placeholder="Search for your favorite mod..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search for apps"
          />
        </div>
      </div>
    </section>
  );
};

export default SearchBar;