import { useState, useRef, useEffect } from "react";
import History from "../../../hooks/AdminHooks/History.js";
import { MdWarning } from "react-icons/md";
import { BsCalendarDate, BsCalendarCheck } from "react-icons/bs";
import { FaQrcode } from "react-icons/fa";
import ConfirmReturn from "./ConfirmReturn.jsx";
import Scanner from "./Scanner.jsx";

const ToReturn = ({ userID }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
 const ItemID = useRef(0);
  const savedEvent = useRef(null);
  const { toReturn, setToReturn } = History(userID.data1[0].id);
  const [openScanner, setOpenScanner] = useState(false);


  const [info, setInfo] = useState({
    product_Name: "",
    picture: "",
    start_Date: "",
    return_Date: "",
    status: "",
    user_ID: 0,
    penalty: 0,
    quantity:0,
    returnID: 0,
    code:""
  });


  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        <BsCalendarCheck className="relative w-16 h-16 mb-4 text-blue-400" />
      </div>
      <p className="text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        No Items to Return
      </p>
      <p className="text-gray-500 mt-2">All your items are up to date</p>
    </div>
  );

  const ReturnCard = ({ item }) => {
    const dateOfNow = new Date();
    const startDate = new Date(item.start_Date);
    const returnDate = new Date(item.return_Date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const startFormatted = startDate.toLocaleDateString('en-US', options);
    const returnFormatted = returnDate.toLocaleDateString('en-US', options);
    
    const isPastReturnDate = dateOfNow > returnDate;
    const daysNotReturned = Math.floor((dateOfNow - returnDate) / (1000 * 60 * 60 * 24));
    const penaltyPerDay = 500;
    const totalPenalty = isPastReturnDate ? daysNotReturned * penaltyPerDay : 0;

    return (
      <div className="group relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300 ${
          isPastReturnDate ? 'bg-red-500/20' : 'bg-emerald-500/20'
        }`} />
        
        <div className={`relative flex flex-col md:flex-row gap-6 p-6 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
          isPastReturnDate 
            ? 'bg-gray-800/50 border-red-500/30 hover:bg-gray-800/70' 
            : 'bg-gray-800/50 border-emerald-500/30 hover:bg-gray-800/70'
        }`}>
          {/* Image Container */}
          <div className="w-full md:w-48 h-48 flex-shrink-0 relative group overflow-hidden rounded-lg">
            <img
              src={`https://backend-production-024f.up.railway.app/uploads/${item.picture}`}
              alt={item.product_Name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content Container */}
          <div className="flex flex-col flex-grow gap-4">
            {/* Product Name */}
            <h3 className="text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {item.product_Name}
            </h3>

            {/* Warning for Past Due Items */}
            {isPastReturnDate && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400">
                  <MdWarning className="w-5 h-5" />
                  <span className="font-medium">Return Required</span>
                </div>
                {daysNotReturned > 0 && (
                  <div className="mt-2 space-y-1">
                    <p className="text-red-400">{daysNotReturned} day{daysNotReturned > 1 ? 's' : ''} overdue</p>
                    <p className="text-lg font-semibold text-red-400">Penalty: ₱{totalPenalty.toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group/date flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                <BsCalendarDate className="w-4 h-4" />
                <span className="group-hover/date:translate-x-1 transition-transform">
                  Started: {startFormatted}
                </span>
              </div>
              <div className="group/date flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors">
                <BsCalendarCheck className="w-4 h-4" />
                <span className={`group-hover/date:translate-x-1 transition-transform ${
                  isPastReturnDate ? 'text-red-400' : ''
                }`}>
                  Due: {returnFormatted}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-auto pt-4 flex gap-4 flex-wrap">
              <button
                onClick={() => {
                  ItemID.current = item.id;
                  setOpenScanner(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-purple-500/30 text-blue-400 hover:text-purple-400 transition-all duration-300"
              >
                <FaQrcode className="w-5 h-5" />
                <span>Scan QR Code</span>
              </button>


          <button  
           onClick={()=>{
            setInfo({
              product_Name: item.product_Name,
              picture: item.picture,
              start_Date: startFormatted,
              return_Date: returnFormatted,
              status: item.status,
              user_ID: userID.data1[0].id,
              penalty: totalPenalty,
              quantity:item.quantity,
              code:item.code,
              returnID: item.id
            });
            setOpenConfirmation(true);
           }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 hover:border-purple-500/30 text-blue-400 hover:text-purple-400 transition-all duration-300">
          Order complete
          </button>
            
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {openScanner && (
        <Scanner
          setOpenScanner={setOpenScanner}
          toReturn={toReturn}
          setToReturn={setToReturn}
          ItemID={ItemID}
        />
      )}

      {openConfirmation && (
        <ConfirmReturn
          setOpenConfirmation={setOpenConfirmation}
          Info={info}
          setToReturn={setToReturn}
          toReturn={toReturn}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl blur-xl" />
          
          {/* Content */}
          <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
            <div className="space-y-6 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50">
              {toReturn.length === 0 ? (
                <EmptyState />
              ) : (
                toReturn.map(item => (
                  <ReturnCard key={item.id} item={item} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToReturn;