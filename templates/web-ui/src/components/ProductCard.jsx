import React from 'react';

const ProductCard = ({ product, showBuyNow = false }) => {
  const {
    id,
    name,
    image,
    price,
    originalPrice,
    discount,
    rating,
    reviews,
    badges = [],
    onAddToCart,
    onBuyNow,
  } = product;

  return (
    <div className="product-card bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group min-w-[150px] md:min-w-0">
      <div className="relative">
        <div className="aspect-square bg-jumia-light-gray overflow-hidden">
          <div className="skeleton w-full h-full group-hover:scale-110 transition-transform duration-300"></div>
        </div>
        {discount && (
          <span className="absolute top-2 left-2 bg-jumia-red text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {badges.map((badge, index) => (
          <span
            key={index}
            className={`absolute ${
              index === 0 && discount ? 'top-2 right-2' : 'top-2 right-2'
            } ${badge.type === 'express' ? 'bg-jumia-green' : badge.type === 'official' ? 'bg-blue-500' : 'bg-jumia-green'} text-white text-xs font-bold px-2 py-1 rounded`}
          >
            {badge.text}
          </span>
        ))}
        <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-jumia-orange hover:text-white transition opacity-0 group-hover:opacity-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center space-x-1 mb-2">
          <span className="text-xs text-jumia-orange">
            {'★'.repeat(Math.floor(rating))}
            {'☆'.repeat(5 - Math.floor(rating))}
          </span>
          <span className="text-xs text-jumia-gray">({reviews})</span>
        </div>
        <div className="flex items-center space-x-2 mb-2 md:mb-3">
          <span className="text-lg md:text-xl font-bold text-jumia-orange">₵{price.toLocaleString()}</span>
          {originalPrice && (
            <span className="text-sm text-jumia-gray line-through">₵{originalPrice.toLocaleString()}</span>
          )}
        </div>
        <div className={`flex ${showBuyNow ? 'space-x-2' : ''}`}>
          <button
            onClick={() => onAddToCart && onAddToCart(id)}
            className={`${showBuyNow ? 'flex-1' : 'w-full'} bg-jumia-orange text-white py-2 rounded-lg font-medium hover:bg-jumia-orange-dark transition text-sm`}
          >
            Add to Cart
          </button>
          {showBuyNow && (
            <button
              onClick={() => onBuyNow && onBuyNow(id)}
              className="px-4 border border-jumia-orange text-jumia-orange rounded-lg hover:bg-jumia-orange hover:text-white transition text-sm"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
