import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const QuickViewModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.id, quantity);
      showToast('Product added to cart!', 'success');
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    showToast(
      isInWishlist(product.id)
        ? 'Removed from wishlist'
        : 'Added to wishlist',
      'success'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Image */}
              <div className="aspect-square bg-jumia-light-gray rounded-lg overflow-hidden">
                <div className="skeleton w-full h-full"></div>
              </div>

              {/* Product Info */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-jumia-orange">
                        {'★'.repeat(Math.floor(product.rating || 0))}
                        {'☆'.repeat(5 - Math.floor(product.rating || 0))}
                      </span>
                      <span className="text-sm text-jumia-gray">
                        ({product.reviews || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="text-3xl font-bold text-jumia-orange">
                        ₵{product.price?.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-jumia-gray line-through">
                          ₵{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-jumia-light-gray"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-jumia-light-gray"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-jumia-orange text-white py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className={`w-full border-2 py-3 rounded-lg font-medium transition ${
                      isInWishlist(product.id)
                        ? 'border-jumia-orange bg-jumia-orange text-white'
                        : 'border-jumia-orange text-jumia-orange hover:bg-jumia-orange hover:text-white'
                    }`}
                  >
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;

