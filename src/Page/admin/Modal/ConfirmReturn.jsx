import { AiOutlineInfoCircle } from "react-icons/ai";
import ReturnITEMS from '../../../hooks/AdminHooks/UserReturned.js';

const ConfirmReturn = ({ setOpenConfirmation, Info, setToReturn, toReturn }) => {

  const { PushHistory } = ReturnITEMS(setToReturn, toReturn);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => setOpenConfirmation(false)}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl">
        <div className="p-6 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 rounded-lg">
              <AiOutlineInfoCircle className="w-5 h-5 text-zinc-700" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-800">
              Confirm Item Return
            </h2>
          </div>

          {/* Message */}
          <p className="text-zinc-600 text-sm leading-relaxed">
            Are you sure you want to mark this item as returned? This action will update the system and may affect penalties.
          </p>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button 
              onClick={() => setOpenConfirmation(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-700
                border border-zinc-200 
                hover:bg-zinc-50 active:bg-zinc-100 
                transform active:scale-[0.98] transition-all
                focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              Cancel
            </button>
            <button 
              onClick={(e) => PushHistory(e, Info)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white
                bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900
                transform active:scale-[0.98] transition-all
                focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              Confirm Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReturn;