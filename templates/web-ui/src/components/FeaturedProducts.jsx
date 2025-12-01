import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const featuredProducts = [
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
      name: 'Laptop Stand Aluminum',
      price: 15500,
      originalPrice: 26000,
      discount: 40,
      rating: 4,
      reviews: 345,
      badges: [],
      onAddToCart: (id) => console.log('Add to cart:', id),
      onBuyNow: (id) => console.log('Buy now:', id),
    },
    {
      id: 5,
      name: 'Wireless Mouse Logitech',
      price: 7200,
      originalPrice: 9600,
      discount: 25,
      rating: 5,
      reviews: 678,
      badges: [{ type: 'express', text: 'Express' }],
      onAddToCart: (id) => console.log('Add to cart:', id),
      onBuyNow: (id) => console.log('Buy now:', id),
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Deals</h2>
          <Link to="/products" className="text-jumia-orange hover:underline">
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} showBuyNow={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
