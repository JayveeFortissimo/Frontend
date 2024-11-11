import { VscChromeClose, VscCheck } from "react-icons/vsc";
import { useState, useEffect } from "react";
import { FaBox, FaUser, FaCalendarAlt } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import { Sidebars } from "../../../Store/Side.js";
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const PickUp = ({ setPickUp, productINFO }) => {

  const [pickuped, setPickuped] = useState('');

  useEffect(() => {
    if (pickuped === "ITEM PICKED UP ALREADY") {
        //sendSMSNotification(`+639604099126`, 'YOU PICKUPED THE ITEMS ALREADY!');
      SubmitPickuped();
    }
  }, [pickuped]);

  const sendSMSNotification = async (to, message) => {
    try {
      const response = await fetch('https://backend-production-024f.up.railway.app/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to, message }),
      });

      const data = await response.json();
      if (data.success) {
        console.log('SMS sent successfully:', data.messageId);
      } else {
        console.error('Error sending SMS:', data.error);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };


  const SubmitPickuped = async (e) => {
    if (e) e.preventDefault();
    
     const OriginalVAlue = productINFO.subTotal;
     const code = productINFO.code
    const total = OriginalVAlue / 0.3;

    if (pickuped === '') {
      toast.error("Have problem");
    } else {

      try {
        const response = await fetch(`https://backend-production-024f.up.railway.app/itemPickuped/${productINFO.approvedID}`, {
          method: "PUT",
          body: JSON.stringify({
            Pickuped: pickuped,
            code:code,
            total:total
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) return toast.error("NOT PICKED UP");
        dispatch(Sidebars.Activity('Return'))
        setPickUp(false);
        return toast.success("USER PICKED UP ITEMS");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setPickUp(false)}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden mx-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Pickup Status</h2>
          <button
            onClick={() => setPickUp(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <VscChromeClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Product Name */}
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-900">
              {productINFO.product_Name.toUpperCase()}
            </h3>
          </div>

          {/* Details */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <FaBox className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Product Name</p>
                <p className="font-medium">{productINFO.product_Name.toUpperCase()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <TbRulerMeasure className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Size and Quantity</p>
                <div className="flex gap-4 font-medium">
                  <span>Size: {productINFO.size}</span>
                  <span>Quantity: {productINFO.quantity}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Duration Date</p>
                <p className="font-medium">
                  {productINFO.startDate.toUpperCase()} - {productINFO.endDate.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FaUser className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{productINFO.customerName.toUpperCase()}</p>
              </div>
            </div>

            <div>
             
            <button
              onClick={() => setPickuped("ITEM PICKED UP ALREADY")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors
                ${pickuped === "ITEM PICKED UP ALREADY" 
                  ? "bg-green-600 hover:bg-green-700" 
                  : "bg-green-500 hover:bg-green-600"} 
                text-white`}
            >
              <VscCheck className="w-5 h-5" />
              <span>Order picked up</span>
            </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUp;