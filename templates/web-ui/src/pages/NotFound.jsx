import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const NotFound = () => {
  // Recommended products
  const recommendedProducts = [
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
      name: 'Nike Air Max Running Shoes',
      price: 42000,
      originalPrice: 60000,
      discount: 30,
      rating: 4,
      reviews: 892,
      badges: [{ type: 'free-delivery', text: 'Free Delivery' }],
      onAddToCart: (id) => console.log('Add to cart:', id),
      onBuyNow: (id) => console.log('Buy now:', id),
    },
    {
      id: 3,
      name: '55" 4K Smart TV Ultra HD',
      price: 180000,
      originalPrice: 400000,
      discount: 55,
      rating: 5,
      reviews: 567,
      badges: [],
      onAddToCart: (id) => console.log('Add to cart:', id),
      onBuyNow: (id) => console.log('Buy now:', id),
    },
    {
      id: 4,
      name: 'Wireless Headphones Premium',
      price: 12500,
      originalPrice: 18000,
      discount: 30,
      rating: 4,
      reviews: 189,
      badges: [{ type: 'express', text: 'Express' }],
      onAddToCart: (id) => console.log('Add to cart:', id),
      onBuyNow: (id) => console.log('Buy now:', id),
    },
  ];

  return (
    <div className="min-h-screen bg-jumia-light-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 404 Error Section */}
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center mb-12">
          <div className="mb-6">
            <h1 className="text-9xl font-bold text-jumia-orange mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
            <p className="text-jumia-gray text-lg mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-jumia-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Homepage
            </Link>
            <Link
              to="/categories"
              className="border-2 border-jumia-orange text-jumia-orange px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange hover:text-white transition inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

