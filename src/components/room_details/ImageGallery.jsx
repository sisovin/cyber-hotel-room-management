import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ images, roomName }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <motion.div 
        layout
        className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-gray-700/50"
      >
        <AnimatePresence>
          <motion.img
            key={selectedImage}
            src={selectedImage}
            alt={roomName}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </motion.div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`cursor-pointer rounded-lg overflow-hidden aspect-square border-2 transition-all duration-300 ${
              selectedImage === image ? 'border-neon shadow-neon-sm' : 'border-gray-600 hover:border-teal'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={image} alt={`${roomName} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
