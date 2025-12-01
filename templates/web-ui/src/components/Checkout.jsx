import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'card',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout submitted:', formData);
    // Handle checkout logic here
  };

  const orderSummary = {
    subtotal: 70000,
    deliveryFee: 0,
    total: 70000,
  };

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Delivery Information</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Zip Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-jumia-orange">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-gray-500">Visa, Mastercard, Verve</div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-jumia-orange">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">PayPal</div>
                        <div className="text-sm text-gray-500">Pay with PayPal account</div>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-jumia-orange">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="pod"
                        checked={formData.paymentMethod === 'pod'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium">Pay on Delivery</div>
                        <div className="text-sm text-gray-500">Pay when you receive your order</div>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="border-t pt-4 mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                        <input
                          type="text"
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-jumia-orange text-white py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-md sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₵{orderSummary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-jumia-green">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-jumia-orange">₵{orderSummary.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Link
                to="/cart"
                className="block text-center text-jumia-orange hover:underline text-sm"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
