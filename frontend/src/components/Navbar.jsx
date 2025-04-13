import React from 'react';
import Logo from '../assets/dice_logo.png';
import { Link } from 'react-router-dom';
import Profile from '../assets/profile.png';

function Navbar() {
  return (
    <div className="bg-slate-200 max-w-full">
      <div className="flex items-center justify-between max-h-16 p-4">
        {/* Logo Section */}
        <div>
          <img src={Logo} alt="Logo" className="max-h-12 p-0" />
        </div>

        {/* Navigation Links Section */}
        <div className="hidden sm:flex space-x-6 font-bold text-xl text-gray-600 items-center">
          <Link to="/" className="hover:text-gray-900 transition">Home</Link>
          <Link to="/events" className="hover:text-gray-900 transition">Events</Link>
          <Link to="/help" className="hover:text-gray-900 transition">Help</Link>
        </div>

        {/* Login & Profile Section */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-white text-blue-500 font-semibold rounded-md hover:bg-gray-200 transition">User</button>
          <img src={Profile} alt="Profile" className="w-10 h-10 rounded-full border-2 border-white" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
