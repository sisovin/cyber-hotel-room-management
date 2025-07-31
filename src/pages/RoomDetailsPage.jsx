import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import { ArrowLeft } from 'lucide-react';

import ImageGallery from '../components/room_details/ImageGallery';
import RoomSpecs from '../components/room_details/RoomSpecs';
import AmenitiesList from '../components/room_details/AmenitiesList';
import CustomerReviews from '../components/room_details/CustomerReviews';
import BookingPanel from '../components/room_details/BookingPanel';

const generateMockRoomDetails = (roomId) => {
  faker.seed(parseInt(roomId.replace(/\D/g, '')) || 1); // Seed faker for consistent data

  const roomTypes = ['Standard Pod', 'Deluxe Chamber', 'Cyber Suite', 'Zero-G Loft', 'Presidential Matrix'];
  const roomName = `${faker.helpers.arrayElement(['Nexus', 'Vortex', 'Oracle', 'Aura', 'Elysian'])} ${faker.helpers.arrayElement(roomTypes)}`;
  
  return {
    id: roomId,
    name: roomName,
    price: faker.number.int({ min: 150, max: 1200 }),
    rating: faker.number.float({ min: 3.5, max: 5.0, fractionDigits: 1 }),
    reviewsCount: faker.number.int({ min: 10, max: 500 }),
    description: faker.lorem.paragraphs(3),
    images: Array.from({ length: 5 }, (_, i) => `https://source.unsplash.com/random/800x600?futuristic,room,interior,${i}&seed=${roomId}`),
    specs: {
      capacity: faker.number.int({ min: 1, max: 6 }),
      bedType: faker.helpers.arrayElement(['King', 'Queen', 'Twin x2']),
      size: `${faker.number.int({ min: 25, max: 150 })} sqm`,
      view: faker.helpers.arrayElement(['Cityscape', 'Orbital', 'Data-Stream', 'Neon Alley']),
    },
    amenities: faker.helpers.arrayElements([
      'Hyper-speed Wifi', 'Smart TV', 'Neuro-Link Port', 'Auto-Chef Unit',
      'Sonic Shower', 'Zero-G Bed', 'VR Suite Access', 'Personal AI Assistant',
      'Air Purifier', 'Mini Bar', 'Bio-luminescent Lighting'
    ], { min: 6, max: 10 }),
    reviews: Array.from({ length: faker.number.int({min: 5, max: 15}) }, () => ({
      id: faker.string.uuid(),
      author: faker.person.fullName(),
      avatar: faker.image.avatar(),
      rating: faker.number.int({ min: 3, max: 5 }),
      date: faker.date.past({ years: 1 }),
      comment: faker.lorem.paragraph(),
    })),
  };
};

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setRoom(generateMockRoomDetails(roomId));
    window.scrollTo(0, 0);
  }, [roomId]);

  if (!room) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12 pt-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-teal hover:text-neon transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to results</span>
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left/Main Column */}
        <motion.div 
          className="lg:col-span-2 space-y-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ImageGallery images={room.images} roomName={room.name} />
          
          <div className="bg-cyber-gray/30 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">{room.name}</h1>
            <div className="flex items-center space-x-2 text-yellow-400 mb-6">
              <span>{room.rating}</span>
              {/* Stars would go here */}
              <span className="text-gray-400">({room.reviewsCount} reviews)</span>
            </div>
            <p className="text-gray-300 leading-relaxed">{room.description}</p>
          </div>

          <RoomSpecs specs={room.specs} />
          <AmenitiesList amenities={room.amenities} />
          <CustomerReviews reviews={room.reviews} />
        </motion.div>

        {/* Right/Sidebar Column */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <BookingPanel price={room.price} rating={room.rating} reviewsCount={room.reviewsCount} />
        </motion.div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
