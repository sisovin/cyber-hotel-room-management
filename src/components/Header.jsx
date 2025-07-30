import React from 'react';
import { Bell, Search, User, Wifi, Shield, Zap } from 'lucide-react';

const Header = ({ currentPage }) => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-cyber-dark via-cyber-gray to-cyber-dark border-b border-gray-700 backdrop-blur-md relative">
      <div className="absolute inset-0 bg-cyber-noise opacity-10"></div>
      
      <div className="relative z-10 flex-1 flex justify-between items-center">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-neon tracking-wide">
            {currentPage}
          </h1>
          <div className="flex items-center space-x-4 mt-1">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Hotel Management System v2.1
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-teal rounded-full animate-pulse"></div>
              <span className="text-xs text-teal">ONLINE</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search rooms, guests, bookings..."
              className="w-full bg-cyber-gray bg-opacity-50 backdrop-blur-sm border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-neon focus:shadow-neon-sm transition-all duration-300"
            />
          </div>
        </div>

        {/* Status Indicators & User */}
        <div className="flex items-center space-x-6">
          {/* System Indicators */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1" title="Network Status">
              <Wifi size={16} className="text-teal animate-pulse" />
            </div>
            <div className="flex items-center space-x-1" title="Security Status">
              <Shield size={16} className="text-neon" />
            </div>
            <div className="flex items-center space-x-1" title="Power Status">
              <Zap size={16} className="text-yellow-400" />
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-flame rounded-full animate-pulse"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
            <div className="text-right">
              <div className="text-sm font-medium text-white">Admin User</div>
              <div className="text-xs text-gray-400">System Administrator</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-neon to-teal rounded-lg flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
