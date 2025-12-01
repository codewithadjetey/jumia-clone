import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const categories = [
    {
      name: 'Electronics',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
    },
    {
      name: 'Fashion',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      name: 'Home & Living',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      name: 'Health & Beauty',
      icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      name: 'Groceries',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    },
    {
      name: 'Phones & Tablets',
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    },
  ];

  return (
    <section className="bg-jumia-light-gray py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="category-card bg-white rounded-lg p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-jumia-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-jumia-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
                </svg>
              </div>
              <h3 className="font-medium text-gray-800">{category.name}</h3>
              <p className="text-sm text-jumia-gray mt-1">Shop Now →</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
