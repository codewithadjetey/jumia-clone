import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const categories = [
    { name: 'Electronics', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
    { name: 'Fashion', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Home & Living', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Health & Beauty', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Groceries', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Books', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { name: 'Phones & Tablets', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  ];

  return (
    <>
      {/* Category Navigation Bar */}
      <nav className="bg-white border-b-2 border-jumia-orange sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center overflow-x-auto scrollbar-hide py-3 space-x-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center space-x-2 whitespace-nowrap hover:text-jumia-orange transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={category.icon} />
                </svg>
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-gray-800">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block py-2 text-gray-800 hover:text-jumia-orange"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
