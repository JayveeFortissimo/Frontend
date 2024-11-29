import React, { useMemo } from 'react';
import { VscChromeClose } from "react-icons/vsc";

const AllHistory = ({ setTotalReserve, AllHistory }) => {
  const mergedHistory = useMemo(() => {
    const userMap = new Map();

    AllHistory.forEach(item => {
      const key = item.name;
      if (!userMap.has(key)) {
        userMap.set(key, {
          userName: key,
          items: [],
          totalItems: 0,
          totalPrice: 0
        });
      }

      const userEntry = userMap.get(key);
      userEntry.items.push(item);
      userEntry.totalItems += item.quantity;
      userEntry.totalPrice += item.price * item.quantity;
    });

    return Array.from(userMap.values());
  }, [AllHistory]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/90">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => setTotalReserve(prev => ({ ...prev, History: false }))}
      />
      
      <div className="relative w-full max-w-7xl mx-4 md:mx-6 lg:mx-8 bg-white rounded-xl shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="flex flex-col gap-4 p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-semibold text-blue-600">History</h2>
            <button
              onClick={() => setTotalReserve(prev => ({ ...prev, History: false }))}
              className="p-1 md:p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <VscChromeClose className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Merged History Table */}
        <div className="p-4 md:p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 md:p-3 border-b text-xs md:text-sm text-gray-700">User Name</th>
                <th className="p-2 md:p-3 border-b text-xs md:text-sm text-gray-700">Total Items</th>
                <th className="p-2 md:p-3 border-b text-xs md:text-sm text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {mergedHistory.map((userEntry) => (
                <tr key={userEntry.userName} className="hover:bg-gray-50">
                  <td className="p-2 md:p-3 border-b text-xs md:text-sm text-gray-800 truncate max-w-[150px]">{userEntry.userName}</td>
                  <td className="p-2 md:p-3 border-b text-xs md:text-sm text-gray-800">{userEntry.totalItems}</td>
                
                  <td className="p-2 md:p-3 border-b text-xs md:text-sm text-gray-800">
                    <details>
                      <summary className="cursor-pointer text-blue-600 text-xs md:text-sm">View Items</summary>
                      <div className="mt-2 space-y-2 max-h-[300px] overflow-y-auto">
                        {userEntry.items.map((item) => (
                          <div key={item.id} className="bg-gray-100 p-2 rounded">
                            <p className="text-xs md:text-sm text-gray-800 truncate">{item.product_Name}</p>
                            <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                            <p className="text-xs text-gray-600">Price: ₱{item.price}</p>
                            <p className="text-xs text-gray-600">Status: {item.status}</p>
                          </div>
                        ))}
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllHistory;