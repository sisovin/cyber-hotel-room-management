import React from 'react';
import { motion } from 'framer-motion';

const banners = [
  {
    title: 'Rooftop Data-Stream Bar',
    description: 'Sip on bioluminescent cocktails with panoramic city views.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop',
    color: 'neon',
  },
  {
    title: 'Cybernetic Wellness Spa',
    description: 'Rejuvenate your body and mind with our advanced tech therapies.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop',
    color: 'teal',
  },
];

const FeaturedBanners = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {banners.map((banner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group relative h-96 rounded-2xl overflow-hidden border border-gray-700/50"
          >
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
            <div className={`absolute top-0 left-0 h-full w-1 bg-${banner.color} transition-all duration-500 group-hover:w-2 shadow-${banner.color}`}></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className={`text-3xl font-bold text-white mb-2`}>{banner.title}</h3>
              <p className="text-gray-300 max-w-sm">{banner.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-4 px-5 py-2 text-sm font-bold bg-${banner.color} text-black rounded-md transition-all duration-300 shadow-${banner.color}`}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBanners;
