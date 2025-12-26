import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const OrderDetails = () => {
  const { id } = useParams();

  // TODO: Replace with actual API call
  const order = {
    id: id || 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 285000,
    subtotal: 285000,
    deliveryFee: 0,
    items: [
      {
        id: 1,
        name: 'Samsung Galaxy S21 Ultra 256GB',
        quantity: 1,
        price: 285000,
        image: '/placeholder.jpg',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Accra',
      state: 'Greater Accra',
      zipCode: 'GA-123',
      phone: '+233 24 123 4567',
    },
    trackingNumber: 'TRK-123456789',
    estimatedDelivery: '2024-01-20',
  };

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-jumia-green',
      processing: 'bg-blue-500',
      shipped: 'bg-yellow-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Order History', path: '/orders' },
            { label: `Order ${order.id}`, path: `/order/${order.id}` },
          ]}
        />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
          <span
            className={`${getStatusColor(order.status)} text-white text-sm font-bold px-4 py-2 rounded-full`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-4 border-b last:border-0">
                    <div className="w-20 h-20 bg-jumia-light-gray rounded flex-shrink-0">
                      <div className="skeleton w-full h-full"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-jumia-gray">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-jumia-orange">
                        ₵{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-2 text-gray-700">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Tracking */}
            {order.trackingNumber && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tracking Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-jumia-gray">Tracking Number</p>
                    <p className="font-medium text-gray-900">{order.trackingNumber}</p>
                  </div>
                  <Link
                    to="/track-order"
                    className="inline-block text-jumia-orange hover:text-jumia-orange-dark font-medium text-sm"
                  >
                    Track Order →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₵{order.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className={order.deliveryFee === 0 ? 'text-jumia-green' : ''}>
                    {order.deliveryFee === 0 ? 'Free' : `₵${order.deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-jumia-orange">₵{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-jumia-gray">
                <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
                {order.estimatedDelivery && (
                  <p>Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                )}
              </div>
              {order.status === 'delivered' && (
                <button className="w-full mt-4 px-4 py-2 border border-jumia-orange text-jumia-orange rounded-lg hover:bg-jumia-orange hover:text-white transition font-medium">
                  Reorder
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

