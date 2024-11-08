import { useState } from 'react';
import { BsWallet2 } from 'react-icons/bs';
import { AiOutlineCreditCard, AiOutlineClose } from 'react-icons/ai';
import Referalpoints from '../../hooks/Referalpoints.js';


const DownpaymentG = ({ setDown, Gcash, total }) => {
  
  const { Refresh } = Referalpoints();
  const [selectedOption, setSelectedOption] = useState(null);
  const displayDiscount = JSON.parse(localStorage.getItem("Discount"));
 
  const Totals =  selectedOption === "downpayment"? 
                  displayDiscount? ((parseInt(total) + 200) * 0.30) * 0.95 : (parseInt(total) + 200) * 0.30
                  :
                   displayDiscount?    ((parseInt(total) + 200)*0.95)   :   (parseInt(total) + 200)

   

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Background overlay with blur effect */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-lg">
        <div className="p-6 relative">
          {/* Close Button */}
          <button
            onClick={() => setDown(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <AiOutlineClose size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Select Payment Option</h2>
            <p className="text-gray-500 mt-2">Choose how you'd like to pay with GCash</p>
          </div>

          {/* Payment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Downpayment Option */}
            <button
              onClick={() => setSelectedOption('downpayment')}
              className={`relative p-6 rounded-xl border-2 transition-all duration-200 group
                ${selectedOption === 'downpayment'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-3 rounded-full
                  ${selectedOption === 'downpayment'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}
                >
                  <AiOutlineCreditCard size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Downpayment</h3>
                  <p className="text-sm text-gray-500 mt-1">Pay 30% now and the rest in store</p>
                </div>
                <div className="text-blue-600 font-semibold">
                  Via GCash
                </div>
              </div>

              {/* Selected Indicator */}
              {selectedOption === 'downpayment' && (
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-500" />
              )}
            </button>
    
            {/* Full Payment Option */}
            <button
              onClick={() => setSelectedOption('full')}
              className={`relative p-6 rounded-xl border-2 transition-all duration-200 group
                ${selectedOption === 'full'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-3 rounded-full
                  ${selectedOption === 'full'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}
                >
                  <BsWallet2 size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Full Payment</h3>
                  <p className="text-sm text-gray-500 mt-1">Pay the entire amount now</p>
                </div>
                <div className="text-blue-600 font-semibold">
                  Via GCash
                </div>
              </div>

              {/* Selected Indicator */}
              {selectedOption === 'full' && (
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-blue-500" />
              )}
            </button>

           <div>
            <p>Amount Pay: {Totals}</p>
         
           </div>


          </div>

          {/* Continue Button */}
          <button
          onClick={(e) => {
            Gcash(e, parseInt(Totals), selectedOption);
            displayDiscount? Refresh(e): undefined;
            displayDiscount? localStorage.removeItem("Discount"): undefined;
          }}
            disabled={!selectedOption}
            className={`w-full mt-5 py-4 rounded-lg font-medium transition-all duration-200
              ${selectedOption
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
          >
            Continue with {selectedOption === 'downpayment' ? 'Downpayment' : 'Full Payment'}
          </button>

          {/* Additional Info */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Secure payment processing powered by GCash
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownpaymentG;
