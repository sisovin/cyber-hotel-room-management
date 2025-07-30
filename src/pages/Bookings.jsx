import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, CreditCard, Phone, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    // Generate mock booking data
    const mockBookings = Array.from({ length: 15 }, (_, i) => ({
      id: `BK${1000 + i}`,
      guestName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      roomNumber: faker.number.int({ min: 101, max: 350 }).toString(),
      roomType: faker.helpers.arrayElement(['Standard', 'Deluxe', 'Suite', 'Presidential']),
      checkIn: faker.date.soon({ days: 30 }),
      checkOut: faker.date.soon({ days: 35 }),
      status: faker.helpers.arrayElement(['confirmed', 'pending', 'cancelled', 'completed', 'in-progress']),
      totalAmount: faker.number.int({ min: 200, max: 2500 }),
      paymentStatus: faker.helpers.arrayElement(['paid', 'pending', 'failed']),
      guests: faker.number.int({ min: 1, max: 4 }),
      bookingDate: faker.date.recent({ days: 10 }),
      specialRequests: faker.helpers.maybe(() => faker.lorem.sentence(), 0.3)
    }));
    setBookings(mockBookings);
    setFilteredBookings(mockBookings);
  }, []);

  useEffect(() => {
    let filtered = bookings;
    if (filterStatus !== 'all') {
      filtered = filtered.filter(booking => booking.status === filterStatus);
    }
    setFilteredBookings(filtered);
  }, [bookings, filterStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'cancelled': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'completed': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'in-progress': return 'text-teal bg-teal/20 border-teal/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-emerald-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'pending': return Clock;
      case 'cancelled': return XCircle;
      case 'completed': return CheckCircle;
      case 'in-progress': return AlertCircle;
      default: return Clock;
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Booking Management</h2>
          <p className="text-gray-400 text-sm">View and manage hotel bookings and reservations</p>
        </div>
        
        <div className="flex space-x-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal focus:shadow-teal"
          >
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking, index) => {
          const StatusIcon = getStatusIcon(booking.status);
          const nights = calculateNights(booking.checkIn, booking.checkOut);
          
          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-cyber-noise opacity-5"></div>
              
              <div className="relative z-10">
                {/* Booking Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-neon to-teal rounded-lg flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{booking.guestName}</h3>
                      <p className="text-gray-400">Booking ID: {booking.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${getStatusColor(booking.status)}`}>
                      <StatusIcon size={16} />
                      <span className="text-sm font-medium capitalize">{booking.status.replace('-', ' ')}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-neon">${booking.totalAmount}</p>
                      <p className={`text-sm ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Room Information */}
                  <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                      <MapPin size={14} className="mr-1" />
                      Room Details
                    </h4>
                    <div className="space-y-1">
                      <p className="text-white font-medium">Room {booking.roomNumber}</p>
                      <p className="text-teal text-sm">{booking.roomType}</p>
                      <p className="text-gray-300 text-sm">{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Stay Duration */}
                  <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                      <Calendar size={14} className="mr-1" />
                      Stay Duration
                    </h4>
                    <div className="space-y-1">
                      <p className="text-white text-sm">Check-in: {booking.checkIn.toLocaleDateString()}</p>
                      <p className="text-white text-sm">Check-out: {booking.checkOut.toLocaleDateString()}</p>
                      <p className="text-teal text-sm">{nights} Night{nights > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                      <Phone size={14} className="mr-1" />
                      Contact Info
                    </h4>
                    <div className="space-y-1">
                      <p className="text-white text-sm flex items-center">
                        <Mail size={12} className="mr-1 text-gray-400" />
                        {booking.email}
                      </p>
                      <p className="text-white text-sm flex items-center">
                        <Phone size={12} className="mr-1 text-gray-400" />
                        {booking.phone}
                      </p>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                      <CreditCard size={14} className="mr-1" />
                      Payment Info
                    </h4>
                    <div className="space-y-1">
                      <p className="text-white text-sm">Total: ${booking.totalAmount}</p>
                      <p className="text-gray-300 text-sm">Per night: ${Math.round(booking.totalAmount / nights)}</p>
                      <p className={`text-sm ${getPaymentStatusColor(booking.paymentStatus)}`}>
                        Status: {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div className="mt-4 bg-cyber-dark bg-opacity-30 p-4 rounded-lg">
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Special Requests</h4>
                    <p className="text-white text-sm">{booking.specialRequests}</p>
                  </div>
                )}

                {/* Booking Metadata */}
                <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                  <span>Booked on: {booking.bookingDate.toLocaleDateString()}</span>
                  <div className="flex space-x-4">
                    <button className="text-teal hover:text-teal/80 transition-colors">View Details</button>
                    <button className="text-neon hover:text-neon/80 transition-colors">Edit Booking</button>
                    {booking.status === 'pending' && (
                      <button className="text-green-400 hover:text-green-400/80 transition-colors">Confirm</button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No bookings found</p>
        </div>
      )}
    </div>
  );
};

export default Bookings;
