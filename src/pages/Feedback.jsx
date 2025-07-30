import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, User, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { faker } from '@faker-js/faker';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterRating, setFilterRating] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    // Generate mock feedback data
    const mockFeedbacks = Array.from({ length: 20 }, (_, i) => ({
      id: `FB${1000 + i}`,
      guestName: faker.person.fullName(),
      email: faker.internet.email(),
      roomNumber: faker.number.int({ min: 101, max: 350 }).toString(),
      rating: faker.number.int({ min: 1, max: 5 }),
      subject: faker.helpers.arrayElement([
        'Overall Experience',
        'Room Cleanliness',
        'Staff Service',
        'Food Quality',
        'Amenities',
        'Check-in Process',
        'Location',
        'Value for Money'
      ]),
      message: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement(['Compliment', 'Suggestion', 'General', 'Service Issue']),
      submittedDate: faker.date.recent({ days: 30 }),
      isPublic: faker.datatype.boolean(),
      helpfulVotes: faker.number.int({ min: 0, max: 25 }),
      response: faker.helpers.maybe(() => faker.lorem.sentence(), 0.3),
      respondedBy: faker.helpers.maybe(() => faker.person.fullName(), 0.3),
      tags: faker.helpers.arrayElements(['Excellent Service', 'Clean Room', 'Friendly Staff', 'Great Location', 'Good Value', 'Comfortable'], { min: 1, max: 3 })
    }));
    setFeedbacks(mockFeedbacks);
  }, []);

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filterRating !== 'all' && feedback.rating.toString() !== filterRating) return false;
    if (filterType !== 'all' && feedback.type !== filterType) return false;
    return true;
  });

  const averageRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;
  const ratingDistribution = [1, 2, 3, 4, 5].map(rating => 
    feedbacks.filter(feedback => feedback.rating === rating).length
  );

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 3) return 'text-yellow-400';
    if (rating >= 2) return 'text-orange-400';
    return 'text-red-400';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Compliment': return 'text-green-400 bg-green-400/20';
      case 'Suggestion': return 'text-blue-400 bg-blue-400/20';
      case 'General': return 'text-gray-400 bg-gray-400/20';
      case 'Service Issue': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const renderStars = (rating, size = 16) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={size}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-white">Guest Feedback</h2>
          <p className="text-gray-400 text-sm">Monitor and respond to guest reviews and suggestions</p>
        </div>
        
        <div className="flex space-x-3">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-teal focus:shadow-teal"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon focus:shadow-neon"
          >
            <option value="all">All Types</option>
            <option value="Compliment">Compliments</option>
            <option value="Suggestion">Suggestions</option>
            <option value="General">General</option>
            <option value="Service Issue">Service Issues</option>
          </select>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Average Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="text-neon" size={24} />
            <div className="flex space-x-1">
              {renderStars(Math.round(averageRating))}
            </div>
          </div>
          <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Average Rating</h3>
          <p className="text-3xl font-bold text-neon">{averageRating.toFixed(1)}</p>
          <p className="text-gray-400 text-sm">Based on {feedbacks.length} reviews</p>
        </motion.div>

        {/* Total Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="text-teal" size={24} />
          </div>
          <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Total Feedback</h3>
          <p className="text-3xl font-bold text-teal">{feedbacks.length}</p>
          <p className="text-gray-400 text-sm">This month</p>
        </motion.div>

        {/* Positive Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <ThumbsUp className="text-green-400" size={24} />
          </div>
          <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Positive Reviews</h3>
          <p className="text-3xl font-bold text-green-400">
            {feedbacks.filter(f => f.rating >= 4).length}
          </p>
          <p className="text-gray-400 text-sm">
            {Math.round((feedbacks.filter(f => f.rating >= 4).length / feedbacks.length) * 100)}% of total
          </p>
        </motion.div>

        {/* Response Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-4">
            <User className="text-flame" size={24} />
          </div>
          <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Response Rate</h3>
          <p className="text-3xl font-bold text-flame">
            {Math.round((feedbacks.filter(f => f.response).length / feedbacks.length) * 100)}%
          </p>
          <p className="text-gray-400 text-sm">
            {feedbacks.filter(f => f.response).length} responded
          </p>
        </motion.div>
      </div>

      {/* Rating Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50"
      >
        <h3 className="text-xl font-bold text-white mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-20">
                <span className="text-white">{rating}</span>
                <Star size={16} className="text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getRatingColor(rating).replace('text-', 'bg-')}`}
                  style={{ width: `${(ratingDistribution[rating - 1] / feedbacks.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-400 text-sm w-8">{ratingDistribution[rating - 1]}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedbacks.map((feedback, index) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-cyber-gray bg-opacity-50 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyber-noise opacity-5"></div>
            
            <div className="relative z-10">
              {/* Feedback Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-neon to-teal rounded-lg flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{feedback.guestName}</h3>
                    <p className="text-gray-400">{feedback.subject}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                  <div className="flex space-x-1">
                    {renderStars(feedback.rating)}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(feedback.type)}`}>
                    {feedback.type}
                  </div>
                </div>
              </div>

              {/* Feedback Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-cyber-dark bg-opacity-30 p-3 rounded-lg">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Room</p>
                  <p className="text-white font-medium">{feedback.roomNumber}</p>
                </div>
                <div className="bg-cyber-dark bg-opacity-30 p-3 rounded-lg">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Date</p>
                  <p className="text-white font-medium">{feedback.submittedDate.toLocaleDateString()}</p>
                </div>
                <div className="bg-cyber-dark bg-opacity-30 p-3 rounded-lg">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Helpful Votes</p>
                  <p className="text-teal font-medium">{feedback.helpfulVotes}</p>
                </div>
              </div>

              {/* Feedback Message */}
              <div className="bg-cyber-dark bg-opacity-30 p-4 rounded-lg mb-4">
                <p className="text-white leading-relaxed">{feedback.message}</p>
              </div>

              {/* Tags */}
              {feedback.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {feedback.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-neon bg-opacity-20 text-neon px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Response */}
              {feedback.response && (
                <div className="bg-teal bg-opacity-10 border-l-4 border-teal p-4 rounded-r-lg mb-4">
                  <p className="text-sm text-gray-400 mb-2">Response from {feedback.respondedBy}:</p>
                  <p className="text-white">{feedback.response}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {feedback.isPublic && (
                    <span className="text-xs text-green-400">Public Review</span>
                  )}
                  <span className="text-xs text-gray-500">ID: {feedback.id}</span>
                </div>
                <div className="flex space-x-3">
                  {!feedback.response && (
                    <button className="text-neon hover:text-neon/80 transition-colors text-sm">
                      Respond
                    </button>
                  )}
                  <button className="text-teal hover:text-teal/80 transition-colors text-sm">
                    View Details
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors text-sm">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filteredFeedbacks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No feedback found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;
