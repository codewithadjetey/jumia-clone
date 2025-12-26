import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-jumia-light-gray py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>
          <EmptyState
            icon={() => (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
            title="Your wishlist is empty"
            message="Start adding products you love to your wishlist"
            actionLabel="Continue Shopping"
            actionLink="/"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <span className="text-jumia-gray">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wishlist.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={{
                  ...product,
                  onAddToCart: (id) => console.log('Add to cart:', id),
                  onBuyNow: (id) => console.log('Buy now:', id),
                }}
                showBuyNow={true}
              />
              <button
                onClick={() => handleRemove(product.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition z-10"
                title="Remove from wishlist"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

