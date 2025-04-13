import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import EventListAdmin from './EventListAdmin';
import AttendanceAdmin from './AttendanceAdmin';
import BlacklistAdmin from './BlacklistAdmin';
import UnblacklistRequestsAdmin from './UnblacklistRequestsAdmin';
import SearchBar from '../components/Searchbar';

function Admin() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const renderCurrentView = () => {
    const path = location.pathname;
    if (path.includes('attendance')) return <AttendanceAdmin search={searchQuery} />;
    if (path.includes('blacklist')) return <BlacklistAdmin search={searchQuery} />;
    if (path.includes('unblacklist-requests')) return <UnblacklistRequestsAdmin search={searchQuery} />;
    return <EventListAdmin search={searchQuery} />; // Default to events
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar navigate={navigate} />
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">🔔</button>
            <div className="flex items-center space-x-2">
              <img
                className="h-8 w-8 rounded-full"
                src="https://i.pravatar.cc/40?img=5"
                alt="Admin"
              />
              <span className="text-sm font-medium text-gray-700">Tom Cook</span>
            </div>
          </div>
        </header>

        <main className="p-4 overflow-y-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default Admin;
