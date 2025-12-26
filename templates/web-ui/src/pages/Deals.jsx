import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';

const Deals = () => {
  const [activeTab, setActiveTab] = useState('daily');

  const dailyDeals = [
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

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Deals & Promotions</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'daily'
                ? 'border-b-2 border-jumia-orange text-jumia-orange'
                : 'text-jumia-gray hover:text-jumia-orange'
            }`}
          >
            Daily Deals
          </button>
          <button
            onClick={() => setActiveTab('flash')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'flash'
                ? 'border-b-2 border-jumia-orange text-jumia-orange'
                : 'text-jumia-gray hover:text-jumia-orange'
            }`}
          >
            Flash Sales
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-6 py-3 font-medium transition ${
              activeTab === 'coupons'
                ? 'border-b-2 border-jumia-orange text-jumia-orange'
                : 'text-jumia-gray hover:text-jumia-orange'
            }`}
          >
            Coupon Codes
          </button>
        </div>

        {/* Content */}
        {activeTab === 'daily' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Deals</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {dailyDeals.map((product) => (
                <ProductCard key={product.id} product={product} showBuyNow={true} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'flash' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Flash Sales</h2>
            <p className="text-jumia-gray">Check out our flash sales section on the homepage.</p>
          </div>
        )}

        {activeTab === 'coupons' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6 border-2 border-jumia-orange">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-jumia-orange">SAVE20</h3>
                  <span className="bg-jumia-green text-white text-xs font-bold px-2 py-1 rounded">
                    Active
                  </span>
                </div>
                <p className="text-gray-700 mb-2">Get 20% off on orders over ₵10,000</p>
                <p className="text-sm text-jumia-gray">Valid until: Dec 31, 2024</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;

