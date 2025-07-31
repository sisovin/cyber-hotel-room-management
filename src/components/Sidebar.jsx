import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Building, Calendar, Users, AlertTriangle, MessageSquare, Settings, Power } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/admin/dashboard' },
    { name: 'Rooms', icon: Building, path: '/admin/rooms' },
    { name: 'Bookings', icon: Calendar, path: '/admin/bookings' },
    { name: 'Users', icon: Users, path: '/admin/users' },
    { name: 'Complaints', icon: AlertTriangle, path: '/admin/complaints' },
    { name: 'Feedback', icon: MessageSquare, path: '/admin/feedback' }
  ];

  const handleNavigation = (item) => {
    setCurrentPage(item.name);
    navigate(item.path);
  };

  return (
    <aside className="w-72 bg-cyber-dark bg-opacity-90 backdrop-blur-md border-r border-gray-800 p-6 text-sm relative">
      <div className="absolute inset-0 bg-cyber-noise opacity-20"></div>
      
      <div className="relative z-10">
        {/* Logo */}
        <div className="mb-8">
          <h2 className="text-neon font-bold text-2xl mb-2 animate-pulse-neon">
            CYBER HOTEL
          </h2>
          <div className="h-px bg-gradient-to-r from-neon to-transparent"></div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname === '/admin' && item.path === '/admin/dashboard');
            const IconComponent = item.icon;
            
            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group ${
                  isActive 
                    ? 'bg-neon bg-opacity-20 text-neon border border-neon shadow-neon-sm' 
                    : 'hover:bg-teal hover:bg-opacity-10 hover:text-teal border border-transparent'
                }`}
              >
                <IconComponent 
                  size={18} 
                  className={`${isActive ? 'animate-glow' : 'group-hover:animate-glow'}`} 
                />
                <span className="font-medium tracking-wide">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* System Status */}
        <div className="bg-cyber-gray bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-3">System Status</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">CPU Usage</span>
              <span className="text-teal">34%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-teal h-1 rounded-full shadow-teal" style={{width: '34%'}}></div>
            </div>
            
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Memory</span>
              <span className="text-flame">67%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-flame h-1 rounded-full shadow-flame" style={{width: '67%'}}></div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-6 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-400 hover:text-white transition-colors">
            <Settings size={16} />
            <span className="text-xs">Settings</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-2 text-gray-400 hover:text-flame transition-colors">
            <Power size={16} />
            <span className="text-xs">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
