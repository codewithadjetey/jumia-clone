import React, { useState } from 'react';

const ProductFilters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(true);

  const brands = ['Samsung', 'Apple', 'Nike', 'Sony', 'LG', 'HP', 'Dell'];
  const ratings = [5, 4, 3, 2, 1];

  const handleChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandToggle = (brand) => {
    const newBrands = localFilters.brands.includes(brand)
      ? localFilters.brands.filter((b) => b !== brand)
      : [...localFilters.brands, brand];
    handleChange('brands', newBrands);
  };

  const clearFilters = () => {
    const clearedFilters = {
      minPrice: '',
      maxPrice: '',
      brands: [],
      rating: '',
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters =
    localFilters.minPrice ||
    localFilters.maxPrice ||
    localFilters.brands.length > 0 ||
    localFilters.rating;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-jumia-orange hover:text-jumia-orange-dark"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Min Price (₵)</label>
            <input
              type="number"
              value={localFilters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Max Price (₵)</label>
            <input
              type="number"
              value={localFilters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              placeholder="1000000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
            />
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6 pb-6 border-b">
        <h3 className="font-medium text-gray-900 mb-3">Brands</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="h-4 w-4 text-jumia-orange focus:ring-jumia-orange border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={localFilters.rating === rating.toString()}
                onChange={() => handleChange('rating', rating.toString())}
                className="h-4 w-4 text-jumia-orange focus:ring-jumia-orange border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">
                {[...Array(rating)].map((_, i) => (
                  <span key={i} className="text-jumia-orange">★</span>
                ))}
                <span className="text-gray-400">
                  {[...Array(5 - rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
                {' & Up'}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;

