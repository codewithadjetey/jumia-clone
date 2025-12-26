import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const Cart = () => {
  const { showToast } = useToast();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Smartphone 128GB',
      price: 45000,
      originalPrice: 90000,
      quantity: 1,
      image: '/placeholder.jpg',
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 12500,
      originalPrice: 18000,
      quantity: 2,
      image: '/placeholder.jpg',
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    // TODO: Replace with actual API call
    const validCoupons = {
      SAVE20: { discount: 20, minOrder: 10000 },
      SAVE10: { discount: 10, minOrder: 5000 },
    };

    const coupon = validCoupons[couponCode.toUpperCase()];
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (coupon && subtotal >= coupon.minOrder) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon });
      showToast('Coupon applied successfully!', 'success');
    } else {
      showToast('Invalid coupon code or minimum order not met', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    showToast('Coupon removed', 'info');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.discount) / 100)
    : 0;
  const deliveryFee = subtotal > 5000 ? 0 : 500;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-jumia-gray mb-6">Start shopping to add items to your cart</p>
            <Link
              to="/"
              className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-24 h-24 bg-jumia-light-gray rounded-lg flex-shrink-0">
                      <div className="skeleton w-full h-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-lg font-bold text-jumia-orange">
                          ₵{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-jumia-gray line-through">
                            ₵{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Quantity:</span>
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 py-1 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-md sticky top-20">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                
                {/* Coupon Code */}
                <div className="mb-4 pb-4 border-b">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-jumia-green bg-opacity-10 p-3 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-jumia-green">{appliedCoupon.code}</p>
                        <p className="text-xs text-jumia-gray">{appliedCoupon.discount}% off</p>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange text-sm"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-jumia-orange text-white rounded-lg hover:bg-jumia-orange-dark transition text-sm font-medium"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₵{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-jumia-green">
                      <span>Discount</span>
                      <span>-₵{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? <span className="text-jumia-green">Free</span> : `₵${deliveryFee.toLocaleString()}`}</span>
                  </div>
                  {subtotal < 5000 && (
                    <p className="text-sm text-jumia-green">
                      Add ₵{(5000 - subtotal).toLocaleString()} more for free delivery!
                    </p>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-jumia-orange">₵{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full bg-jumia-orange text-white text-center py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition mb-3"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/"
                  className="block w-full border border-jumia-orange text-jumia-orange text-center py-3 rounded-lg font-medium hover:bg-jumia-orange hover:text-white transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
