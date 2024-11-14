import React from 'react';
import { VscHistory, VscNotebook } from "react-icons/vsc";
import { FiPackage } from "react-icons/fi";
import { MdDateRange, MdWarning, MdCheckCircle } from "react-icons/md";
import History from "./../../hooks/History.js";

const FinalH = ({ ID }) => {
  const { history } = History(ID);

  if (history.length === 0) {
    return (
      <div className="min-h-[20rem] flex flex-col items-center justify-center gap-4 bg-gray-50 rounded-xl p-4 md:p-8">
        <VscNotebook className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
        <p className="text-gray-500 font-medium text-sm md:text-base">No History Yet</p>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <FiPackage className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Order Completed</h2>
      </div>

      <div className="grid gap-3 md:gap-4 max-h-[calc(100vh-12rem)] overflow-auto">
        {history.map(pro => {
          const startDate = new Date(pro.start_Date);
          const returnDate = new Date(pro.return_Date);
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const Starto = startDate.toLocaleDateString('en-US', options);
          const returns = returnDate.toLocaleDateString('en-US', options);

          return (
            <div
              key={pro.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row gap-3 md:gap-6 p-3 md:p-4">
                <div className="flex-shrink-0">
                  <img
                    src={`https://backend-production-024f.up.railway.app/uploads/${pro.picture}`}
                    alt={pro.product_Name}
                    className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-2 md:gap-3 flex-grow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h3 className="font-medium text-gray-900 text-sm md:text-base">{pro.product_Name}</h3>
                    <div className={`flex items-center gap-1 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm w-fit ${
                      pro.penalty === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {pro.penalty === 0 ? (
                        <MdCheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                      ) : (
                        <MdWarning className="w-3 h-3 md:w-4 md:h-4" />
                      )}
                      <span className="font-medium">
                        {pro.penalty === 0 ? 'On Time' : `Penalty: ${pro.penalty}`}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MdDateRange className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <span>Start: {Starto}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdDateRange className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                      <span>Return: {returns}</span>
                    </div>
                  </div>

                  <div className="mt-2">
                    <button className="text-blue-600 hover:text-blue-700 text-xs md:text-sm font-medium transition-colors duration-150">
                      Price : {pro.price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FinalH;