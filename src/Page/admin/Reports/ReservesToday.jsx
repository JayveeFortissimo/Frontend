import { useMemo, useState } from 'react';
import { VscChromeClose, VscSearch } from "react-icons/vsc";
import jsPDF from "jspdf";
import AdminProfile from '../../../hooks/AdminHooks/AdminProfile.js';



const ReservesToday = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop with stronger blur effect */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={() => setTotalReserve(prev => ({ ...prev, ReservesTodays: false }))}
          />
          
          {/* Modal Container */}
          <div className="relative w-full max-w-7xl mx-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20">
            {/* Header */}
            <div className="flex flex-col gap-4 p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Total Gowns</h2>
                <button
                  onClick={() => setTotalReserve(prev => ({ ...prev, ReservesTodays: false }))}
                  className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
                >
                  <VscChromeClose className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <VscSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, type, or gender..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          
    
            <div className='ml-7'>
         <button
                 // onClick={generatePDF}
                  className="
                    px-5 py-1 rounded-lg
                    bg-gradient-to-r from-blue-500 to-purple-500
                    text-white font-medium
                    hover:shadow-lg hover:shadow-blue-500/25
                    transition-all duration-200
                    flex items-center gap-2
                  "
                >
                  Print Report
                </button>
         </div>
    
            {/* Scrollable Content Area */}
            <div className="overflow-y-auto h-[calc(100vh-15rem)]">
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredGowns.map((item, index) => (
                    <div
                      key={index}
                      className="group bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      {/* Image Section */}
                      <div className="aspect-square w-full overflow-hidden relative">
                        <img
                          src={`https://backend-production-024f.up.railway.app/uploads/${item.image}`}
                          alt={item.product_Name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${
                              item.totalQuantity === 0
                                ? "bg-red-100/90 text-red-600"
                                : "bg-green-100/90 text-green-600"
                            }`}
                          >
                            Total: {item.totalQuantity}
                          </span>
                        </div>
                      </div>
    
                      {/* Content Section */}
                      <div className="p-3 space-y-2">
                        <div>
                          <h3 className="font-medium text-gray-900 truncate">
                            {item.product_Name}
                          </h3>
                          <p className="text-xs text-gray-500">₱{item.price}</p>
                        </div>
    
                        {/* Size Pills with Quantities */}
                        <div className="flex flex-wrap gap-1">
                          {item.allSizes.map((size, sizeIndex) => (
                            <div
                              key={sizeIndex}
                              className="px-2 py-0.5 text-xs rounded-full bg-gray-100/70 text-gray-700 flex items-center gap-1"
                            >
                              <span>{size}</span>
                              <span className="inline-flex items-center justify-center bg-gray-200/70 rounded-full w-4 h-4 text-[10px]">
                                {item.sizeQuantities[size]}
                              </span>
                            </div>
                          ))}
                        </div>
    
                        <div className="flex justify-between items-center text-xs text-gray-600">
                          <span className="bg-gray-100/70 px-2 py-0.5 rounded-full">{item.type}</span>
                          <span className="bg-gray-100/70 px-2 py-0.5 rounded-full">{item.gender}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}                           

export default ReservesToday;