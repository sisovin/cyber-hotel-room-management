import React from 'react';
import PromotionsBar from '../components/home/PromotionsBar';
import HeroSection from '../components/home/HeroSection';
import CategoryCarousel from '../components/home/CategoryCarousel';
import FeaturedBanners from '../components/home/FeaturedBanners';

const HomePage = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      <PromotionsBar />
      <HeroSection />
      <CategoryCarousel />
      <FeaturedBanners />
    </div>
  );
};

export default HomePage;
