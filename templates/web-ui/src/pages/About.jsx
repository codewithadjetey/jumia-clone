import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const About = () => {
  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Jumbo</h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Jumbo is Ghana's leading online shopping destination, offering a wide range of
                products from electronics and fashion to home goods and groceries. Founded with the
                mission to make shopping convenient and accessible for everyone, we've grown to
                become a trusted name in e-commerce.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To provide our customers with the best shopping experience, offering quality
                products at competitive prices with fast and reliable delivery service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-jumia-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Wide selection of products from trusted brands</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-jumia-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Fast and reliable delivery across Ghana</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-jumia-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Secure payment options</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-jumia-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span>Excellent customer service</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

