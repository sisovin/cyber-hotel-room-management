import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, Search, Keyboard } from 'lucide-react';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (query) searchParams.append('q', query);
    if (checkIn) searchParams.append('checkin', checkIn);
    if (checkOut) searchParams.append('checkout', checkOut);
    if (guests) searchParams.append('guests', guests);
    
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-4xl mx-auto bg-cyber-gray/50 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        <div className="relative lg:col-span-2">
          <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search for suites, pods, lofts..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-cyber-dark/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neon" 
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            placeholder="Check-in"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full bg-cyber-dark/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neon" 
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => (e.target.type = 'text')}
            placeholder="Check-out"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full bg-cyber-dark/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-neon" 
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px #FF4500' }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-flame text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-flame/40"
        >
          <Search size={20} />
          <span>Search</span>
        </motion.button>
      </div>
    </form>
  );
};

export default SearchForm;
