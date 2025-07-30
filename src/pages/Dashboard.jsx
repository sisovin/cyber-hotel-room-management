import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Building, AlertTriangle, MessageSquare, DollarSign, Clock } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Simulate real-time data updates
    const updateStats = () => {
      setStats({
        totalRooms: 120,
        bookedRooms: faker.number.int({ min: 70, max: 110 }),
        availableRooms: faker.number.int({ min: 10, max: 50 }),
        complaints: faker.number.int({ min: 5, max: 25 }),
        feedbacks: faker.number.int({ min: 20, max: 60 }),
        revenue: faker.number.float({ min: 50000, max: 150000, fractionDigits: 0 }),
        occupancyRate: faker.number.float({ min: 60, max: 95, fractionDigits: 1 }),
        avgStayDuration: faker.number.float({ min: 2.1, max: 4.8, fractionDigits: 1 })
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 5000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: 'Total Rooms',
      value: stats.totalRooms,
      icon: Building,
      color: 'text-neon',
      bgColor: 'from-neon/20 to-neon/5',
      trend: { value: 0, direction: 'stable' }
    },
    {
      title: 'Booked Rooms',
      value: stats.bookedRooms,
      icon: Users,
      color: 'text-teal',
      bgColor: 'from-teal/20 to-teal/5',
      trend: { value: 12, direction: 'up' }
    },
    {
      title: 'Available Rooms',
      value: stats.availableRooms,
      icon: Building,
      color: 'text-green-400',
      bgColor: 'from-green-400/20 to-green-400/5',
      trend: { value: 8, direction: 'down' }
    },
    {
      title: 'Active Complaints',
      value: stats.complaints,
      icon: AlertTriangle,
      color: 'text-flame',
      bgColor: 'from-flame/20 to-flame/5',
      trend: { value: 3, direction: 'down' }
    },
    {
      title: 'New Feedbacks',
      value: stats.feedbacks,
      icon: MessageSquare,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-400/20 to-yellow-400/5',
      trend: { value: 15, direction: 'up' }
    },
    {
      title: 'Revenue Today',
      value: `$${stats.revenue?.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bgColor: 'from-emerald-400/20 to-emerald-400/5',
      trend: { value: 23, direction: 'up' }
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'from-blue-400/20 to-blue-400/5',
      trend: { value: 5.2, direction: 'up' }
    },
    {
      title: 'Avg Stay Duration',
      value: `${stats.avgStayDuration} days`,
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'from-purple-400/20 to-purple-400/5',
      trend: { value: 0.3, direction: 'up' }
    }
  ];

  const recentActivities = [
    { id: 1, type: 'booking', message: 'New booking for Room 205', time: '2 mins ago', color: 'text-teal' },
    { id: 2, type: 'checkout', message: 'Guest checked out from Room 312', time: '5 mins ago', color: 'text-green-400' },
    { id: 3, type: 'complaint', message: 'Maintenance request for Room 108', time: '8 mins ago', color: 'text-flame' },
    { id: 4, type: 'feedback', message: 'New 5-star review received', time: '12 mins ago', color: 'text-yellow-400' },
    { id: 5, type: 'booking', message: 'VIP suite reserved for next week', time: '15 mins ago', color: 'text-neon' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${card.bgColor} backdrop-blur-md p-6 rounded-xl border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-cyber-noise opacity-5"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <IconComponent className={`${card.color} group-hover:animate-glow`} size={24} />
                  {card.trend && (
                    <div className={`flex items-center space-x-1 text-xs ${
                      card.trend.direction === 'up' ? 'text-green-400' : 
                      card.trend.direction === 'down' ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {card.trend.direction === 'up' ? (
                        <TrendingUp size={12} />
                      ) : card.trend.direction === 'down' ? (
                        <TrendingDown size={12} />
                      ) : null}
                      <span>{card.trend.value}%</span>
                    </div>
                  )}
                </div>
                
                <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-2">{card.title}</h3>
                <p className={`text-2xl font-bold ${card.color} group-hover:animate-pulse`}>
                  {card.value || '---'}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Activity and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Clock className="mr-2 text-teal" size={20} />
            Real-Time Activity
          </h3>
          
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: activity.id * 0.1 }}
                className="flex items-center justify-between p-3 bg-cyber-dark bg-opacity-30 rounded-lg border border-gray-700/30"
              >
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')} animate-pulse`}></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2 text-neon" size={20} />
            System Overview
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Server Uptime</span>
              <span className="text-teal font-mono">99.8%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-teal h-2 rounded-full shadow-teal" style={{width: '99.8%'}}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Database Performance</span>
              <span className="text-green-400 font-mono">Optimal</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full shadow-green-400/50" style={{width: '94%'}}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active Connections</span>
              <span className="text-neon font-mono">247</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-neon h-2 rounded-full shadow-neon" style={{width: '76%'}}></div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-300">Security Status</span>
              <span className="text-emerald-400 font-mono">Secure</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-emerald-400 h-2 rounded-full shadow-emerald-400/50" style={{width: '100%'}}></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
