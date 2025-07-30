import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Mail, Phone, MapPin, Calendar, Edit, Trash2, Shield, Star } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Generate mock user data
    const mockUsers = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
      joinDate: faker.date.past({ years: 2 }),
      lastLogin: faker.date.recent(),
      role: faker.helpers.arrayElement(['Guest', 'VIP', 'Admin', 'Staff']),
      status: faker.helpers.arrayElement(['Active', 'Inactive', 'Suspended']),
      totalBookings: faker.number.int({ min: 0, max: 25 }),
      totalSpent: faker.number.int({ min: 0, max: 15000 }),
      rating: faker.number.float({ min: 3.0, max: 5.0, fractionDigits: 1 }),
      avatar: faker.image.avatar()
    }));
    setUsers(mockUsers);
  }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'text-flame bg-flame/20 border-flame/30';
      case 'Staff': return 'text-neon bg-neon/20 border-neon/30';
      case 'VIP': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Guest': return 'text-teal bg-teal/20 border-teal/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/20';
      case 'Inactive': return 'text-gray-400 bg-gray-400/20';
      case 'Suspended': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-gray-400 text-sm">Manage guests, staff, and system users</p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-neon hover:bg-neon/80 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-neon"
          >
            <UsersIcon size={20} />
            <span>Add User</span>
          </motion.button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-cyber-noise opacity-5"></div>
            
            <div className="relative z-10">
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-neon to-teal rounded-xl flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <UsersIcon size={24} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{user.name}</h3>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                      {user.role === 'Admin' && <Shield size={12} className="mr-1" />}
                      {user.role}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-teal transition-colors opacity-0 group-hover:opacity-100">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-flame transition-colors opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Status */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    user.status === 'Active' ? 'bg-green-400' : 
                    user.status === 'Inactive' ? 'bg-gray-400' : 'bg-red-400'
                  } ${user.status === 'Active' ? 'animate-pulse' : ''}`}></div>
                  {user.status}
                </span>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail size={14} className="text-gray-400" />
                  <span className="text-gray-300 truncate">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone size={14} className="text-gray-400" />
                  <span className="text-gray-300">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-gray-300 truncate">{user.address}</span>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-cyber-dark bg-opacity-30 p-3 rounded-lg text-center">
                  <p className="text-teal font-bold text-lg">{user.totalBookings}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Bookings</p>
                </div>
                <div className="bg-cyber-dark bg-opacity-30 p-3 rounded-lg text-center">
                  <p className="text-neon font-bold text-lg">${user.totalSpent.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Total Spent</p>
                </div>
              </div>

              {/* Rating */}
              {user.role === 'Guest' && (
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{user.rating}</span>
                  <span className="text-gray-400 text-sm">Guest Rating</span>
                </div>
              )}

              {/* Metadata */}
              <div className="border-t border-gray-700/50 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    Joined
                  </span>
                  <span>{user.joinDate.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last Login</span>
                  <span>{user.lastLogin.toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Users;
