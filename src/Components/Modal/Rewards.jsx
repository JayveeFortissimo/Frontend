import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineTrophy } from "react-icons/ai";

const Rewards = ({setRewards,setReferalsRewards,setReturnPoints}) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
    
    <div className="relative w-[30rem] bg-white rounded-xl shadow-xl">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">Rewards</h2>
          <AiOutlineTrophy  size={23} />
          </div>
          <button
            onClick={() => {
                setRewards(false)
            }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <VscChromeClose className="w-5 h-5 text-gray-500" />
          </button>
        </div>

    <div className="mt-4 flex flex-col gap-5">

    <button
    onClick={()=>{
        setRewards(false);
        setReferalsRewards(true);
    }}
        className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
      >
       REWARDS FROM REFFERALS
      </button>

    </div>

      
        
      </div>
    </div>
  </div>
  )
}

export default Rewards