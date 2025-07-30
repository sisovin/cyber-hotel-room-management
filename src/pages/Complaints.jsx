import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, CheckCircle, XCircle, User, MapPin, MessageSquare, Calendar } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  useEffect(() => {
    // Generate mock complaint data
    const mockComplaints = Array.from({ length: 18 }, (_, i) => ({
      id: `CP${1000 + i}`,
      guestName: faker.person.fullName(),
      roomNumber: faker.number.int({ min: 101, max: 350 }).toString(),
      subject: faker.helpers.arrayElement([
        'Noisy neighbors',
        'Air conditioning not working',
        'Dirty bathroom',
        'WiFi connection issues',
        'Room service delay',
        'Broken TV remote',
        'Leaking faucet',
        'Uncomfortable bed',
        'Poor room service',
        'Housekeeping issues'
      ]),
      description: faker.lorem.paragraph(),
      priority: faker.helpers.arrayElement(['Low', 'Medium', 'High', 'Critical']),
      status: faker.helpers.arrayElement(['Open', 'In Progress', 'Resolved', 'Closed']),
      submittedDate: faker.date.recent({ days: 15 }),
      assignedTo: faker.person.fullName(),
      category: faker.helpers.arrayElement(['Maintenance', 'Housekeeping', 'Service', 'Amenities', 'Noise', 'Other']),
      resolutionDate: faker.helpers.maybe(() => faker.date.recent({ days: 5 }), 0.4)
    }));
    setComplaints(mockComplaints);
  }, []);

  const filteredComplaints = complaints.filter(complaint => {
    if (filterStatus !== 'all' && complaint.status !== filterStatus) return false;
    if (filterPriority !== 'all' && complaint.priority !== filterPriority) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'In Progress': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'Resolved': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'Closed': return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'text-flame bg-flame/20';
      case 'High': return 'text-red-400 bg-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'Low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Maintenance': return 'text-flame';
      case 'Housekeeping': return 'text-teal';
      case 'Service': return 'text-neon';
      case 'Amenities': return 'text-yellow-400';
      case 'Noise': return 'text-red-400';
      case 'Other': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Open': return XCircle;
      case 'In Progress': return Clock;
      case 'Resolved': return CheckCircle;
      case 'Closed': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Complaint Management</h2>
          <p className="text-gray-400 text-sm">Track and resolve guest complaints efficiently</p>
        </div>
        
        <div className="flex space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal focus:shadow-teal"
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
          
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon focus:shadow-neon"
          >
            <option value="all">All Priority</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Complaints', value: complaints.length, color: 'text-neon' },
          { label: 'Open Issues', value: complaints.filter(c => c.status === 'Open').length, color: 'text-red-400' },
          { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, color: 'text-yellow-400' },
          { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: 'text-green-400' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-4 rounded-lg border border-gray-700/50"
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint, index) => {
          const StatusIcon = getStatusIcon(complaint.status);
          const daysSinceSubmitted = Math.floor((new Date() - complaint.submittedDate) / (1000 * 60 * 60 * 24));
          
          return (
            <motion.div
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyber-noise opacity-5"></div>
              
              <div className="relative z-10">
                {/* Complaint Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-flame to-red-400 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{complaint.subject}</h3>
                      <p className="text-gray-400">ID: {complaint.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(complaint.status)}`}>
                      <StatusIcon size={16} />
                      <span className="text-sm font-medium">{complaint.status}</span>
                    </div>
                    <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority} Priority
                    </div>
                  </div>
                </div>

                {/* Complaint Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Guest Information */}
                  <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                      <User size={14} className="mr-1" />
                      Guest Details
                    </h4>
                    <p className="text-white font-medium">{complaint.guestName}</p>
                    <p className="text-teal text-sm">Room {complaint.roomNumber}</p>
                  </div>

                  {/* Category */}
                  <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                      <MessageSquare size={14} className="mr-1" />
                      Category
                    </h4>
                    <p className={`font-medium ${getCategoryColor(complaint.category)}`}>{complaint.category}</p>
                  </div>

                  {/* Timeline */}
                  <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Timeline
                    </h4>
                    <p className="text-white text-sm">Submitted: {complaint.submittedDate.toLocaleDateString()}</p>
                    <p className="text-gray-400 text-xs">{daysSinceSubmitted} days ago</p>
                  </div>

                  {/* Assignment */}
                  <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Assigned To</h4>
                    <p className="text-white font-medium">{complaint.assignedTo}</p>
                    {complaint.resolutionDate && (
                      <p className="text-green-400 text-xs">Resolved: {complaint.resolutionDate.toLocaleDateString()}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg mb-4">
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-white text-sm leading-relaxed">{complaint.description}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    Last updated: {complaint.submittedDate.toLocaleDateString()}
                  </div>
                  <div className="flex space-x-3">
                    {complaint.status === 'Open' && (
                      <button className="text-yellow-400 hover:text-yellow-400/80 transition-colors text-sm">
                        Start Progress
                      </button>
                    )}
                    {complaint.status === 'In Progress' && (
                      <button className="text-green-400 hover:text-green-400/80 transition-colors text-sm">
                        Mark Resolved
                      </button>
                    )}
                    <button className="text-teal hover:text-teal/80 transition-colors text-sm">
                      View Details
                    </button>
                    <button className="text-neon hover:text-neon/80 transition-colors text-sm">
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredComplaints.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No complaints found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Complaints;
