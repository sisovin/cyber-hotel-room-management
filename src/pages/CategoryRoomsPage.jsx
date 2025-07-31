import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { SlidersHorizontal, X } from 'lucide-react';

import FilterSidebar from '../components/rooms_listing/FilterSidebar';
import RoomCard from '../components/rooms_listing/RoomCard';
import Pagination from '../components/rooms_listing/Pagination';

const generateMockRooms = (categoryName, count = 50) => {
  return Array.from({ length: count }, (_, i) => ({
    id: faker.string.uuid(),
    name: `${faker.helpers.arrayElement(['Nexus', 'Vortex', 'Oracle', 'Aura', 'Elysian'])} ${i + 1}`,
    category: categoryName,
    price: faker.number.int({ min: 150, max: 1200 }),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    amenities: faker.helpers.arrayElements(['Wifi', 'Pool', 'Spa', 'Gym', 'Balcony', 'Smart TV'], { min: 2, max: 5 }),
    bedType: faker.helpers.arrayElement(['King', 'Queen', 'Twin']),
    image: `https://source.unsplash.com/random/400x400?futuristic,room,${i}`,
    reviews: faker.number.int({ min: 10, max: 500 }),
  }));
};

const CategoryRoomsPage = () => {
  const { categoryName } = useParams();
  const formattedCategoryName = categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const [rooms, setRooms] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1500],
    rating: 0,
    amenities: [],
    bedType: 'all',
  });
  const [sortOption, setSortOption] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 9;

  useEffect(() => {
    setRooms(generateMockRooms(formattedCategoryName));
    window.scrollTo(0, 0);
  }, [formattedCategoryName]);

  const filteredAndSortedRooms = useMemo(() => {
    let filtered = rooms
      .filter(room => room.price >= filters.priceRange[0] && room.price <= filters.priceRange[1])
      .filter(room => room.rating >= filters.rating)
      .filter(room => filters.amenities.every(amenity => room.amenities.includes(amenity)))
      .filter(room => filters.bedType === 'all' || room.bedType === filters.bedType);

    switch (sortOption) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'recommended'
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }
    return filtered;
  }, [rooms, filters, sortOption]);

  const totalPages = Math.ceil(filteredAndSortedRooms.length / roomsPerPage);
  const currentRooms = filteredAndSortedRooms.slice((currentPage - 1) * roomsPerPage, currentPage * roomsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption]);

  return (
    <div className="container mx-auto px-6 py-12 pt-32">
      {/* Page Header */}
      <div className="text-center mb-12">
        <p className="text-teal mb-2">Explore Our Collection</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter">
          {formattedCategoryName}
        </h1>
      </div>

      <div className="flex">
        {/* Filters Sidebar (Desktop) */}
        <aside className="hidden lg:block w-1/4 pr-8">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-cyber-gray/50 backdrop-blur-md p-4 rounded-xl border border-gray-700/50">
            <p className="text-gray-300 mb-4 md:mb-0">
              Showing <span className="text-white font-bold">{currentRooms.length}</span> of <span className="text-white font-bold">{filteredAndSortedRooms.length}</span> results
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-cyber-light rounded-lg border border-gray-600 hover:border-neon transition"
              >
                <SlidersHorizontal size={16} />
                <span>Filters</span>
              </button>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-cyber-dark bg-opacity-50 border border-gray-600 rounded-lg pl-4 pr-8 py-2 text-white focus:outline-none focus:border-teal focus:shadow-teal appearance-none cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {/* Rooms Grid */}
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {currentRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredAndSortedRooms.length === 0 && (
            <div className="text-center py-24">
              <h3 className="text-2xl font-bold text-white">No Rooms Found</h3>
              <p className="text-gray-400 mt-2">Try adjusting your filters to find your perfect stay.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </main>
      </div>

      {/* Filter Modal (Mobile/Tablet) */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden flex justify-end"
            onClick={() => setIsFilterOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full max-w-sm h-full bg-cyber-dark p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Filters</h3>
                <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryRoomsPage;
