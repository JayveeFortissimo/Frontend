import React, { useState } from 'react';
import { VscChromeClose, VscFilter } from "react-icons/vsc";

const SalesTrack = ({ setTotalReserve, salesTracks }) => {
  const [filterMode, setFilterMode] = useState('default');
  const [filterOptions, setFilterOptions] = useState({
    quantity: 'default',
    productName: 'default'
  });

  // Sorting logic for Quantity
  const sortedSalesTracks = [...salesTracks].sort((a, b) => {
    // Quantity sorting
    if (filterOptions.quantity === 'highToLow') {
      return b.count - a.count;
    } else if (filterOptions.quantity === 'lowToHigh') {
      return a.count - b.count;
    }
    
    // Product Name sorting
    if (filterOptions.productName === 'aToZ') {
      return a.product_Name.localeCompare(b.product_Name);
    } else if (filterOptions.productName === 'zToA') {
      return b.product_Name.localeCompare(a.product_Name);
    }
    
    // Default case
    return 0;
  });

  // Toggle filter for a specific column
  const toggleColumnFilter = (column) => {
    setFilterOptions(prev => {
      const currentFilter = prev[column];
      let nextFilter = 'default';
      
      if (column === 'quantity') {
        if (currentFilter === 'default') nextFilter = 'highToLow';
        else if (currentFilter === 'highToLow') nextFilter = 'lowToHigh';
      } else if (column === 'productName') {
        if (currentFilter === 'default') nextFilter = 'aToZ';
        else if (currentFilter === 'aToZ') nextFilter = 'zToA';
      }
      
      return {
        ...prev,
        [column]: nextFilter
      };
    });
  };

  // Render filter icon based on current state
  const renderFilterIcon = (column) => {
    const filter = filterOptions[column];
    
    if (filter === 'default') return null;
    
    if (column === 'quantity') {
      return filter === 'highToLow' 
        ? <span className="ml-1 text-xs text-red-400">(High → Low)</span>
        : <span className="ml-1 text-xs text-green-400">(Low → High)</span>;
    }
    
    if (column === 'productName') {
      return filter === 'aToZ' 
        ? <span className="ml-1 text-xs text-blue-400">(A → Z)</span>
        : <span className="ml-1 text-xs text-purple-400">(Z → A)</span>;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 px-5">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-4xl h-[35rem] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        <div className="relative p-6 h-full overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Sales Stack Statistic
              </h2>
            </div>
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
                  <th 
                    className="p-4 text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-700 cursor-pointer hover:text-white"
                    onClick={() => toggleColumnFilter('productName')}
                  >
                    Product Name
                    {renderFilterIcon('productName')}
                  </th>
                  <th 
                    className="p-4 text-xs uppercase tracking-wider text-slate-400 font-bold border-b border-slate-700 text-right cursor-pointer hover:text-white"
                    onClick={() => toggleColumnFilter('quantity')}
                  >
                    Quantity
                    {renderFilterIcon('quantity')}
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