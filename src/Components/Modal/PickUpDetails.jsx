import React from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { BsBox } from "react-icons/bs";

const PickUpDetails = ({
  setOpenPick,
  productName,
  start_Date,
  return_Date,
  Pickuped,
  quantity,
  size
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setOpenPick(false)}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden transform transition-all mx-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Pickup Information</h2>
          <button
            onClick={() => setOpenPick(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <VscChromeClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Product Details */}
          <div className="space-y-4 mb-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900">{productName}</h3>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <BsBox className="w-4 h-4" />
                  <span>Size: {size}</span>
                </div>
                <div className="w-px h-4 bg-gray-300" />
                <span>Quantity: {quantity}</span>
              </div>
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendarAlt className="w-4 h-4" />
              <div className="flex items-center gap-2">
                <span>{start_Date}</span>
                <span>→</span>
                <span>{return_Date}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-gray-600">
              <FaMapMarkerAlt className="w-4 h-4 mt-1 flex-shrink-0" />
              <p>Bagbaguin, Santa Maria Bulacan at Sonias Carwash</p>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d679.1955379849777!2d120.95977901777923!3d14.815306132410914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ad85d98af4ef%3A0xc39409567392e609!2sSonia%E2%80%99s%20Carwash!5e1!3m2!1sen!2sph!4v1728389316190!5m2!1sen!2sph"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </div>

          {/* Status */}
          <div className="mt-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${Pickuped === "THIS ITEM NOT PICKUPED UP YET"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {Pickuped}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUpDetails;