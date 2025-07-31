import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import Complaints from './pages/Complaints';
import Feedback from './pages/Feedback';
import HomePage from './pages/HomePage';
import CategoryRoomsPage from './pages/CategoryRoomsPage';
import SearchResultsPage from './pages/SearchResultsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-cyber-darker text-white min-h-screen">
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category/:categoryName" element={<CategoryRoomsPage />} />
          <Route path="search" element={<SearchResultsPage />} />
          <Route path="room/:roomId" element={<RoomDetailsPage />} />
        </Route>
        <Route 
          path="/admin" 
          element={<AdminLayout currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="users" element={<Users />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="feedback" element={<Feedback />} />
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
