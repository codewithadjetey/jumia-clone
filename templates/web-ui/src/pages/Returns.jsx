import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const Returns = () => {
  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Returns & Refunds</h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We offer a 7-day return policy on most items. Items must be unused, in original
                packaging, and with all tags attached.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Items must be returned within 7 days of delivery</li>
                <li>Original packaging and tags must be included</li>
                <li>Items must be unused and in original condition</li>
                <li>Free return shipping for eligible items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Return</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Log in to your account and go to Order History</li>
                <li>Select the order you want to return</li>
                <li>Click "Return Item" and follow the instructions</li>
                <li>Print the return label and attach it to your package</li>
                <li>Drop off at any designated return location</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Process</h2>
              <p className="text-gray-700 leading-relaxed">
                Refunds are processed within 5-7 business days after we receive your returned item.
                The refund will be issued to your original payment method.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Returns;

