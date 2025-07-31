import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Star } from 'lucide-react';

const BookingPanel = ({ price, rating, reviewsCount }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  return (
    <div className="sticky top-28">
      <div className="bg-cyber-gray/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 space-y-6">
        <div className="flex justify-between items-baseline">
          <div>
            <span className="text-3xl font-bold text-neon">${price}</span>
            <span className="text-gray-400">/night</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400" />
            <span className="text-white font-bold">{rating}</span>
            <span className="text-gray-400 text-sm">({reviewsCount} reviews)</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="text-xs text-gray-400 absolute -top-2 left-3 bg-cyber-gray px-1">Check-in</label>
              <input 
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-cyber-dark/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-neon" 
              />
            </div>
            <div className="relative">
              <label className="text-xs text-gray-400 absolute -top-2 left-3 bg-cyber-gray px-1">Check-out</label>
              <input 
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-cyber-dark/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-neon" 
              />
            </div>
          </div>
          <div className="relative">
            <label className="text-xs text-gray-400 absolute -top-2 left-3 bg-cyber-gray px-1">Guests</label>
            <select 
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-cyber-dark/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-neon appearance-none"
            >
              {[1, 2, 3, 4, 5, 6].map(g => <option key={g} value={g}>{g} Guest{g > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px #FF4500' }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-flame text-white font-bold py-4 rounded-lg transition-all duration-300 shadow-lg shadow-flame/40 text-lg"
        >
          Book Now
        </motion.button>

        <div className="text-center text-sm text-gray-400">
          You won't be charged yet
        </div>

        <div className="space-y-3 pt-4 border-t border-gray-700">
          <div className="flex justify-between text-gray-300">
            <span>${price} x 5 nights</span>
            <span>${price * 5}</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Service fee</span>
            <span>$120</span>
          </div>
          <div className="flex justify-between font-bold text-white pt-3 border-t border-gray-700">
            <span>Total</span>
            <span>${price * 5 + 120}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;
