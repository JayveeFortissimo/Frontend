import React, { useState } from 'react';
import { VscChromeClose, VscArrowUp, VscArrowDown, VscFilter } from "react-icons/vsc";

const SalesTrack = ({ setTotalReserve, salesTracks }) => {
  const [sortOrder, setSortOrder] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sort function
  const sortedSalesTracks = [...salesTracks].sort((a, b) => {
    switch(sortOrder) {
      case 'lowToHigh':
        return a.count - b.count;
      case 'highToLow':
        return b.count - a.count;
      default:
        return 0;
    }
  });

  // Handle sort order change
  const handleSortChange = (order) => {
    setSortOrder(order);
    setIsFilterOpen(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 px-5">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-4xl h-[35rem] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="absolute -left-24 -top-24 w-48 h-48 bg-blue-500 rounded-full blur-[100px] opacity-20" />
        <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-purple-500 rounded-full blur-[100px] opacity-20" />
        
        <div className="relative p-6 h-full overflow-auto">
          {/* Header with Filter */}
          <div className="flex justify-between items-center mb-6 relative">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sales Stack Statistic
              </h2>
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 rounded-full hover:bg-slate-700/50 transition-colors flex items-center"
              >
                <VscFilter className={`text-slate-400 hover:text-white ${sortOrder !== 'default' ? 'text-blue-400' : ''}`} size={20} />
                {sortOrder !== 'default' && (
                  <span className="ml-2 text-xs text-blue-400">
                    {sortOrder === 'lowToHigh' ? 'Low to High' : 'High to Low'}
                  </span>
                )}
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-20">
                  <ul className="py-1">
                    <li 
                      onClick={() => handleSortChange('default')} 
                      className="px-4 py-2 hover:bg-slate-700 cursor-pointer flex items-center"
                    >
                      <span className={`mr-2 ${sortOrder === 'default' ? 'text-blue-400' : 'text-slate-400'}`}>
                        Default
                      </span>
                    </li>
                    <li 
                      onClick={() => handleSortChange('lowToHigh')} 
                      className="px-4 py-2 hover:bg-slate-700 cursor-pointer flex items-center"
                    >
                      <VscArrowUp className="mr-2 text-green-400" />
                      <span className={`${sortOrder === 'lowToHigh' ? 'text-blue-400' : 'text-slate-400'}`}>
                        Low to High
                      </span>
                    </li>
                    <li 
                      onClick={() => handleSortChange('highToLow')} 
                      className="px-4 py-2 hover:bg-slate-700 cursor-pointer flex items-center"
                    >
                      <VscArrowDown className="mr-2 text-red-400" />
                      <span className={`${sortOrder === 'highToLow' ? 'text-blue-400' : 'text-slate-400'}`}>
                        High to Low
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setTotalReserve((prev) => ({ ...prev, SalesTack: false }))}
              className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <VscChromeClose className="text-slate-400 hover:text-white" size={20} />
            </button>
          </div>

          {/* Futuristic Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border-separate border-spacing-0 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-slate-800 to-slate-700 text-left">
                  <th className="p-4 text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-700">
                    #
                  </th>
                  <th className="p-4 text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-700">
                    Product Name
                  </th>
                  <th className="p-4 text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-700 text-right">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedSalesTracks.map((item, index) => (
                  <tr 
                    key={index} 
                    className="group hover:bg-slate-700/30 transition-colors duration-200"
                  >
                    <td className="p-4 text-slate-300 border-b border-slate-700/50">
                      <span className="text-slate-500">{index + 1}</span>
                    </td>
                    <td className="p-4 text-slate-300 border-b border-slate-700/50">
                      <div className="flex items-center">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                          {item.product_Name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300 border-b border-slate-700/50 text-right">
                      <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent font-bold">
                        {item.count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {salesTracks.length === 0 && (
              <div className="text-center py-10 text-slate-500">
                No sales data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesTrack;