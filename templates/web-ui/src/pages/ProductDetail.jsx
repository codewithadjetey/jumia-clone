import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import ProductCard from '../components/ProductCard';
import ImageGallery from '../components/ImageGallery';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([
    {
      name: 'John Doe',
      rating: 5,
      title: 'Excellent product!',
      comment: 'Excellent phone! The camera quality is outstanding and the battery lasts all day. Highly recommend!',
      date: new Date().toISOString(),
      helpful: 12,
    },
  ]);

  // TODO: Replace with actual API call to fetch product by ID
  const product = {
    id: id || 1,
    name: 'Samsung Galaxy S21 Ultra 256GB',
    brand: 'Samsung',
    price: 285000,
    originalPrice: 520000,
    discount: 45,
    rating: 4.5,
    reviews: 1234,
    images: [
      '/placeholder-product-1.jpg',
      '/placeholder-product-2.jpg',
      '/placeholder-product-3.jpg',
      '/placeholder-product-4.jpg',
    ],
    badges: [
      { type: 'official', text: 'Official Store' },
      { type: 'express', text: 'Jumbo Express' },
      { type: 'free-delivery', text: 'Free Delivery' },
    ],
    description: `Experience the ultimate in smartphone technology with the Samsung Galaxy S21 Ultra. This flagship device features a stunning 6.8-inch Dynamic AMOLED 2X display, powerful Exynos 2100 processor, and a revolutionary camera system that captures every detail with precision.

Key Features:
- 6.8" Dynamic AMOLED 2X Display with 120Hz refresh rate
- 108MP Main Camera with 100x Space Zoom
- 5G Connectivity for ultra-fast speeds
- 5000mAh Battery with fast charging
- S Pen Support (sold separately)
- 256GB Internal Storage
- IP68 Water and Dust Resistance`,
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X, 3200 x 1440, 120Hz',
      'Processor': 'Exynos 2100 Octa-core',
      'RAM': '12GB',
      'Storage': '256GB',
      'Camera': '108MP + 10MP + 10MP + 12MP',
      'Front Camera': '40MP',
      'Battery': '5000mAh',
      'OS': 'Android 11, One UI 3.1',
      'Connectivity': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Dimensions': '165.1 x 75.6 x 8.9 mm',
      'Weight': '227g',
      'Colors': 'Phantom Black, Phantom Silver, Phantom Titanium',
    },
    inStock: true,
    stockCount: 15,
    sku: 'SAM-S21U-256-BLK',
    category: 'Electronics',
    subcategory: 'Smartphones',
  };

  useEffect(() => {
    // Add to recently viewed when product loads
    addToRecentlyViewed(product);
  }, [id, addToRecentlyViewed]);

  const relatedProducts = [
    {
      id: 2,
      name: 'iPhone 13 Pro Max 256GB',
      price: 320000,
      originalPrice: 450000,
      discount: 29,
      rating: 5,
      reviews: 892,
      badges: [{ type: 'official', text: 'Official' }],
      onAddToCart: (id) => console.log('Add to cart:', id),
      onBuyNow: (id) => console.log('Buy now:', id),
    },
    {
      id: 3,
      name: 'OnePlus 9 Pro 256GB',
      price: 245000,
      originalPrice: 380000,
      discount: 36,
      rating: 4,
      reviews: 567,
      badges: [],
      onAddToCart: (id) => console.log('Add to cart:', id),
      onBuyNow: (id) => console.log('Buy now:', id),
    },
    {
      id: 4,
      name: 'Xiaomi Mi 11 Ultra 256GB',
      price: 195000,
      originalPrice: 320000,
      discount: 39,
      rating: 4,
      reviews: 423,
      badges: [{ type: 'express', text: 'Express' }],
      onAddToCart: (id) => console.log('Add to cart:', id),
      onBuyNow: (id) => console.log('Buy now:', id),
    },
  ];

  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    console.log('Add to cart:', product.id, 'Quantity:', quantity);
    // Show toast notification
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now logic
    console.log('Buy now:', product.id, 'Quantity:', quantity);
    navigate('/checkout');
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, Math.min(product.stockCount, prev + change)));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleReviewSubmit = (reviewData) => {
    setReviews([...reviews, { ...reviewData, date: new Date().toISOString(), helpful: 0 }]);
  };

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: product.category, path: `/category/${product.category.toLowerCase()}` },
            { label: product.subcategory, path: `/category/${product.subcategory.toLowerCase()}` },
            { label: product.name, path: `/product/${product.id}` },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <p className="text-sm text-jumia-gray mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-jumia-orange'
                          : i < product.rating
                          ? 'text-jumia-orange opacity-50'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-jumia-gray">
                  {product.rating} ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-4xl font-bold text-jumia-orange">
                  ₵{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-jumia-gray line-through">
                    ₵{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.discount && (
                <p className="text-sm text-jumia-green font-medium">
                  You save ₵{(product.originalPrice - product.price).toLocaleString()} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <div className="flex items-center space-x-2 text-jumia-green">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span className="font-medium">
                    In Stock ({product.stockCount} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-jumia-red">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-jumia-light-gray disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stockCount}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stockCount, parseInt(e.target.value) || 1)))}
                  className="w-20 text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                  className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-jumia-light-gray disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-jumia-orange text-white py-4 rounded-lg font-medium hover:bg-jumia-orange-dark transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="w-full border-2 border-jumia-orange text-jumia-orange py-4 rounded-lg font-medium hover:bg-jumia-orange hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Share and SKU */}
            <div className="flex items-center justify-between pt-6 border-t">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 text-jumia-gray hover:text-jumia-orange transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>Share</span>
              </button>
              <p className="text-sm text-jumia-gray">
                SKU: <span className="font-medium">{product.sku}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Product Description & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-100 pb-3">
                    <div className="w-1/3 font-medium text-gray-700">{key}</div>
                    <div className="w-2/3 text-jumia-gray">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <ReviewList reviews={reviews} />
            
            {/* Review Form */}
            <div className="mt-6">
              <ReviewForm productId={product.id} onSubmit={handleReviewSubmit} />
            </div>
          </div>

          {/* Delivery & Returns Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-jumia-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Free Delivery</p>
                    <p className="text-jumia-gray">On orders over ₵5,000</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-jumia-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Jumbo Express</p>
                    <p className="text-jumia-gray">Same day delivery available</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-jumia-green flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Secure Packaging</p>
                    <p className="text-jumia-gray">Items are carefully packed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Return Policy</h3>
              <div className="space-y-3 text-sm text-jumia-gray">
                <p>• 7 days return policy</p>
                <p>• Free return shipping</p>
                <p>• Original packaging required</p>
                <p>• Items must be unused</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Warranty</h3>
              <p className="text-sm text-jumia-gray">
                1 year manufacturer warranty included. Extended warranty available.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} showBuyNow={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
