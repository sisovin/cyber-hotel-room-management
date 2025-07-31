import React from 'react';
import { Star, Wifi, Droplets, Dumbbell, Sun, BedDouble } from 'lucide-react';

const amenitiesList = [
  { name: 'Wifi', icon: Wifi },
  { name: 'Pool', icon: Droplets },
  { name: 'Spa', icon: Droplets },
  { name: 'Gym', icon: Dumbbell },
  { name: 'Balcony', icon: Sun },
];

const FilterSidebar = ({ filters, setFilters }) => {
  const handlePriceChange = (e) => {
    setFilters({ ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] });
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, rating: filters.rating === rating ? 0 : rating });
  };

  const handleAmenityChange = (amenity) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    setFilters({ ...filters, amenities: newAmenities });
  };
  
  const handleReset = () => {
    setFilters({
      priceRange: [0, 1500],
      rating: 0,
      amenities: [],
      bedType: 'all',
    });
  };

  return (
    <div className="space-y-8 bg-cyber-gray/30 backdrop-blur-md p-6 rounded-xl border border-gray-700/50">
      {/* Price Range */}
      <div>
        <h4 className="font-bold text-white mb-4 tracking-wider">Price Range</h4>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="1500"
            step="50"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-neon"
          />
          <div className="flex justify-between text-sm text-gray-300">
            <span>$0</span>
            <span className="font-bold text-neon">${filters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Guest Rating */}
      <div>
        <h4 className="font-bold text-white mb-4 tracking-wider">Guest Rating</h4>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`flex-1 flex items-center justify-center p-2 rounded-lg border transition-all ${
                filters.rating >= rating
                  ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                  : 'bg-cyber-dark/50 border-gray-600 hover:border-yellow-400'
              }`}
            >
              <span className="font-bold">{rating}</span>
              <Star size={14} className="ml-1 fill-current" />
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="font-bold text-white mb-4 tracking-wider">Amenities</h4>
        <div className="grid grid-cols-2 gap-3">
          {amenitiesList.map((amenity) => {
            const Icon = amenity.icon;
            const isSelected = filters.amenities.includes(amenity.name);
            return (
              <button
                key={amenity.name}
                onClick={() => handleAmenityChange(amenity.name)}
                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-teal/20 border-teal text-teal'
                    : 'bg-cyber-dark/50 border-gray-600 hover:border-teal'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm">{amenity.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Bed Type */}
      <div>
        <h4 className="font-bold text-white mb-4 tracking-wider">Bed Type</h4>
        <select
          value={filters.bedType}
          onChange={(e) => setFilters({...filters, bedType: e.target.value})}
          className="w-full bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg pl-4 pr-8 py-3 text-white focus:outline-none focus:border-neon focus:shadow-neon-sm appearance-none cursor-pointer"
        >
          <option value="all">Any Bed Type</option>
          <option value="King">King</option>
          <option value="Queen">Queen</option>
          <option value="Twin">Twin</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="w-full py-3 bg-flame/20 border border-flame text-flame rounded-lg hover:bg-flame/40 transition-all font-bold"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
