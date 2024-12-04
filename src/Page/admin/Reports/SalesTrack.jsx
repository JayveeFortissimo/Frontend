import { VscChromeClose } from "react-icons/vsc";

const SalesTrack = ({setTotalReserve}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-10 px-5">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 to-black/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-4xl h-[35rem] overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="absolute -left-24 -top-24 w-48 h-48 bg-blue-500 rounded-full blur-[100px] opacity-20" />
        <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-purple-500 rounded-full blur-[100px] opacity-20" />
        
        <div className="relative p-6 h-full overflow-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rental Income
              </h2>
             
            </div>
            <button
              onClick={() => setTotalReserve((prev) => ({ ...prev, SalesTack: false }))}
              className="p-2 rounded-full hover:bg-slate-700/50 transition-colors"
            >
              <VscChromeClose className="text-slate-400 hover:text-white" size={20} />
            </button>
          </div>


               </div>
               </div>
          
          </div>
  )
}

export default SalesTrack