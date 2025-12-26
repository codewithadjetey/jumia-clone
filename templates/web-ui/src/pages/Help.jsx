import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import LiveChat from '../components/LiveChat';

const Help = () => {
  const [activeCategory, setActiveCategory] = useState('shipping');

  const categories = [
    {
      id: 'shipping',
      title: 'Shipping & Delivery',
      questions: [
        {
          q: 'How long does delivery take?',
          a: 'Standard delivery takes 3-5 business days. Express delivery is available for same-day or next-day delivery in select areas.',
        },
        {
          q: 'What are the delivery charges?',
          a: 'Delivery is free for orders over ₵5,000. For orders below this amount, a delivery fee of ₵500 applies.',
        },
        {
          q: 'Can I track my order?',
          a: 'Yes, you can track your order using the tracking number provided in your order confirmation email.',
        },
      ],
    },
    {
      id: 'returns',
      title: 'Returns & Refunds',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 7-day return policy. Items must be unused and in original packaging with tags attached.',
        },
        {
          q: 'How do I return an item?',
          a: 'You can initiate a return from your order history page. We provide free return shipping for eligible items.',
        },
        {
          q: 'How long do refunds take?',
          a: 'Refunds are processed within 5-7 business days after we receive your returned item.',
        },
      ],
    },
    {
      id: 'payment',
      title: 'Payment',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept Visa, Mastercard, PayPal, and Pay on Delivery.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, all payments are processed through secure, encrypted channels. We never store your full card details.',
        },
      ],
    },
  ];

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <Breadcrumbs />
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Help Center</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="font-bold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      activeCategory === category.id
                        ? 'bg-jumia-orange text-white'
                        : 'hover:bg-jumia-light-gray'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {activeCategoryData.title}
              </h2>
              <div className="space-y-4">
                {activeCategoryData.questions.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="font-medium text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-jumia-gray">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Still need help?</h2>
              <p className="text-jumia-gray mb-4">
                Our support team is here to help you. Contact us through any of the following
                methods:
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-jumia-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>support@jumbo.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-jumia-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>+233 24 123 4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LiveChat />
    </div>
  );
};

export default Help;

