import React from 'react';
import HeroSlider from '../components/HeroSlider';
import FlashSales from '../components/FlashSales';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = () => {
  return (
    <>
      <HeroSlider />
      <FlashSales />
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
};

export default Home;
