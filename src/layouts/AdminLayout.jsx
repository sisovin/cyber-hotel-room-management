import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ParticleBackground from '../components/ParticleBackground';

const AdminLayout = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="flex relative overflow-hidden min-h-screen">
      <ParticleBackground />
      <div className="bg-cyber-grid bg-grid absolute inset-0 opacity-30"></div>
      
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-1 flex flex-col relative z-10">
        <Header currentPage={currentPage} />
        
        <main className="p-6 backdrop-blur-md bg-opacity-30 bg-cyber-gray border-l border-gray-700 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
