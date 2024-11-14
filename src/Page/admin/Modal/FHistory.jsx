import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { VscNotebook } from "react-icons/vsc";
import { motion } from "framer-motion";
import History from '../../../hooks/History';

// History Item Component
const HistoryItem = ({ pro }) => {
  const startDate = new Date(pro.start_Date);
  const returnDate = new Date(pro.return_Date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const Starto = startDate.toLocaleDateString('en-US', options);
  const returns = returnDate.toLocaleDateString('en-US', options);

  return (
    <div className="group relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex flex-col sm:flex-row gap-6 p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
        {/* Image with reflection effect */}
        <div className="w-full sm:w-48 h-48 flex-shrink-0 relative group overflow-hidden rounded-lg">
          <img
            src={`https://backend-production-024f.up.railway.app/uploads/${pro.picture}`}
            alt={pro.product_Name}
            className="w-full h-full object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4 flex-grow">
          {/* Product Name with gradient */}
          <h3 className="text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {pro.product_Name}
          </h3>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status and Penalty */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-400">Penalty:</span>
                <span className={pro.penalty === 0 ? 'text-emerald-400' : 'text-red-400'}>
                  ₱{pro.penalty}
                </span>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                pro.penalty === 0 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>

                {
                  pro.status === "NO QRCODE"? "NO QRCODE": 
                  pro.penalty === 0 
                    ? 'RETURNED ON TIME' 
                    : 'NOT RETURNED ON TIME '
                }
              
              </div>
            </div>

            {/* Dates with hover effect */}
            <div className="space-y-3">
              <div className="group/date flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                <span className="font-medium">Start:</span>
                <span className="group-hover/date:translate-x-1 transition-transform">
                  {Starto}
                </span>
              </div>
              <div className="group/date flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <span className="font-medium">Return:</span>
                <span className="group-hover/date:translate-x-1 transition-transform">
                  {returns}
                </span>
              </div>
            </div>
          </div>

          {/* Payment and Status */}
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-2">
              
              <span className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-sm border border-gray-600/50">
               Total ₱{pro.price + pro.penalty}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm border border-emerald-500/30">
            
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-64 text-gray-400">
    <div className="relative">
      <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
      <VscNotebook className="relative w-16 h-16 mb-4 text-blue-400" />
    </div>
    <p className="text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      No History Yet
    </p>
    <p className="text-gray-500 mt-2">
      Your rental history will appear here
    </p>
  </div>
);

// Main Component
const FHistory = () => {
  const ID = useLoaderData();
  const { history } = History(ID.data1[0].id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl" />
        
          {/* Content */}
        
          <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            {/* Scrollable Container */}
            <div className="space-y-6 max-h-[32rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50">
              {history.length === 0 ? (
                <EmptyState />
              ) : (
                history.map(pro => (
                  <HistoryItem key={pro.id} pro={pro} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FHistory;