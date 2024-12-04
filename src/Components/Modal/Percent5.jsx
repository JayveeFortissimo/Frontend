import { IoGift } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi";

const Percent5 = ({setOnuse, setIsRadio, setRadio }) => {

  return (

    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md mx-4 relative shadow-xl">
     
        {/* Icon and heading */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl">
            <IoGift className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Congratulations!</h2>
            <p className="text-gray-500">Exclusive discount waiting for you</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
          <div className="text-center">
            <span className="text-5xl font-bold text-blue-500">5%</span>
            <p className="text-gray-600 mt-2">Discount from your referral code</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3">
          <button 
           onClick={() =>{
            setRadio(true);
            setIsRadio(true);
            setOnuse(false);
           }}
           className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2">
            <span>Use 5% discount from referral code</span>
            <HiArrowRight size={18} />
          </button>
        
          <button 
          onClick={() => {
            localStorage.removeItem("Discount");
            setRadio(false)
            setOnuse(false);

          }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 px-6 rounded-xl font-semibold transition-colors">
            No, thanks
          </button>
        </div>
      </div>
    </div>
  );
};

export default Percent5;