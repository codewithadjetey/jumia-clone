import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({ 
  icon, 
  title, 
  message, 
  actionLabel = 'Continue Shopping', 
  actionLink = '/',
  actionOnClick 
}) => {
  const IconComponent = icon;

  return (
    <div className="bg-white rounded-lg p-12 text-center">
      {IconComponent && (
        <div className="flex justify-center mb-4">
          <IconComponent className="w-24 h-24 text-gray-300" />
        </div>
      )}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      {message && <p className="text-jumia-gray mb-6">{message}</p>}
      {actionLink && (
        <Link
          to={actionLink}
          className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition"
        >
          {actionLabel}
        </Link>
      )}
      {actionOnClick && (
        <button
          onClick={actionOnClick}
          className="inline-block bg-jumia-orange text-white px-8 py-3 rounded-lg font-medium hover:bg-jumia-orange-dark transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

