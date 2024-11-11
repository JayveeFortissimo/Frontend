
import { VscChromeClose } from "react-icons/vsc";
import { BsCashStack } from "react-icons/bs";
import { HiArrowRight } from "react-icons/hi";
import Referalpoints from '../../hooks/Referalpoints.js';

const DownPayment = ({ setDownpayment, DownpaymentInstore, total, allGownSecurity }) => {
  
  const displayDiscount = JSON.parse(localStorage.getItem("Discount"));
  const downpaymentAmount = (parseInt(total) + (200 * allGownSecurity)) * 0.30;

  const TotalsAll =  displayDiscount? downpaymentAmount * 0.95 : downpaymentAmount;

  const { Refresh } = Referalpoints();


  return (

    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Modal Content */}
      <form
        onSubmit={(e) =>{
          e.preventDefault()
          DownpaymentInstore(e, TotalsAll);
          displayDiscount? Refresh(e) : undefined;
          //!WAIT PA HERE
          displayDiscount && localStorage.removeItem("Discount");
        }}
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header Section */}
        <div className="absolute right-4 top-4 z-10">
          <button
            type="button"
            onClick={() => setDownpayment(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <VscChromeClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content Container */}
        <div className="p-8">
          {/* Icon and Title Section */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
              <BsCashStack className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                In-Store Payment Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                30% Downpayment Required: ₱{downpaymentAmount}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 text-[0.8rem]">
              <p className="text-gray-600">
                To secure your reservation and proceed with the in-store payment option, 
                a 30% downpayment (₱{downpaymentAmount}) is required through our online payment system.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Why is this required?</h3>
              <ul className="space-y-2 text-sm text-gray-600 text-[0.8rem]">
                <li className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  Secures your reservation
                </li>
                <li className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  Prevents fraudulent activities
                </li>
                <li className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  Ensures service integrity
                </li>
              </ul>
            </div>
            
         <div className="mt-3 text-[0.8rem]">
             <p>Downpayment : 30%</p>
             <p>Discount: {displayDiscount? "5%": 0}</p>
             <p>Original Total: ₱{downpaymentAmount}</p>
             <p>Final Total: ₱{TotalsAll} </p>
         </div>


          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setDownpayment(false)}
              className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 transition-colors text-sm font-medium"
            >
              Proceed to Payment
              <HiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DownPayment;