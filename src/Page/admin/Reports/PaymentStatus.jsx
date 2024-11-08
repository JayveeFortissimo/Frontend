import React, { useState } from 'react';
import { HiXMark } from "react-icons/hi2";

const PaymentStatus = ({ setTotalReserve, DashInfo }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Group data by customer name
  const groupedData = DashInfo.data?.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = {
        name: item.name,
        reservations: [],
        totalReservations: 0,
        paymentMethods: new Set()
      };
    }
    acc[item.name].reservations.push(item);
    acc[item.name].totalReservations += 1;
    acc[item.name].paymentMethods.add(item.payment_Method);
    return acc;
  }, {});


  const filteredGroupedData = Object.values(groupedData || {}).filter(group => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'full') return Array.from(group.paymentMethods).includes('Gcash|FullPaid');
    if (activeFilter === 'down') return Array.from(group.paymentMethods).includes('IN STORE');
    if (activeFilter === 'down') return   Array.from(group.paymentMethods).includes('Gcash|DownPayment');
    return true;
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setTotalReserve(pro => !pro.PaymentStatus)}
      />
      
      <div className="relative w-full max-w-4xl mx-4">
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-semibold text-slate-100">
              Payment Status
            </h2>
            <button
              onClick={() => setTotalReserve(pro => !pro.PaymentStatus)}
              className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                All Payments
              </button>
              <button
                onClick={() => setActiveFilter('full')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'full'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Full Payments (GCash)
              </button>
              <button
                onClick={() => setActiveFilter('down')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeFilter === 'down'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Down Payments
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <h3 className="text-slate-400 mb-2">Full Payments (GCash)</h3>
                <p className="text-2xl font-semibold text-white">{DashInfo.totalGcashFullPaid}</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <h3 className="text-slate-400 mb-2">Down Payments</h3>
                <p className="text-2xl font-semibold text-white">{DashInfo.totalDownPayment}</p>
              </div>
            </div>

            <div className="space-y-6">
              {filteredGroupedData.map((group) => (
                <div
                  key={group.name}
                  className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50"
                >
                  <div className="mb-4 pb-4 border-b border-slate-700/50">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                      <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">
                        {group.totalReservations} {group.totalReservations === 1 ? 'Reservation' : 'Reservations'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {group.reservations.map((item) => (
                      <div key={item.id} className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-900/50 rounded-lg">
                        <div>
                          <p className="text-slate-400 text-sm">Product</p>
                          <p className="text-slate-200">{item.product_Name}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Payment Method</p>
                          <p className="text-slate-200">{item.payment_Method}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Status</p>
                          <p className="text-slate-200">{item.status}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Start Date</p>
                          <p className="text-slate-200">
                            {new Date(item.start_Date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Return Date</p>
                          <p className="text-slate-200">
                            {new Date(item.return_Date).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Size</p>
                          <p className="text-slate-200">{item.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;