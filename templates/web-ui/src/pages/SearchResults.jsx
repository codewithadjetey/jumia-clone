import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import ProductSort from '../components/ProductSort';
import Pagination from '../components/Pagination';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    brands: [],
    rating: '',
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    setIsLoading(true);
    const mockProducts = [
      {
        id: 1,
        name: 'Samsung Galaxy S21 Ultra 256GB',
        price: 285000,
        originalPrice: 520000,
        discount: 45,
        rating: 5,
        reviews: 1234,
        badges: [{ type: 'official', text: 'Official' }],
        onAddToCart: (id) => console.log('Add to cart:', id),
        onBuyNow: (id) => console.log('Buy now:', id),
      },
      {
        id: 2,
        name: 'iPhone 13 Pro Max 256GB',
        price: 320000,
        originalPrice: 450000,
        discount: 29,
        rating: 5,
        reviews: 892,
        badges: [],
        onAddToCart: (id) => console.log('Add to cart:', id),
        onBuyNow: (id) => console.log('Buy now:', id),
      },
    ];
    
    setTimeout(() => {
      setProducts(mockProducts);
      setTotalPages(1);
      setIsLoading(false);
    }, 500);
  }, [query, filters, sortBy, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-jumia-light-gray py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-jumia-gray">
            <li>
              <Link to="/" className="hover:text-jumia-orange">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">Search Results</li>
          </ol>
        </nav>

        {/* Search Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-jumia-gray">
            {products.length} {products.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} showBuyNow={true} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="bg-white rounded-lg p-12 text-center">
                <svg
                  className="w-24 h-24 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No products found</h2>
                <p className="text-jumia-gray mb-6">
                  Try adjusting your search or filters to find what you're looking for
                </p>
                <Link
                  to="/"
                  className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

