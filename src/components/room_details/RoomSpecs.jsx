import React from 'react';
import { Users, BedDouble, Maximize, Eye } from 'lucide-react';

const RoomSpecs = ({ specs }) => {
  const specItems = [
    { icon: Users, label: 'Capacity', value: `${specs.capacity} Guests` },
    { icon: BedDouble, label: 'Bed Type', value: specs.bedType },
    { icon: Maximize, label: 'Size', value: specs.size },
    { icon: Eye, label: 'View', value: specs.view },
  ];

  return (
    <div className="bg-cyber-gray/30 backdrop-blur-md p-8 rounded-2xl border border-gray-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">Room Specifications</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {specItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="p-4 bg-cyber-dark/50 rounded-full mb-3 border border-gray-600">
              <item.icon className="text-teal" size={24} />
            </div>
            <p className="text-sm text-gray-400">{item.label}</p>
            <p className="font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomSpecs;
