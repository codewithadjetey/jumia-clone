import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is Jumbo?',
          answer: 'Jumbo is an online marketplace offering a wide range of products including electronics, fashion, home & living, health & beauty, groceries, and more. We provide a convenient shopping experience with fast delivery and excellent customer service.',
        },
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking on "Account" in the top navigation, then selecting "Create Account". Fill in your details including name, email, phone number, and password. You can also sign up using your Google or Facebook account.',
        },
        {
          question: 'Is it safe to shop on Jumbo?',
          answer: 'Yes, absolutely! We use secure payment gateways and SSL encryption to protect your personal and payment information. All transactions are processed securely, and we never share your data with third parties.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept various payment methods including credit/debit cards (Visa, Mastercard, Verve), PayPal, and Pay on Delivery. All payment methods are secure and encrypted.',
        },
      ],
    },
    {
      category: 'Orders & Delivery',
      questions: [
        {
          question: 'How long does delivery take?',
          answer: 'Delivery times vary by location. Standard delivery takes 3-5 business days. Jumbo Express offers same-day or next-day delivery for eligible products. Free delivery is available on orders over ₵5,000.',
        },
        {
          question: 'How can I track my order?',
          answer: 'You can track your order by visiting the "Track Your Order" page and entering your order number. You\'ll receive email and SMS updates about your order status throughout the delivery process.',
        },
        {
          question: 'What if I\'m not available to receive my order?',
          answer: 'If you\'re not available, our delivery partner will attempt to contact you. You can also reschedule the delivery or arrange for pickup at a nearby location. Multiple delivery attempts will be made before the order is returned.',
        },
        {
          question: 'Do you deliver internationally?',
          answer: 'Currently, we deliver within Ghana. We\'re working on expanding our delivery network to other countries. Please check our delivery information page for updates.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy for most products. Items must be unused, in original packaging, and with all tags attached. Some products like electronics may have different return policies - please check the product page for details.',
        },
        {
          question: 'How do I return a product?',
          answer: 'To return a product, go to your account page, select the order, and click "Return Item". Fill out the return form and our team will process your request. You\'ll receive a return label and instructions.',
        },
        {
          question: 'How long does it take to process a refund?',
          answer: 'Once we receive your returned item and verify its condition, refunds are processed within 5-7 business days. The refund will be credited to your original payment method.',
        },
        {
          question: 'Can I exchange a product?',
          answer: 'Yes, you can exchange products within 7 days of delivery. Exchanges are subject to product availability. Please contact customer service to initiate an exchange.',
        },
      ],
    },
    {
      category: 'Account & Security',
      questions: [
        {
          question: 'How do I change my password?',
          answer: 'Go to your Account page, then click on "Account Security" and select "Change Password". Enter your current password and your new password. Make sure your new password is at least 8 characters with uppercase, lowercase, and numbers.',
        },
        {
          question: 'I forgot my password. How do I reset it?',
          answer: 'Click on "Login" and then "Forgot Password". Enter your email address and we\'ll send you a password reset link. Click the link in the email to create a new password.',
        },
        {
          question: 'How do I update my personal information?',
          answer: 'Go to your Account page and click "Edit" on your profile information. You can update your name, email, phone number, and address. Changes are saved automatically.',
        },
        {
          question: 'How do I delete my account?',
          answer: 'To delete your account, please contact our customer service team. They will guide you through the process and ensure all your data is properly removed from our systems.',
        },
      ],
    },
    {
      category: 'Products & Shopping',
      questions: [
        {
          question: 'Are the products authentic?',
          answer: 'Yes, all products sold on Jumbo are authentic and come with manufacturer warranties. We work directly with authorized sellers and official stores to ensure product authenticity.',
        },
        {
          question: 'Do you offer product warranties?',
          answer: 'Yes, most products come with manufacturer warranties. Warranty periods vary by product category. Extended warranties are also available for purchase on eligible items.',
        },
        {
          question: 'Can I cancel my order?',
          answer: 'You can cancel your order within 24 hours of placing it, provided it hasn\'t been shipped yet. Go to your order details and click "Cancel Order". Once shipped, you\'ll need to return the item instead.',
        },
        {
          question: 'How do I add items to my wishlist?',
          answer: 'Click the heart icon on any product card or product detail page to add it to your wishlist. You can view and manage your wishlist from your Account page.',
        },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-jumia-light-gray py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h1>
          <p className="text-jumia-gray text-lg">Find answers to common questions about shopping on Jumbo</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-jumia-orange">
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.questions.map((faq, questionIndex) => {
                  const key = `${categoryIndex}-${questionIndex}`;
                  const isOpen = openIndex === key;

                  return (
                    <div key={questionIndex} className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                        className="w-full text-left py-4 flex items-center justify-between hover:text-jumia-orange transition"
                      >
                        <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                        <svg
                          className={`w-5 h-5 text-jumia-orange flex-shrink-0 transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="pb-4 text-jumia-gray leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Still Have Questions Section */}
          <div className="bg-jumia-orange rounded-lg shadow-md p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="mb-6">Can't find the answer you're looking for? Our support team is here to help.</p>
            <a
              href="/contact"
              className="inline-block bg-white text-jumia-orange px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

