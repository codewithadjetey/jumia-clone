import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Super Deals',
      subtitle: 'Up to 70% Off on Electronics',
      buttonText: 'Shop Now',
      gradient: 'from-jumia-orange to-jumia-orange-dark',
      buttonColor: 'bg-white text-jumia-orange hover:bg-gray-100',
    },
    {
      title: 'Free Delivery',
      subtitle: 'On Orders Over ₵5,000',
      buttonText: 'Shop Now',
      gradient: 'from-jumia-green to-green-600',
      buttonColor: 'bg-white text-jumia-green hover:bg-gray-100',
    },
    {
      title: 'Fashion Sale',
      subtitle: 'New Arrivals - 50% Off',
      buttonText: 'Shop Now',
      gradient: 'from-purple-500 to-pink-500',
      buttonColor: 'bg-white text-purple-500 hover:bg-gray-100',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative bg-jumia-light-gray overflow-hidden">
      <div className="relative h-64 md:h-96">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} flex items-center justify-center transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="text-center text-white px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
              <button className={`${slide.buttonColor} px-8 py-3 rounded-full font-bold transition`}>
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? 'bg-white' : 'bg-white opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
