import React from 'react';
import { BiQuestionMark } from "react-icons/bi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

const Think = ({ setSure, Navigate }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop with modern blur effect */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
        <div className="flex flex-col items-center gap-6">
          {/* Icon with gradient background */}
          <div className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white  p-3">
            <BiQuestionMark className="h-8 w-8 text-white" />
          </div>
          
          {/* Title with modern typography */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl font-semibold text-gray-900">
              Confirm Your Reservation
            </h3>
            <p className="text-sm text-gray-500">
              Are you ready to proceed with your selected items?
            </p>
          </div>
          
          {/* Buttons with modern styling */}
          <div className="flex w-full gap-3">
            <button
              onClick={() => setSure(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition-colors"
            >
              <IoArrowBackOutline className="h-4 w-4" />
              Go Back
            </button>
            <button
              onClick={() => Navigate('/check_out')}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-violet-600 hover:to-teal-600 transition-all"
            >
              <IoCheckmarkCircleOutline className="h-4 w-4" />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Think;