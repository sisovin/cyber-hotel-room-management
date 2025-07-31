import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Users, DollarSign, Wifi } from 'lucide-react';

const RoomCard = ({ room }) => {
  return (
    <Link to={`/room/${room.id}`}>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="group bg-cyber-gray/50 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-neon-sm hover:border-neon/50 h-full flex flex-col"
      >
        <div className="relative h-56">
          <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute top-4 right-4 bg-cyber-dark/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-white font-bold text-sm">{room.rating}</span>
            <span className="text-gray-400 text-xs">({room.reviews})</span>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-2 truncate">{room.name}</h3>
          <div className="flex justify-between items-center text-gray-300 mb-4">
            <div className="flex items-center space-x-2">
              <Users size={16} className="text-teal" />
              <span className="text-sm">{room.bedType} Bed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi size={16} className="text-teal" />
              <span className="text-sm">{room.amenities.length} Amenities</span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-auto">
            <div>
              <p className="text-gray-400 text-sm">Starting from</p>
              <p className="text-2xl font-bold text-neon">${room.price}<span className="text-base font-normal text-gray-400">/night</span></p>
            </div>
            <div className="px-6 py-2 font-bold text-black bg-teal rounded-lg transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-teal/40">
              View
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RoomCard;
