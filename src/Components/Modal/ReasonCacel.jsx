import { useDispatch } from "react-redux";
import { Cancels } from '../../Store/Cancelled.js';
import { VscChromeClose } from "react-icons/vsc";

const ReasonCancel = ({ setReasonCancel, PushToHistoryCancel }) => {
  
  const dispatch = useDispatch();

  const cancelReasons = [
    {
      id: "reason1",
      label: "Accidentally Clicked",
      value: "Accidentally Clicked"
    },
    {
      id: "reason2",
      label: "I Changed My Mind",
      value: "I Changed My Mind"
    },
    {
      id: "reason3",
      label: "I Don't Want This Item Anymore",
      value: "I Don't Want This Item Anymore"
    },
    {
      id: "reason4",
      label: "I Don't Want! That's It",
      value: "I don't want, That's it"
    },
    {
      id: "reason5",
      label: "Found Cheaper Elsewhere",
      value: "Found Cheaper elsewhere"
    }
  ];

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
        onClick={() => dispatch(Cancels.setX(false))}
      />

      <div className="relative bg-white w-full max-w-[30rem] p-6 rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b">
          <h2 className="text-lg font-semibold">Reason For Cancellation</h2>
          <button
            onClick={() => dispatch(Cancels.setX(false))}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <VscChromeClose size={24} className="text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* Form */}
        <form 
          onSubmit={(e) => {
            PushToHistoryCancel(e);
            dispatch(Cancels.setX(false));
          }}
          className="space-y-4"
        >
          {cancelReasons.map((reason) => (
            <label
              key={reason.id}
              htmlFor={reason.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex-1">
                <span className="text-gray-700">{reason.label}</span>
              </div>
              <input
                type="radio"
                id={reason.id}
                name="cancelReason"
                value={reason.value}
                onChange={(e) => setReasonCancel(e.target.value)}
                className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500 cursor-pointer"
              />
            </label>
          ))}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full h-10 bg-neutral-700 text-white rounded-lg
                         hover:bg-amber-600 transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Confirm Cancellation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReasonCancel;