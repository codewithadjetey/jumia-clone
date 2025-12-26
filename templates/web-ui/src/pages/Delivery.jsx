import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const Delivery = () => {
  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Delivery Information</h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Options</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-jumia-orange pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">Standard Delivery</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Duration:</strong> 3-5 business days
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Cost:</strong> Free for orders over ₵5,000 | ₵500 for orders below ₵5,000
                  </p>
                  <p className="text-gray-700">
                    Standard delivery is available nationwide. Orders are processed within 24 hours
                    and delivered within 3-5 business days.
                  </p>
                </div>

                <div className="border-l-4 border-jumia-green pl-4">
                  <h3 className="font-bold text-gray-900 mb-2">Jumbo Express</h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Duration:</strong> Same day or next day delivery
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Cost:</strong> ₵1,500
                  </p>
                  <p className="text-gray-700">
                    Available in select areas. Orders placed before 12 PM can be delivered the same
                    day. Orders placed after 12 PM will be delivered the next day.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Areas</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We deliver to all major cities and towns across Ghana. Standard delivery is
                available nationwide, while Jumbo Express is currently available in:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Greater Accra Region</li>
                <li>Ashanti Region (Kumasi)</li>
                <li>Western Region (Takoradi)</li>
                <li>Central Region (Cape Coast)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Your Order</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Once your order is shipped, you'll receive a tracking number via email and SMS. You
                can track your order status in real-time through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Your order confirmation email</li>
                <li>Your account order history</li>
                <li>Our Track Order page</li>
                <li>SMS notifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Instructions</h2>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>•</strong> Please ensure someone is available to receive the delivery at
                  the specified address.
                </p>
                <p>
                  <strong>•</strong> Our delivery team will contact you before delivery to confirm
                  your availability.
                </p>
                <p>
                  <strong>•</strong> For security reasons, we may require ID verification upon
                  delivery.
                </p>
                <p>
                  <strong>•</strong> If you're not available, we'll attempt delivery again the next
                  business day.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Delivery Support</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about your delivery or need to change your delivery
                address, please contact our customer support team:
              </p>
              <div className="mt-4 space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong> delivery@jumbo.com
                </p>
                <p>
                  <strong>Phone:</strong> +233 24 123 4567
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Saturday, 8 AM - 8 PM
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;

