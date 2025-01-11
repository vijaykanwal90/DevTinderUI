import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Body = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar at the top */}
      <Navbar />

      {/* Center the Outlet content */}
      <div className="flex-grow flex items-center justify-center">
        <Outlet />
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default Body;
