import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const AmenitiesList = ({ amenities }) => {
  return (
    <div className="bg-cyber-gray/30 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">Amenities Included</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {amenities.map((amenity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center space-x-3"
          >
            <CheckCircle className="text-neon" size={20} />
            <span className="text-gray-300">{amenity}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesList;
