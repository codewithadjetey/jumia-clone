import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import EmptyState from '../components/EmptyState';

const Compare = () => {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('compareList');
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading compare list:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const removeFromCompare = (productId) => {
    setCompareList(compareList.filter((p) => p.id !== productId));
  };

  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-jumia-light-gray py-8">
        <div className="container mx-auto px-4">
          <Breadcrumbs />
          <EmptyState
            icon={() => (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
            )}
            title="No products to compare"
            message="Add products to compare their features side by side"
            actionLabel="Continue Shopping"
            actionLink="/"
          />
        </div>
      </div>
    );
  }

  const attributes = ['Price', 'Rating', 'Reviews', 'Discount', 'Brand'];

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Compare Products</h1>
          <button
            onClick={() => setCompareList([])}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-medium text-gray-700">Features</th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 text-center min-w-[200px]">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute top-0 right-0 text-gray-400 hover:text-red-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <Link to={`/product/${product.id}`}>
                        <div className="aspect-square bg-jumia-light-gray rounded-lg mb-2">
                          <div className="skeleton w-full h-full"></div>
                        </div>
                        <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr) => (
                <tr key={attr} className="border-b">
                  <td className="p-4 font-medium text-gray-700">{attr}</td>
                  {compareList.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      {attr === 'Price' && (
                        <span className="font-bold text-jumia-orange">
                          ₵{product.price?.toLocaleString()}
                        </span>
                      )}
                      {attr === 'Rating' && (
                        <span className="text-jumia-orange">
                          {'★'.repeat(Math.floor(product.rating || 0))}
                        </span>
                      )}
                      {attr === 'Reviews' && <span>{product.reviews || 0}</span>}
                      {attr === 'Discount' && product.discount && (
                        <span className="text-jumia-red font-bold">-{product.discount}%</span>
                      )}
                      {attr === 'Brand' && <span>{product.brand || 'N/A'}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Compare;

