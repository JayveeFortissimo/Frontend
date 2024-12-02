import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Sidebars } from '../../Store/Side.js';
import { FiArrowLeft, FiUser, FiMapPin, FiPhone, FiMail, FiMenu, FiX } from 'react-icons/fi';
import ReserveOrders from './Modal/ReserveOrders.jsx';
import History from './Modal/History.jsx';
import To_Return from './Modal/To_Return.jsx';
import FHistory from './Modal/FHistory.jsx';
import Cancelled from './Modal/Cancelled.jsx';

const UserDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userID = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isReserveOrders = useSelector(state => state.Side.Activity);

  const getActivityComponent = () => {
    const components = {
      'Reserve': <ReserveOrders userID={userID} />,
      'History': <History />,
      'Return': <To_Return userID={userID} />,
      'FinalH': <FHistory />,
      'Cancelled': <Cancelled />
    };
    return components[isReserveOrders];
  };

  const tabs = [
    { id: 'Reserve', label: 'Rental request' },
    { id: 'History', label: 'Approved' },
    { id: 'Return', label: 'To Return' },
    { id: 'FinalH', label: 'Completed' },
    { id: 'Cancelled', label: 'Cancelled' }
  ];

  const handleTabClick = (tabId) => {
    dispatch(Sidebars.Activity(tabId));
    setIsSidebarOpen(false); // Close sidebar after selection on mobile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6 w-full">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800 text-blue-400 hover:bg-gray-700 transition-colors duration-300"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-blue-400 mb-6">Navigation</h2>
          <div className="flex flex-col space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-300 text-left
                  ${isReserveOrders === tab.id
                    ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20 border border-blue-500/30'
                    : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800/80'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="max-w-7xl mx-auto">
        {userID.data1.map(pro => (
          <div key={pro.id} className="backdrop-blur-lg bg-gray-900/60 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  User Details
                </h1>
                <button
                  onClick={() => navigate('..')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-blue-400 hover:bg-gray-700 hover:text-blue-300 transition-all duration-300 border border-gray-700"
                >
                  <FiArrowLeft className="text-lg" />
                  <span>Back</span>
                </button>
              </div>
            </div>

            {/* User Info Card */}
            <div className="p-6">
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300">
                    <FiUser className="text-blue-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="font-medium text-white">{pro.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300">
                    <FiMapPin className="text-blue-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-400">Address</p>
                      <p className="font-medium text-white">{pro.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300">
                    <FiPhone className="text-blue-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-400">Contact</p>
                      <p className="font-medium text-white">{pro.contact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors duration-300">
                    <FiMail className="text-blue-400 text-xl" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium text-white">{pro.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Tabs */}
            <div className="hidden md:block px-6">
              <div className="bg-gray-800/50 backdrop-blur-md rounded-lg p-1">
                <nav className="flex flex-wrap gap-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => dispatch(Sidebars.Activity(tab.id))}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
                        ${isReserveOrders === tab.id
                          ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20 border border-blue-500/30'
                          : 'text-gray-400 hover:text-blue-400 hover:bg-gray-800/80'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {getActivityComponent()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;



// Loader function remains unchanged
export const userFullDetails = async ({ params }) => {
  const user_ID = params.userDetails;
  try {
    const [userResponse, ordersResponse] = await Promise.all([
      fetch(`https://backend-production-d6a2.up.railway.app/allusers/${user_ID}`),
      fetch(`https://backend-production-d6a2.up.railway.app/orders/${user_ID}`)
    ]);

    if (!userResponse.ok || !ordersResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const [data1, data2] = await Promise.all([
      userResponse.json(),
      ordersResponse.json()
    ]);

    return { data1, data2 };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};