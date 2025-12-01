import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Account = () => {
  // TODO: Replace with actual authentication state from context/state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+233 24 123 4567',
    avatar: null,
    joinDate: '2024-01-15',
  });

  const handleLogout = () => {
    // TODO: Implement logout logic
    setIsAuthenticated(false);
    console.log('User logged out');
  };

  // If not authenticated, show login/signup options
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-jumia-light-gray py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12 text-center">
            <div className="mb-8">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-jumia-orange bg-opacity-10 mb-4">
                <svg
                  className="h-12 w-12 text-jumia-orange"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Jumia</h1>
              <p className="text-jumia-gray">
                Sign in to your account or create a new one to get started
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link
                to="/login"
                className="flex-1 bg-jumia-orange text-white px-8 py-4 rounded-lg font-medium hover:bg-jumia-orange-dark transition text-center"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="flex-1 border-2 border-jumia-orange text-jumia-orange px-8 py-4 rounded-lg font-medium hover:bg-jumia-orange hover:text-white transition text-center"
              >
                Create Account
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-jumia-gray mb-4">Benefits of creating an account:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-jumia-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Fast Checkout</h3>
                    <p className="text-sm text-jumia-gray">Save your details for quicker purchases</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-jumia-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Order Tracking</h3>
                    <p className="text-sm text-jumia-gray">Track all your orders in one place</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-jumia-orange"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">Exclusive Deals</h3>
                    <p className="text-sm text-jumia-gray">Get access to member-only offers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, show account information
  return (
    <div className="min-h-screen bg-jumia-light-gray py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Information Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                <button className="text-jumia-orange hover:text-jumia-orange-dark font-medium text-sm">
                  Edit
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-jumia-orange bg-opacity-10 flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.firstName}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-jumia-orange">
                      {user.firstName[0]}{user.lastName[0]}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-sm text-jumia-gray">Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={user.firstName}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={user.lastName}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={user.phone}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Address Book */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                <button className="text-jumia-orange hover:text-jumia-orange-dark font-medium text-sm">
                  Add New
                </button>
              </div>
              <div className="text-center py-8 text-jumia-gray">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p>No saved addresses yet</p>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                <Link
                  to="/orders"
                  className="text-jumia-orange hover:text-jumia-orange-dark font-medium text-sm"
                >
                  View All
                </Link>
              </div>
              <div className="text-center py-8 text-jumia-gray">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
                <p>No orders yet</p>
                <Link
                  to="/"
                  className="mt-4 inline-block text-jumia-orange hover:text-jumia-orange-dark font-medium"
                >
                  Start Shopping →
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/orders"
                  className="flex items-center p-3 rounded-lg hover:bg-jumia-light-gray transition"
                >
                  <svg
                    className="h-5 w-5 text-jumia-orange mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span className="text-gray-700">My Orders</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center p-3 rounded-lg hover:bg-jumia-light-gray transition"
                >
                  <svg
                    className="h-5 w-5 text-jumia-orange mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span className="text-gray-700">Wishlist</span>
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center p-3 rounded-lg hover:bg-jumia-light-gray transition"
                >
                  <svg
                    className="h-5 w-5 text-jumia-orange mr-3"
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
                  <span className="text-gray-700">Shopping Cart</span>
                </Link>
                <button className="w-full flex items-center p-3 rounded-lg hover:bg-jumia-light-gray transition">
                  <svg
                    className="h-5 w-5 text-jumia-orange mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-700">Settings</span>
                </button>
              </div>
            </div>

            {/* Account Security */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Account Security</h2>
              <div className="space-y-4">
                <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-jumia-orange hover:bg-jumia-light-gray transition">
                  <div className="font-medium text-gray-900">Change Password</div>
                  <div className="text-sm text-jumia-gray">Update your password</div>
                </button>
                <button className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-jumia-orange hover:bg-jumia-light-gray transition">
                  <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                  <div className="text-sm text-jumia-gray">Add extra security</div>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-50 border border-red-200 text-red-600 py-3 px-4 rounded-lg font-medium hover:bg-red-100 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
