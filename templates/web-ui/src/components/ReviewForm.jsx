import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

const ReviewForm = ({ productId, onSubmit }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
    name: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit({ ...formData, productId });
      }
      
      showToast('Review submitted successfully!', 'success');
      setFormData({
        rating: 5,
        title: '',
        comment: '',
        name: '',
        email: '',
      });
    } catch (error) {
      showToast('Failed to submit review. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingChange(rating)}
              className={`text-3xl transition ${
                rating <= formData.rating
                  ? 'text-jumia-orange'
                  : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Review Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
        />
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review *</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          rows="5"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-jumia-orange text-white py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;

