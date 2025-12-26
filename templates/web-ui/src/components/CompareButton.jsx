import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompareButton = ({ product, compareList = [], onAddToCompare, maxItems = 3 }) => {
  const navigate = useNavigate();
  const isInCompare = compareList.some((p) => p.id === product.id);

  const handleClick = () => {
    if (isInCompare) {
      navigate('/compare');
    } else {
      if (compareList.length >= maxItems) {
        alert(`You can only compare up to ${maxItems} products. Please remove one first.`);
        return;
      }
      if (onAddToCompare) {
        onAddToCompare(product);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition text-sm font-medium ${
        isInCompare
          ? 'bg-jumia-orange text-white'
          : 'border border-jumia-orange text-jumia-orange hover:bg-jumia-orange hover:text-white'
      }`}
      title={isInCompare ? 'View Comparison' : 'Add to Compare'}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
        />
      </svg>
      <span>{isInCompare ? 'Comparing' : 'Compare'}</span>
    </button>
  );
};

export default CompareButton;

