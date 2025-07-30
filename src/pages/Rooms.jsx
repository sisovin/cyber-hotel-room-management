import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Edit, Trash2, Wifi, Tv, Coffee, Bed, Users, DollarSign } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    // Generate mock room data
    const mockRooms = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      number: (100 + i + 1).toString(),
      type: faker.helpers.arrayElement(['Standard', 'Deluxe', 'Suite', 'Presidential']),
      status: faker.helpers.arrayElement(['available', 'occupied', 'maintenance', 'cleaning']),
      price: faker.number.int({ min: 80, max: 500 }),
      capacity: faker.number.int({ min: 1, max: 4 }),
      amenities: faker.helpers.arrayElements(['Wifi', 'TV', 'Coffee', 'Minibar', 'Balcony', 'AC'], { min: 3, max: 6 }),
      lastCleaned: faker.date.recent(),
      guest: faker.helpers.arrayElement([null, faker.person.fullName()])
    }));
    setRooms(mockRooms);
    setFilteredRooms(mockRooms);
  }, []);

  useEffect(() => {
    let filtered = rooms;

    if (searchTerm) {
      filtered = filtered.filter(room => 
        room.number.includes(searchTerm) || 
        room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (room.guest && room.guest.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(room => room.status === filterStatus);
    }

    setFilteredRooms(filtered);
  }, [rooms, searchTerm, filterStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-400/20';
      case 'occupied': return 'text-flame bg-flame/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/20';
      case 'cleaning': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Standard': return 'text-gray-300';
      case 'Deluxe': return 'text-teal';
      case 'Suite': return 'text-neon';
      case 'Presidential': return 'text-flame';
      default: return 'text-gray-300';
    }
  };

  const amenityIcons = {
    'Wifi': Wifi,
    'TV': Tv,
    'Coffee': Coffee,
    'Minibar': Coffee,
    'Balcony': Bed,
    'AC': Users
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Room Management</h2>
          <p className="text-gray-400 text-sm">Manage hotel rooms, availability, and status</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-neon hover:bg-neon/80 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-neon"
        >
          <Plus size={20} />
          <span>Add Room</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50">
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search rooms by number, type, or guest..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-neon focus:shadow-neon-sm transition-all duration-300"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg pl-10 pr-8 py-3 text-white focus:outline-none focus:border-teal focus:shadow-teal appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
              <option value="cleaning">Cleaning</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 hover:shadow-lg transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyber-noise opacity-5"></div>
            
            <div className="relative z-10">
              {/* Room Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Room {room.number}</h3>
                  <p className={`text-sm font-medium ${getTypeColor(room.type)}`}>{room.type}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-teal transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-flame transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>

              {/* Guest Info */}
              {room.guest && (
                <div className="mb-4 p-3 bg-cyber-dark bg-opacity-30 rounded-lg">
                  <p className="text-sm text-gray-300">Current Guest:</p>
                  <p className="text-white font-medium">{room.guest}</p>
                </div>
              )}

              {/* Room Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm flex items-center">
                    <DollarSign size={14} className="mr-1" />
                    Price/Night
                  </span>
                  <span className="text-teal font-bold">${room.price}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm flex items-center">
                    <Users size={14} className="mr-1" />
                    Capacity
                  </span>
                  <span className="text-white">{room.capacity} guests</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Amenities</p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.slice(0, 4).map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Coffee;
                    return (
                      <div key={amenity} className="flex items-center space-x-1 bg-cyber-dark bg-opacity-30 px-2 py-1 rounded">
                        <IconComponent size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-300">{amenity}</span>
                      </div>
                    );
                  })}
                  {room.amenities.length > 4 && (
                    <div className="bg-cyber-dark bg-opacity-30 px-2 py-1 rounded">
                      <span className="text-xs text-gray-400">+{room.amenities.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Last Cleaned */}
              <div className="text-xs text-gray-500">
                Last cleaned: {room.lastCleaned.toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No rooms found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Rooms;
