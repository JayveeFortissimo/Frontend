import { VscChromeClose } from "react-icons/vsc";
import { FaWallet } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const ConfirmGcash = ({ setGcash, total, setDown }) => {
  const displayDiscount = JSON.parse(localStorage.getItem("Discount"));
  const TotalsAll =  displayDiscount? (parseInt(total) + 200) * 0.95: parseInt(total)+ 200;

  return (

    <>
    
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="absolute right-4 top-4 z-10">
          <button
            type="button"
            onClick={() => setGcash(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <VscChromeClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-8">
          {/* Icon and Title Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
              <FaWallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                GCash Payment Confirmation
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Total Amount: ₱{TotalsAll}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 mb-8">
            <p className="text-gray-600">
              You're about to complete your payment using GCash. This is a secure and convenient way to process your transaction.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-600">
                For more information about our payment processes and policies, please refer to our Terms and Policy section or contact our support team for assistance.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setGcash(false)}
              className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setDown(true)
                setGcash(false);
              }}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-colors text-sm font-medium"
            >
              Proceed with GCash
              <HiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default ConfirmGcash;