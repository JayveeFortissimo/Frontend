    import { VscChromeClose } from "react-icons/vsc";
    
    const AllHistory = ({setTotalReserve, AllHistory}) => {
 
 
    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50">

      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={() => setTotalReserve(prev => ({ ...prev, History: false }))}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-7xl mx-4 bg-gradient-to-br from-slate-900/70 to-black/50 backdrop-blur-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">History</h2>
            <button
              onClick={() => setTotalReserve(prev => ({ ...prev, History: false }))}
              className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
            >
              <VscChromeClose className="w-5 h-5 text-gray-400" />
            </button>
          </div>

         
   asdasdasd
     
         
        </div>
      </div>
    </div>
  )
}

export default AllHistory;