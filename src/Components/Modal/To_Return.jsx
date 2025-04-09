import { useEffect } from "react";
import History from "../../hooks/AdminHooks/History.js";
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { 
  IoCheckmarkCircleOutline,
  IoWarningOutline,
  IoTimeOutline,
  IoCalendarOutline,
  IoInformationCircleOutline
} from "react-icons/io5";
import { motion } from "framer-motion";

const To_Return = ({ user_ID }) => {
  const { toReturn, setToReturn } = History(user_ID);

  useEffect(() => {
    const socket = io('https://backend-production-62ff.up.railway.app');
    
    socket.on('itemRemoved', (id) => {
      const filtered = toReturn.filter(pro => pro.id !== id);
      setToReturn(filtered);
      toast.success(`Item with ID ${id} has been removed`);
    });

    return () => {
      socket.off('itemRemoved');
    };
  }, [toReturn, setToReturn]);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Return Items</h1>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
            Track and manage your item returns and due dates
          </p>
        </header>

        <div className="space-y-4 sm:space-y-6">
          {toReturn.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 text-center"
            >
              <IoCheckmarkCircleOutline className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
              <h3 className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-gray-900">
                All Clear!
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                You don't have any items that need to be returned at the moment
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {toReturn.map((pro, index) => {
                const dateOfNow = new Date();
                const returnDate = new Date(pro.return_Date);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const returns = returnDate.toLocaleDateString('en-US', options);
                
                const isPastReturnDate = dateOfNow > returnDate;
                const daysNotReturned = Math.floor((dateOfNow - returnDate) / (1000 * 60 * 60 * 24));
                const penaltyPerDay = 500;
                const totalPenalty = isPastReturnDate ? daysNotReturned * penaltyPerDay : 0;

                return (
                  <motion.div 
                    key={pro.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl
                      ${isPastReturnDate ? "border-l-4 border-red-500" : "border-l-4 border-green-500"}
                    `}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div className="relative mx-auto sm:mx-0">
                          <img 
                            src={`https://backend-production-62ff.up.railway.app/uploads/${pro.picture}`}
                            className="h-40 sm:h-48 w-32 sm:w-36 object-cover rounded-lg shadow-md"
                            alt={pro.product_Name}
                          />
                          <div className={`absolute top-2 right-2 px-2 sm:px-3 py-1 rounded-full text-xs font-medium
                            ${isPastReturnDate ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
                          `}>
                            {isPastReturnDate ? "" : "Active"}
                          </div>
                        </div>

                        <div className="flex-1 space-y-3 sm:space-y-4">
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center sm:text-left">
                              {pro.product_Name}
                            </h3>
                            <p className="mt-1 text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                              Item ID: {pro.id}
                            </p>
                          </div>

                          {isPastReturnDate ? (
                            <div className="bg-red-50 rounded-lg sm:rounded-xl p-3 sm:p-4 space-y-2 sm:space-y-3">
                              <div className="flex items-center gap-2 text-red-700">
                                <IoWarningOutline className="h-4 w-4 sm:h-5 sm:w-5" />
                                <span className="text-sm sm:text-base font-medium">Return Required</span>
                              </div>
                              {daysNotReturned > 0 && (
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 text-red-600">
                                    <IoTimeOutline className="h-4 w-4 sm:h-5 sm:w-5" />
                                    <span className="text-sm sm:text-base">
                                      {daysNotReturned} day{daysNotReturned > 1 ? 's' : ''} overdue
                                    </span>
                                  </div>
                                  <div className="bg-red-100 rounded-lg p-2 sm:p-3">
                                    <p className="text-red-800 font-semibold text-sm sm:text-base">
                                      Penalty Amount: ₱{totalPenalty.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  pro.status === "Waiting for approval" ? "bg-yellow-500" : "bg-green-500"
                                }`} />
                                <span className={`text-sm sm:text-base font-medium ${
                                  pro.status === "Waiting for approval" ? "text-yellow-700" : "text-green-700"
                                }`}>
                                  {pro.status === "Waiting for approval" 
                                    ? "Awaiting Approval"
                                    : pro.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          )}

                          <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <IoCalendarOutline className="h-4 w-4 sm:h-5 sm:w-5" />
                              <div>
                                <p className="text-xs sm:text-sm">Due Date</p>
                                <p className={`text-base sm:text-lg font-semibold ${
                                  isPastReturnDate ? "text-red-600" : "text-gray-900"
                                }`}>
                                  {returns}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {isPastReturnDate && (
                      <div className="bg-blue-50 p-3 sm:p-4 border-t border-blue-100">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <IoInformationCircleOutline className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
                          <div className="text-xs sm:text-sm text-blue-700">
                            <p className="font-medium">Important Notice</p>
                            <p className="mt-1">
                              Please return this item as soon as possible. Additional charges of ₱{penaltyPerDay.toLocaleString()} per day will continue to apply.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default To_Return;