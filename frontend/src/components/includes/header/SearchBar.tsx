import React, { useState } from 'react';
import { Search, X, TrendingUp, Sparkles } from 'lucide-react';

interface SearchBarProps {
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isMobile = false, onCloseMobile }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const trendingTopics = [
    { id: 1, name: 'React', category: 'Development' },
    { id: 2, name: 'Python', category: 'Data Science' },
    { id: 3, name: 'UI/UX', category: 'Design' },
    { id: 4, name: 'Machine Learning', category: 'AI' },
    { id: 5, name: 'Web3', category: 'Blockchain' },
    { id: 6, name: 'DevOps', category: 'Operations' },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      if (isMobile && onCloseMobile) {
        onCloseMobile();
      }
    }
  };

  const handleTopicClick = (topic: string) => {
    setSearchQuery(topic);
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Header with close button */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="relative flex-1 mr-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What would you like to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
          <button
            onClick={onCloseMobile}
            className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-73px)] px-4 py-3">
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="p-1.5 bg-blue-100 rounded-lg mr-2">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-gray-800">Trending Topics</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {trendingTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.name)}
                  className="px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-gray-800 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors text-left"
                >
                  <div className="font-medium">{topic.name}</div>
                  <div className="text-xs text-gray-500">{topic.category}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent searches section (optional) */}
          <div>
            <div className="flex items-center mb-3">
              <TrendingUp className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Recent Searches</span>
            </div>
            <div className="space-y-2">
              {['JavaScript Basics', 'React Hooks', 'Python Data Analysis'].map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{search}</span>
                    <Search className="h-3 w-3 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform duration-300 ${isFocused ? 'scale-110 translate-x-1' : ''}`}>
        <Search className={`h-4 w-4 sm:h-5 sm:w-5 transition-colors duration-300 ${isFocused ? 'text-blue-600' : 'text-gray-400'}`} />
      </div>
      
      <input
        type="text"
        className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-2 sm:py-2.5 md:py-3 border border-gray-200 rounded-xl sm:rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm sm:shadow hover:shadow-md"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center group"
        >
          <div className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 group-hover:text-gray-700" />
          </div>
        </button>
      )}
    </div>
  );
};

export default SearchBar;