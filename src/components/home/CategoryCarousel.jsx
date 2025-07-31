import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Standard Pods', image: 'https://images.unsplash.com/photo-1593763782135-2bf60a2c5973?q=80&w=2070&auto=format&fit=crop', description: 'Efficient, high-tech solo capsules.' },
  { name: 'Deluxe Chambers', image: 'https://images.unsplash.com/photo-1560185893-a5536c80e6da?q=80&w=1974&auto=format&fit=crop', description: 'Spacious rooms with city views.' },
  { name: 'Cyber Suites', image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop', description: 'Luxury suites with integrated tech.' },
  { name: 'Zero-G Lofts', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop', description: 'Experience weightless relaxation.' },
  { name: 'Presidential Matrix', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', description: 'Ultimate luxury and command center.' },
];

const CategoryCarousel = () => {
  const scrollRef = useRef(null);

  return (
    <section className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-white text-center mb-12">Explore Our Accommodations</h2>
      <motion.div ref={scrollRef} className="cursor-grab" whileTap={{ cursor: 'grabbing' }}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -1000 }}
          className="flex space-x-8 pb-4"
        >
          {categories.map((category, index) => (
            <Link to={`/category/${category.name.toLowerCase().replace(/ /g, '-')}`} key={index}>
              <motion.div
                className="group relative w-72 md:w-96 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-700/50 h-96"
                whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(138, 43, 226, 0.3)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-teal">{category.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CategoryCarousel;
