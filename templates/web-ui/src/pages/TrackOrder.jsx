import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample order data - replace with actual API call
  const sampleOrder = {
    orderNumber: 'ORD-2024-001234',
    status: 'delivered',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-18',
    items: [
      { name: 'Samsung Galaxy S21 Ultra 256GB', quantity: 1, price: 285000 },
      { name: 'Wireless Headphones', quantity: 2, price: 12500 },
    ],
    total: 310000,
    shippingAddress: '123 Main Street, Accra, Ghana',
    trackingHistory: [
      { status: 'Order Placed', date: '2024-01-15 10:30 AM', description: 'Your order has been confirmed' },
      { status: 'Processing', date: '2024-01-15 11:00 AM', description: 'Your order is being prepared' },
      { status: 'Shipped', date: '2024-01-16 09:00 AM', description: 'Your order has been shipped' },
      { status: 'In Transit', date: '2024-01-17 02:00 PM', description: 'Your order is on the way' },
      { status: 'Delivered', date: '2024-01-18 11:30 AM', description: 'Your order has been delivered' },
    ],
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // TODO: Replace with actual API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simulate API response
      if (orderNumber === sampleOrder.orderNumber || orderNumber === '') {
        setOrder(sampleOrder);
      } else {
        setError('Order not found. Please check your order number and try again.');
        setOrder(null);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-jumia-green';
      case 'shipped':
      case 'in transit':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case 'shipped':
      case 'in transit':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-jumia-gray mb-8">Enter your order number and email to track your order status</p>

          {/* Track Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Number
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., ORD-2024-001234"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
                    required
                  />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-jumia-orange text-white py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition disabled:opacity-50"
              >
                {isLoading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>
          </div>

          {/* Order Details */}
          {order && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Order #{order.orderNumber}</h2>
                    <p className="text-jumia-gray">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-white font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-jumia-gray mb-1">Total Amount</p>
                    <p className="text-xl font-bold text-jumia-orange">₵{order.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-jumia-gray mb-1">Delivery Address</p>
                    <p className="text-gray-900">{order.shippingAddress}</p>
                  </div>
                  <div>
                    <p className="text-sm text-jumia-gray mb-1">Expected Delivery</p>
                    <p className="text-gray-900">
                      {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'TBD'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking History</h3>
                <div className="relative">
                  {order.trackingHistory.map((step, index) => {
                    const isLast = index === order.trackingHistory.length - 1;
                    const isActive = step.status.toLowerCase() === order.status.toLowerCase();

                    return (
                      <div key={index} className="flex items-start space-x-4 mb-6 last:mb-0">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          isActive ? 'bg-jumia-orange text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                          {getStatusIcon(step.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-medium ${isActive ? 'text-jumia-orange' : 'text-gray-900'}`}>
                              {step.status}
                            </h4>
                            <span className="text-sm text-jumia-gray">{step.date}</span>
                          </div>
                          <p className="text-jumia-gray">{step.description}</p>
                        </div>
                        {!isLast && (
                          <div className={`absolute left-6 top-12 w-0.5 h-12 ${
                            isActive ? 'bg-jumia-orange' : 'bg-gray-200'
                          }`} style={{ marginLeft: '0' }}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-jumia-gray">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">₵{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/account"
                  className="flex-1 border-2 border-jumia-orange text-jumia-orange py-3 rounded-lg font-medium hover:bg-jumia-orange hover:text-white transition text-center"
                >
                  View Order Details
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition text-center"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;

