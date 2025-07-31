import React from 'react';
import { motion } from 'framer-motion';
import SearchForm from './SearchForm';

const HeroSection = () => {
  return (
    <section className="container mx-auto px-6 py-24 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4"
      >
        Your <span className="text-neon">Cyberpunk</span> Oasis Awaits
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12"
      >
        Experience luxury redefined. Immerse yourself in a high-tech sanctuary where reality exceeds imagination.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <SearchForm />
      </motion.div>
    </section>
  );
};

export default HeroSection;
