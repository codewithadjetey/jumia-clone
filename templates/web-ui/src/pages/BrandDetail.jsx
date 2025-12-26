import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import ProductSort from '../components/ProductSort';
import Pagination from '../components/Pagination';

const BrandDetail = () => {
  const { brandName } = useParams();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    rating: '',
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // TODO: Replace with actual API call
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
    ];
    setProducts(mockProducts);
  }, [brandName, filters, sortBy, currentPage]);

  const brandNameFormatted = brandName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Brands', path: '/brands' },
            { label: brandNameFormatted, path: `/brand/${brandName}` },
          ]}
        />

        <div className="mb-6">
          <div className="w-32 h-32 bg-jumia-light-gray rounded-lg mb-4">
            <div className="skeleton w-full h-full"></div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{brandNameFormatted}</h1>
          <p className="text-jumia-gray">{products.length} products available</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ProductFilters filters={filters} onFilterChange={setFilters} />
          </div>
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <ProductSort sortBy={sortBy} onSortChange={setSortBy} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} showBuyNow={true} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={1}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;

