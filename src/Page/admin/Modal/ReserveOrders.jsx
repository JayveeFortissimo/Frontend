import { useState, useEffect } from 'react';
import { 
  PiShoppingCartSimple,
  PiCalendarBlank,
  PiPackage,
  PiCheckCircle,
  PiClock,
  PiXCircle
} from "react-icons/pi";
import Items_Approved from '../../../hooks/AdminHooks/ItemsApproved.js';

const ReserveOrders = ({ userID }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Filter orders to only show those waiting for approval
    const pendingOrders = userID.data2.result.filter(
      order => order.status === "Waiting for approval"
    );
    setOrders(pendingOrders);
  }, []);

  const { PushToApprove, DeclineReserve } = Items_Approved(orders, setOrders, userID);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StatusBadge = ({ status }) => {
    return (
      <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-sm">
        <PiClock className="w-3 h-3" />
        Waiting for your approval
      </span>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="mt-6 p-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-700/50">
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <PiShoppingCartSimple className="w-16 h-16 mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-200">No Pending Orders</h3>
          <p className="text-sm">No orders waiting for approval</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 h-[80vh] overflow-auto px-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <div className="space-y-6">
        {orders.map(order => (
          <div 
            key={`${order.id}-${order.size}-${order.start_Date}`}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
          >
            <div className="flex gap-6 flex-col sm:flex-row">
              <div className="flex-shrink-0">
                <img
                  src={`http://localhost:8000/uploads/${order.picture}`}
                  alt={order.product_Name}
                  className="w-32 h-40 object-cover rounded-lg border border-gray-700/50 shadow-lg"
                />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-200">
                    {order.product_Name}
                  </h3>
                  <StatusBadge status={order.status} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-400">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                      <PiCalendarBlank className="w-4 h-4 text-blue-400" />
                      <span>Start: {formatDate(order.start_Date)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                      <PiCalendarBlank className="w-4 h-4 text-blue-400" />
                      <span>Return: {formatDate(order.return_Date)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                      <PiPackage className="w-4 h-4 text-blue-400" />
                      <span>Size: {order.size}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="font-medium text-gray-200 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                      Total: ₱{order.subTotal}
                    </p>
                    <p className="bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                      Quantity: {order.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap mt-4">
                  <button
                    onClick={(e) => PushToApprove(e, order)}
                    className="inline-flex items-center px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded-lg hover:bg-green-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500/50 transition-all duration-300 border border-green-500/30 backdrop-blur-sm"
                  >
                    <PiCheckCircle className="w-4 h-4 mr-2" />
                    Approve Order
                  </button>

                  <button
                    onClick={(e) => DeclineReserve(e, order)}
                    className="inline-flex items-center px-4 py-2 bg-red-500/20 text-red-400 text-sm font-medium rounded-lg hover:bg-red-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500/50 transition-all duration-300 border border-red-500/30 backdrop-blur-sm"
                  >
                    <PiXCircle className="w-4 h-4 mr-2" />
                    Decline Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReserveOrders;