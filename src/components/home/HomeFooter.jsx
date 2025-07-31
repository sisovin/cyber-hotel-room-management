import React from 'react';
import { Link } from 'react-router-dom';
import { Send, Twitter, Instagram, Facebook } from 'lucide-react';

const HomeFooter = () => {
  return (
    <footer className="bg-cyber-dark/80 backdrop-blur-lg border-t border-neon/20 mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-neon mb-4">CYBER-STAY</h3>
            <p className="text-gray-400 max-w-md">
              The future of hospitality. A nexus of luxury, technology, and unparalleled experience in the heart of the metropolis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-400 hover:text-teal">Rooms</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-teal">About Us</Link></li>
              <li><Link to="#" className="text-gray-400 hover:text-teal">Careers</Link></li>
              <li><Link to="/admin/dashboard" className="text-gray-400 hover:text-teal">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-4 tracking-wider">Join The Grid</h4>
            <p className="text-gray-400 mb-4">Get updates on exclusive offers and events.</p>
            <div className="flex">
              <input type="email" placeholder="your.email@protocol.net" className="flex-grow bg-cyber-gray border border-gray-600 rounded-l-md px-4 py-2 text-white focus:outline-none focus:border-neon" />
              <button className="bg-neon text-black p-3 rounded-r-md hover:bg-neon/80">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">&copy; 2025 Cyber-Stay Inc. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-500 hover:text-white"><Twitter size={20} /></Link>
            <Link to="#" className="text-gray-500 hover:text-white"><Instagram size={20} /></Link>
            <Link to="#" className="text-gray-500 hover:text-white"><Facebook size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
