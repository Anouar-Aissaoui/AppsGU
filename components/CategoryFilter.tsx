import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <section className="pt-2 pb-6 lg:px-4 lg:py-2">
      <div className="container mx-auto px-4 lg:p-0">
        <h2 className="text-xs uppercase text-gray-500 font-bold mb-3 tracking-wider lg:block hidden">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3 py-1.5 text-sm font-bold rounded-full transition-all duration-200 border
                ${selectedCategory === category
                  ? 'bg-[#00ff88] text-zinc-900 border-[#00ff88]'
                  : 'bg-zinc-800 text-gray-300 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600'
                }`
              }
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
