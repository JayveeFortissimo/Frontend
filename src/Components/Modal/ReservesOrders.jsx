import { useDispatch } from "react-redux";
import { Cancels } from "../../Store/Cancelled.js";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { 
  MdOutlineRemoveShoppingCart,
  MdOutlineShoppingBag,
  MdOutlineCalendarToday,
  MdOutlineCancelPresentation
} from "react-icons/md";
import { 
  IoTimeOutline, 
  IoAlertCircleOutline 
} from "react-icons/io5";

const ReservesOrders = ({ allOrders, user_ID, setAllOrders }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pendingOrders = allOrders.filter(order => order.status === "Waiting for approval");

  useEffect(() => {
    const socket = io('https://backend-production-62ff.up.railway.app');
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });
    
    socket.on('deleteItem', (deletedItem) => {
      setAllOrders((prevItems) => {
        return prevItems.filter(item => item.id !== deletedItem.id);
      });
    });


    socket.on('EditStatus', (element) => {
    
      setAllOrders((prevItems) => {
        return prevItems.map(item => {
          if (item.id === element.product_ID) {
            
            return { ...item, status: element.status };
          }
          return item; 
        });
      });

    });

    //!May Problem pa d2
    socket.on('CancelAppountment', (element) => {
      console.log(element)
      console.log(allOrders)
      setAllOrders((prevItems) => {
        return prevItems.filter(item => item.user_ID !== element.id);
      });

    });
    

    return () => {
      socket.off('connect');
      socket.off('EditStatus');
      socket.off('CancelAppountment');
      socket.disconnect();
  
    };
  }, [setAllOrders]);

  
  const StatusBadge = ({ status }) => (
    <div className="absolute top-2 right-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
      bg-yellow-100 text-yellow-800"
    >
      <IoAlertCircleOutline className="w-3 h-3" />
      <span className="hidden sm:inline">Awaiting Approval</span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">My Pending Reservations</h2>
      
      <div className="space-y-4 sm:space-y-6">
        {pendingOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-12 text-center">
            <MdOutlineRemoveShoppingCart className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-gray-400" />
            <h3 className="mt-3 text-lg sm:text-xl font-semibold text-gray-900">No Pending Reservations</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">All your orders have been approved</p>
            <button
              onClick={() => navigate('/items')}
              className="mt-4 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 
                transition duration-300 inline-flex items-center gap-2"
            >
              <MdOutlineShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              Browse Items
            </button>
          </div>
        ) : (
          pendingOrders.map(pro => {
            const startDate = new Date(pro.start_Date);
            const returnDate = new Date(pro.return_Date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const Starto = startDate.toLocaleDateString('en-US', options);
            const returns = returnDate.toLocaleDateString('en-US', options);

            return (
              <div 
                key={pro.id} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <img 
                        src={`https://backend-production-62ff.up.railway.app/uploads/${pro.picture}`} 
                        alt={pro.product_Name} 
                        className="h-36 w-full sm:h-40 sm:w-40 object-cover rounded-lg shadow-sm"
                      />
                      <StatusBadge status={pro.status} />
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{pro.product_Name}</h3>
                        <p className="text-base font-medium text-gray-700">₱{pro.price}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <MdOutlineCalendarToday className="w-4 h-4" />
                            <div>
                              <p className="text-xs">Start</p>
                              <p className="font-medium">{Starto}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <IoTimeOutline className="w-4 h-4" />
                            <div>
                              <p className="text-xs">Return</p>
                              <p className="font-medium">{returns}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="bg-gray-50 rounded p-2">
                            <p className="text-xs text-gray-600">Total</p>
                            <p className="font-semibold text-gray-900">₱{pro.subTotal}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
                          <div className="flex gap-4 text-sm text-gray-600">
                            <p>Size: <span className="font-medium">{pro.size}</span></p>
                            <p>Qty: <span className="font-medium">{pro.quantity}</span></p>
                          </div>

                          <button
                            onClick={() => {
                              dispatch(Cancels.setCancell(pro, user_ID));
                              dispatch(Cancels.setReasonToopen(true));
                            }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 
                              bg-red-600 text-white text-sm rounded hover:bg-red-700 transition duration-300"
                          >
                            <MdOutlineCancelPresentation className="w-4 h-4" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ReservesOrders;