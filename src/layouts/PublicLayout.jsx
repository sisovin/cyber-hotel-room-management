import React from 'react';
import { Outlet } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import HomeHeader from '../components/home/HomeHeader';
import HomeFooter from '../components/home/HomeFooter';

const PublicLayout = () => {
  return (
    <div className="relative overflow-x-hidden">
      <ParticleBackground />
      <div className="bg-cyber-grid bg-grid absolute inset-0 opacity-30"></div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <HomeHeader />
        <main className="flex-grow">
          <Outlet />
        </main>
        <HomeFooter />
      </div>
    </div>
  );
};

export default PublicLayout;
