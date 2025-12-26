import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SearchAutocomplete = ({ searchQuery, onSearch, suggestions = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsOpen(searchQuery.length > 0 && suggestions.length > 0);
    setSelectedIndex(-1);
  }, [searchQuery, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      onSearch(suggestions[selectedIndex].name);
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
      onKeyDown={handleKeyDown}
    >
      {suggestions.length > 0 ? (
        <div className="py-2">
          {suggestions.map((suggestion, index) => (
            <Link
              key={suggestion.id || index}
              to={`/product/${suggestion.id}`}
              className={`block px-4 py-3 hover:bg-jumia-light-gray transition ${
                index === selectedIndex ? 'bg-jumia-light-gray' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-jumia-light-gray rounded flex-shrink-0">
                  <div className="skeleton w-full h-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{suggestion.name}</p>
                  <p className="text-xs text-jumia-gray">₵{suggestion.price?.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
          <Link
            to={`/search?q=${encodeURIComponent(searchQuery)}`}
            className="block px-4 py-3 text-center text-jumia-orange hover:bg-jumia-light-gray border-t border-gray-200 font-medium"
            onClick={() => setIsOpen(false)}
          >
            View all results for "{searchQuery}"
          </Link>
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-jumia-gray">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

export default SearchAutocomplete;

