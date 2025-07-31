import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomeHeader = () => {
  const navItems = ['Rooms', 'Offers', 'Gallery', 'Contact'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-dark/80 backdrop-blur-lg border-b border-neon/20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-neon animate-pulse-neon tracking-widest">
          CYBER-STAY
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item} to="#" className="text-gray-300 hover:text-teal transition-colors duration-300 tracking-wide">
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/admin/dashboard">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px #00CED1' }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 text-sm font-bold text-black bg-teal rounded-md transition-all duration-300 shadow-lg shadow-teal/30"
            >
              Admin Login
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
