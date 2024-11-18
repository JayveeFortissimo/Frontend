import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  FiShoppingCart, 
  FiTrash2, 
  FiArrowLeft,
  FiCalendar,
  FiAlertCircle,
  FiShoppingBag,
  FiClock,
  FiDollarSign,
  FiPackage,
  FiTag
} from 'react-icons/fi';
import Carts from '../hooks/Tocart_check.js';
import Fitting from '../Components/Fitting.jsx';
import Choose from '../Components/Choose.jsx';
import Think from '../Components/Think.jsx';

const Cart = () => {
  const { allOrders, removeItems, total } = Carts();
  const navigate = useNavigate();
  const [openFitting, setOpenFitting] = useState(false);
  const [openChoose, setOpenChoose] = useState(false);
  const [sure, setSure] = useState(false);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      {sure && <Think Navigate={navigate} setSure={setSure} />}

      {
  /*
  {openChoose && <Choose setOpenFitting={setOpenFitting} setOpenChoose={setOpenChoose} />}
      {openFitting && <Fitting setOpenFitting={setOpenFitting} />}
      */
      }
      

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate('/items')} 
                className="flex items-center gap-2 text-white hover:text-emerald-100 transition-all duration-300 transform hover:scale-105"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span className=" xs:text-[0.8rem]   font-medium">Continue Shopping</span>
              </button>

            

              <div className="flex items-center gap-3">
                <h1 className="xs:text[0.9rem] md:text-xl font-bold text-white">Cart</h1>
                <FiShoppingCart className="w-7 h-7 text-white" />
              </div>
              
         <div></div>



            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="space-y-8">
          {allOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <FiShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
              <p className="text-gray-500 text-xl font-medium mb-4">Your cart is empty</p>
              <button 
                onClick={() => navigate('/items')}
                className="px-8 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              {allOrders.map(item => (
                <div key={item.id} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    <div className="w-full md:w-48 h-48">
                      <img 
                        src={`http://localhost:8000/uploads/${item.picture}`}
                        alt={item.product_Name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{item.product_Name}</h3>
                          <div className="mt-1 flex items-center gap-2">
                            <FiTag className="w-4 h-4 text-violet-600" />
                            <span className="text-gray-600">{item.type}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeItems(item.id)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-all duration-300"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiPackage className="w-4 h-4 text-violet-600" />
                          <span>Size: {item.size}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiShoppingBag className="w-4 h-4 text-violet-600" />
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-6 text-gray-600">
                         
                          <span>Price:  ₱{item.price}</span>
                          <span>Additional Fee: ₱{item.additional}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4 pt-2">
                        <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors px-4 py-2 rounded-xl">
                          <FiCalendar className="w-4 h-4 " />
                          <span className="text-sm ">
                            Start: {new Date(item.start_Date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl">
                          <FiClock className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-700">
                            Return: {new Date(item.return_Date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <span className="text-xl font-semibold text-violet-600">
                          ₱{item.subTotal.toLocaleString('en-US')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Summary Section */}
              <div className="mt-8 space-y-6">
                <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-gray-900">Total Amount</span>
                    <span className="text-3xl font-bold text-violet-600">
                      ₱{total?.toLocaleString('en-US') ?? '0'}
                    </span>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-2xl overflow-hidden">
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <FiAlertCircle className="w-5 h-5 text-orange-500" />
                      <h3 className="text-lg font-semibold text-orange-800">Cancellation Policy</h3>
                    </div>
                    <p className="text-sm text-orange-700 leading-relaxed">
                      Waiting for Cancellation policy
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {
               /*
               <button 
                    onClick={() => setOpenChoose(true)}
                    className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50  flex items-center justify-center gap-2 font-medium"
                  >
                    <FiCalendar className="w-5 h-5" />
                    Schedule Fitting Appointment
                  </button>
              */
                  }
              
                  <button 
                    onClick={() => navigate('/items')}
                    className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50  flex items-center justify-center gap-2 font-medium"
                  >
                    <FiCalendar className="w-5 h-5" />
                    Continue Shopping
                  </button>


                  <button 
                    onClick={() => total === null ? toast.error("Please add items to cart first") : setSure(true)}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-102 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-medium"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;