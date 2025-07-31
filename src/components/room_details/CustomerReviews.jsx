import React from 'react';
import { Star } from 'lucide-react';

const CustomerReviews = ({ reviews }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ));
  };

  return (
    <div className="bg-cyber-gray/30 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">Guest Reviews</h2>
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="flex space-x-4">
            <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full border-2 border-teal" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div>
                  <p className="font-bold text-white">{review.author}</p>
                  <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
