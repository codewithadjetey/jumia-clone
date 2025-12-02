import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      name: 'Electronics',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      description: 'Smartphones, Laptops, TVs, Audio & More',
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'TVs', 'Audio', 'Cameras', 'Gaming'],
    },
    {
      name: 'Fashion',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      description: 'Clothing, Shoes, Accessories & More',
      subcategories: ['Men\'s Fashion', 'Women\'s Fashion', 'Kids Fashion', 'Shoes', 'Bags', 'Watches', 'Jewelry'],
    },
    {
      name: 'Home & Living',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      description: 'Furniture, Decor, Kitchen & More',
      subcategories: ['Furniture', 'Home Decor', 'Kitchen', 'Bedding', 'Bath', 'Garden', 'Storage'],
    },
    {
      name: 'Health & Beauty',
      icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      description: 'Skincare, Makeup, Fragrances & More',
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Personal Care', 'Health', 'Wellness'],
    },
    {
      name: 'Groceries',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      description: 'Food, Beverages, Snacks & More',
      subcategories: ['Fresh Produce', 'Beverages', 'Snacks', 'Dairy', 'Meat & Seafood', 'Pantry', 'Frozen'],
    },
    {
      name: 'Phones & Tablets',
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      description: 'Smartphones, Tablets, Accessories & More',
      subcategories: ['Smartphones', 'Tablets', 'Phone Cases', 'Screen Protectors', 'Chargers', 'Headphones', 'Accessories'],
    },
    {
      name: 'Books',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      description: 'Books, eBooks, Magazines & More',
      subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children\'s Books', 'eBooks', 'Magazines', 'Comics'],
    },
    {
      name: 'Sports & Outdoors',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      description: 'Fitness, Sports Equipment & More',
      subcategories: ['Fitness', 'Sports Equipment', 'Outdoor Gear', 'Cycling', 'Running', 'Swimming', 'Yoga'],
    },
  ];

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop by Category</h1>
          <p className="text-jumia-gray">Browse our wide selection of products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-jumia-orange bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-jumia-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h2>
                <p className="text-sm text-jumia-gray mb-4">{category.description}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.subcategories.slice(0, 3).map((sub, subIndex) => (
                    <span
                      key={subIndex}
                      className="text-xs bg-jumia-light-gray text-jumia-gray px-2 py-1 rounded"
                    >
                      {sub}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs text-jumia-orange">+{category.subcategories.length - 3} more</span>
                  )}
                </div>
                <div className="mt-4 text-jumia-orange font-medium text-sm">
                  Shop Now →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

