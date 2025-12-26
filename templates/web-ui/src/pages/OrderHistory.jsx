import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const OrderHistory = () => {
  // TODO: Replace with actual API call
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 285000,
      items: [
        { id: 1, name: 'Samsung Galaxy S21 Ultra 256GB', quantity: 1, price: 285000 },
      ],
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-10',
      status: 'processing',
      total: 125000,
      items: [
        { id: 2, name: 'Wireless Headphones', quantity: 2, price: 12500 },
        { id: 3, name: 'Laptop Bag Premium', quantity: 1, price: 8000 },
      ],
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      delivered: 'bg-jumia-green',
      processing: 'bg-blue-500',
      shipped: 'bg-yellow-500',
      cancelled: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getStatusLabel = (status) => {
    const labels = {
      delivered: 'Delivered',
      processing: 'Processing',
      shipped: 'Shipped',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Order History</h1>

        {orders.length === 0 ? (
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-jumia-gray mb-6">Start shopping to see your orders here</p>
            <Link
              to="/"
              className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">Order #{order.id}</h3>
                      <span
                        className={`${getStatusColor(
                          order.status
                        )} text-white text-xs font-bold px-3 py-1 rounded-full`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-jumia-gray">
                      Placed on {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-2xl font-bold text-jumia-orange">
                      ₵{order.total.toLocaleString()}
                    </p>
                    <Link
                      to={`/order/${order.id}`}
                      className="text-sm text-jumia-orange hover:text-jumia-orange-dark font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {order.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="w-16 h-16 bg-jumia-light-gray rounded">
                          <div className="skeleton w-full h-full"></div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-16 h-16 bg-jumia-light-gray rounded flex items-center justify-center text-xs text-jumia-gray">
                          +{order.items.length - 3} more
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-4">
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 border border-jumia-orange text-jumia-orange rounded-lg hover:bg-jumia-orange hover:text-white transition text-sm font-medium">
                          Reorder
                        </button>
                      )}
                      <Link
                        to={`/order/${order.id}`}
                        className="px-4 py-2 bg-jumia-orange text-white rounded-lg hover:bg-jumia-orange-dark transition text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

