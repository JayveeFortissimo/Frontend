import { useState, useRef, useEffect } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import { BiDollar } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const SecurityDeposit = ({ setTotalReserve, DashInfo, setSecurityDeposit}) => {
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [allDatas, setAlldatas] = useState([]);
  const [showNoDate, setShowNoDate] = useState(false);
  const code = useRef("");

  useEffect(() => {
    const socket = io('https://backend-production-024f.up.railway.app');
    setAlldatas(DashInfo);

    socket.on("securityUpdated", (updatedData) => {
      setAlldatas((prevData) =>
        prevData.map((item) =>
          item.Code === updatedData.code ? { ...item, Security: updatedData.Security } : item
        )
      );

      setSecurityDeposit(pre => ({
        ...pre,
        TotalIncomes: pre.TotalIncomes - 200
      }));
      toast.success("Security updated successfully!");
    });

    return () => {
      socket.off("securityUpdated");
    };
  }, [DashInfo]);

  const validDeposits = allDatas.filter(r => Number(r.Security) !== 0);
  const totalAmount = validDeposits.reduce((sum, r) => sum + Number(r.Security), 0);

  // Separate deposits based on date
  const regularDeposits = validDeposits.filter(r => r.Datenow !== "no_Date");
  const noDateDeposits = validDeposits.filter(r => r.Datenow === "no_Date");

  const handleProcessReturn = (reservation) => {
    setSelectedDeposit(reservation);
    setShowReturnModal(true);
  };

  const confirmReturn = async(e, condition, Date) => {
    e.preventDefault();

    if(condition === "perfect"){
      try{
        const response = await fetch(`https://backend-production-024f.up.railway.app/processSecurity`,{
          method:"PUT",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            code:code.current
          })
        });
      
        if(!response.ok) return console.log("Have a problem here");
        toast.success("Updated");
        setAlldatas((pro) => pro.filter((item) => item.Code !== code.current));
      } catch(error){
        console.log(error);
      }
    } else if(condition === "damaged"){
      try{
        const response = await fetch(`https://backend-production-024f.up.railway.app/DamageItems`,{
          method:"PUT",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            code:code.current,
            date:"no_Date"
          })
        });
      
        if(!response.ok) return console.log("Have a problem here");
        toast.success("Updated");
        setAlldatas((pro) => pro.filter((item) => item.Code !== code.current));
      } catch(error){
        console.log(error);
      }
    }

    setShowReturnModal(false);
    setSelectedDeposit(null);
  };

  const DepositCard = ({ reservation }) => (
    <div className="relative overflow-hidden group bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-5 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-white">{reservation.Name}</h3>
        </div>
        <div className="flex items-center">
          <BiDollar className="text-blue-400" size={20} />
          <span className="text-white font-semibold">{reservation.Security}</span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          {reservation.Datenow}
        </div>
      </div>

      <button 
        onClick={() => {
          handleProcessReturn(reservation);
          code.current = reservation.Code;
        }}
        className="w-full mt-4 py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors duration-200"
      >
        Process Return
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 px-5">
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/50 backdrop-blur-sm" />
      
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 w-full max-w-6xl h-[85vh] p-8 shadow-2xl overflow-auto rounded-2xl border border-slate-700">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-8">
          <div>
            <h1 className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Gown Security Deposits
            </h1>
            <p className="text-slate-400 text-sm mt-1">Total Deposits Held: ₱{totalAmount.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowNoDate(!showNoDate)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
            >
              <FaFilter size={16} />
              {showNoDate ? 'Show All' : 'Show No Date'}
            </button>
            <button 
              onClick={() => setTotalReserve((pro) => ({ ...pro, SecurityDeposit: false }))}
              className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <VscChromeClose className="text-slate-400 hover:text-white" size={24} />
            </button>
          </div>
        </div>

        {/* Deposits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(showNoDate ? noDateDeposits : regularDeposits).map((reservation, index) => (
            <DepositCard key={index} reservation={reservation} />
          ))}
        </div>

        {validDeposits.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400">No active security deposits</p>
          </div>
        )}

        {/* Return Processing Modal */}
        {showReturnModal && selectedDeposit && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-slate-800 p-6 rounded-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-white mb-4">Process Gown Return</h3>
              <p className="text-slate-300 mb-6">
                User Item is Back already?
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={(e) => confirmReturn(e, 'perfect', selectedDeposit.Datenow)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400"
                >
                  <span>No damage?</span>
                  <FaCheckCircle />
                </button>
                <button
                  onClick={(e) => confirmReturn(e, 'damaged', selectedDeposit.Datenow)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <span>Damaged - No Deposit</span>
                  <MdWarning />
                </button>
              </div>

              <button
                onClick={() => setShowReturnModal(false)}
                className="mt-4 w-full p-2 rounded-lg border border-slate-600 text-slate-400 hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityDeposit;