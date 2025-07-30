import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Complaints from './pages/Complaints';
import Feedback from './pages/Feedback';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');

  return (
    <Router>
      <div className="bg-cyber-darker text-white min-h-screen flex relative overflow-hidden">
        <ParticleBackground />
        <div className="bg-cyber-grid bg-grid absolute inset-0 opacity-30"></div>
        
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <div className="flex-1 flex flex-col relative z-10">
          <Header currentPage={currentPage} />
          
          <main className="p-6 backdrop-blur-md bg-opacity-30 bg-cyber-gray border-l border-gray-700 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/feedback" element={<Feedback />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
