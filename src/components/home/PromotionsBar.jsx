import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PromotionsBar = () => {
  return (
    <div className="bg-neon/10 border-b-2 border-neon/50 mt-[72px]">
      <div className="container mx-auto px-6 py-2 flex items-center justify-center overflow-hidden">
        <motion.div
          className="flex items-center space-x-12 whitespace-nowrap"
          animate={{ x: ['100%', '-100%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 20,
              ease: 'linear',
            },
          }}
        >
          <p className="text-sm text-teal flex items-center">
            <Zap size={16} className="mr-2 animate-pulse" />
            FLASH SALE: 30% OFF ALL SUITES THIS WEEKEND!
          </p>
          <p className="text-sm text-teal flex items-center">
            <Zap size={16} className="mr-2 animate-pulse" />
            NEW: ANTI-GRAVITY SPA PACKAGES AVAILABLE NOW.
          </p>
          <p className="text-sm text-teal flex items-center">
            <Zap size={16} className="mr-2 animate-pulse" />
            BOOK DIRECTLY AND GET A FREE NEURAL-INTERFACE UPGRADE.
          </p>
          <p className="text-sm text-teal flex items-center">
            <Zap size={16} className="mr-2 animate-pulse" />
            FLASH SALE: 30% OFF ALL SUITES THIS WEEKEND!
          </p>
           <p className="text-sm text-teal flex items-center">
            <Zap size={16} className="mr-2 animate-pulse" />
            NEW: ANTI-GRAVITY SPA PACKAGES AVAILABLE NOW.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PromotionsBar;
