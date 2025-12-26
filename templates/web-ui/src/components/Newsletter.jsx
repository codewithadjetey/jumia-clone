import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const Newsletter = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast('Successfully subscribed to newsletter!', 'success');
      setEmail('');
    } catch (error) {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-jumia-orange text-white py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
          <p className="mb-6 text-white opacity-90">
            Get the latest deals, offers, and updates delivered to your inbox
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-jumia-orange px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;

