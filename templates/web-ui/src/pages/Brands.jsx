import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const Brands = () => {
  const [brands] = useState([
    { id: 1, name: 'Samsung', logo: '/brands/samsung.png', productCount: 234 },
    { id: 2, name: 'Apple', logo: '/brands/apple.png', productCount: 189 },
    { id: 3, name: 'Nike', logo: '/brands/nike.png', productCount: 456 },
    { id: 4, name: 'Sony', logo: '/brands/sony.png', productCount: 123 },
    { id: 5, name: 'LG', logo: '/brands/lg.png', productCount: 98 },
    { id: 6, name: 'HP', logo: '/brands/hp.png', productCount: 167 },
    { id: 7, name: 'Dell', logo: '/brands/dell.png', productCount: 145 },
    { id: 8, name: 'Adidas', logo: '/brands/adidas.png', productCount: 278 },
  ]);

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shop by Brand</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to={`/brand/${brand.name.toLowerCase()}`}
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-24 h-24 bg-jumia-light-gray rounded-lg mx-auto mb-4 flex items-center justify-center">
                <div className="skeleton w-full h-full"></div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{brand.name}</h3>
              <p className="text-sm text-jumia-gray">{brand.productCount} products</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;

