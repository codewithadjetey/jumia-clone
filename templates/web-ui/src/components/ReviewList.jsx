import React, { useState } from 'react';

const ReviewList = ({ reviews = [], onFilterChange, onSortChange }) => {
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState('all');

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    if (onSortChange) onSortChange(newSort);
  };

  const handleFilterChange = (rating) => {
    setFilterRating(rating);
    if (onFilterChange) onFilterChange(rating);
  };

  const filteredReviews = reviews.filter((review) => {
    if (filterRating === 'all') return true;
    return Math.floor(review.rating) === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (sortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
          Customer Reviews ({reviews.length})
        </h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Rating</label>
            <select
              value={filterRating}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange text-sm"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jumia-orange text-sm"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review, index) => (
            <div key={index} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-jumia-orange bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-jumia-orange font-bold">
                    {review.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{review.name || 'Anonymous'}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(review.rating)
                                  ? 'text-jumia-orange'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-jumia-gray">
                          {review.date ? new Date(review.date).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                    </div>
                  </div>
                  {review.title && (
                    <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                  )}
                  <p className="text-gray-700">{review.comment}</p>
                  {review.helpful !== undefined && (
                    <div className="mt-3 flex items-center space-x-4">
                      <button className="text-sm text-jumia-gray hover:text-jumia-orange">
                        Helpful ({review.helpful || 0})
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-jumia-gray py-8">No reviews found</p>
        )}
      </div>
    </div>
  );
};

export default ReviewList;

