import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = [
    {
      id: 1,
      name: 'Smartphone 128GB',
      price: 45000,
      originalPrice: 90000,
      discount: 50,
      rating: 5,
      reviews: 234,
      badges: [],
      onAddToCart: (id) => console.log('Add to cart:', id),
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 12500,
      originalPrice: 18000,
      discount: 30,
      rating: 4,
      reviews: 189,
      badges: [{ type: 'express', text: 'Express' }],
      onAddToCart: (id) => console.log('Add to cart:', id),
    },
    {
      id: 3,
      name: 'Laptop Bag Premium',
      price: 8000,
      originalPrice: 13500,
      discount: 40,
      rating: 5,
      reviews: 456,
      badges: [],
      onAddToCart: (id) => console.log('Add to cart:', id),
    },
    {
      id: 4,
      name: 'Smart Watch Series 5',
      price: 35000,
      originalPrice: 47000,
      discount: 25,
      rating: 4,
      reviews: 312,
      badges: [],
      onAddToCart: (id) => console.log('Add to cart:', id),
    },
    {
      id: 5,
      name: 'Bluetooth Speaker',
      price: 6500,
      originalPrice: 16000,
      discount: 60,
      rating: 5,
      reviews: 567,
      badges: [],
      onAddToCart: (id) => console.log('Add to cart:', id),
    },
    {
      id: 6,
      name: 'Power Bank 20000mAh',
      price: 9800,
      originalPrice: 15000,
      discount: 35,
      rating: 4,
      reviews: 423,
      badges: [],
      onAddToCart: (id) => console.log('Add to cart:', id),
    },
  ];

  const formatTime = (value) => String(value).padStart(2, '0');

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="bg-jumia-orange text-white px-6 py-4 rounded-t-lg flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">⚡ Flash Sales</h2>
            <div className="flex items-center space-x-2 text-sm">
              <span>Ends in:</span>
              <div className="bg-white text-jumia-orange px-2 py-1 rounded font-bold">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>
          <Link to="/flash-sales" className="text-sm underline hover:no-underline">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible">
          {flashProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
