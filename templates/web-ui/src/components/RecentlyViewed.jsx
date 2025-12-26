import React from 'react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductCard from './ProductCard';

const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recently Viewed</h2>
          <Link to="/recently-viewed" className="text-jumia-orange hover:underline">
            See All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recentlyViewed.slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                onAddToCart: (id) => console.log('Add to cart:', id),
                onBuyNow: (id) => console.log('Buy now:', id),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;

