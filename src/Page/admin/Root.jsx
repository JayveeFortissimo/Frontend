import SideAdmin from "./SideAdmin";
import React, { useState } from 'react';
import { Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Toaster } from 'react-hot-toast';

const Root = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      
      {/* Hamburger menu button - only visible on mobile */}
      <button
      onClick={toggleSidebar}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        lg:hidden fixed top-4 left-4 z-50
        p-3 rounded-lg
        bg-[#1a1f2e] text-[#6366f1]
        hover:bg-[#252b3b]
        transition-colors duration-300
        ${isHovered || isSidebarOpen ? 'opacity-100' : 'opacity-75'}
      `}
      aria-label="Toggle Menu"
    >
      {isSidebarOpen ? (
        <AiOutlineClose size={24} />
      ) : (
        <FaBars size={24} />
      )}
    </button>

      <div className="flex min-h-screen bg-[#1a1f2e]">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - preserving your existing styles */}
      
          <SideAdmin  isSidebarOpen={isSidebarOpen}/>
   

        {/* Main content - preserving your existing styles */}
        <main className="flex-1 bg-[#1a1f2e] min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Root;