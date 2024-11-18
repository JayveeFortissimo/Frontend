import React from 'react';
import { VscBook } from "react-icons/vsc";
import { motion } from 'framer-motion';

const Choose = ({ setOpenFitting, setOpenChoose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpenChoose(false)}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 flex flex-col items-center gap-8">
          {/* Icon */}
          <div className="text-neutral-700 bg-neutral-100 p-4 rounded-full">
            <VscBook className="w-12 h-12" />
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-neutral-800">
              Want Fitting Appointment? 
            </h2>
            <p className="text-neutral-600">
              Choose whether you'd like to schedule a fitting appointment with us.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full">
            <button 
              onClick={() => {
                setOpenFitting(true);
                setOpenChoose(false);
              }}
              className="flex-1 px-4 py-2.5  bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
            >
              Yes, I want 
            </button>
            <button 
              onClick={() => setOpenChoose(false)}
              className="flex-1 px-4 py-2.5  bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-102 shadow-lg hover:shadow-xl"
            >
              No, Thanks 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;