import { VscChromeClose } from "react-icons/vsc";
import { AiOutlineTrophy } from "react-icons/ai";
import { FiUser, FiMail } from "react-icons/fi";
import RefferalPoints from "../../hooks/Referalpoints.js";

const ReferalsPoints = ({setReferalsRewards, setRewards}) => {
    
  const { allPoints } = RefferalPoints();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative w-[30rem] h-[30rem] overflow-auto bg-white rounded-xl shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">REFERRLS POINTS INFO</h2>
              <AiOutlineTrophy size={23} />
            </div>
            <button
              onClick={() => {
                setReferalsRewards(false);
                setRewards(true);
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <VscChromeClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="mt-12 flex flex-col gap-5">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white w-[20rem]">
                <h3 className="text-[1rem] font-medium mb-2">Total Referrals</h3>
                <p className="text-[1rem] font-bold">{allPoints?.users?.length || 0}</p>
                <p className='text-[0.7rem]'>{allPoints?.users?.length === 5? "Congrats you have a 5% Discount please check in checkout":undefined}</p>
              </div>
            </div>

            <div className="overflow-hidden">
              {/* Desktop View */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 overflow-auto max-h-[20rem]">
                    {allPoints?.users?.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                                {user.name[0].toUpperCase()}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View - Cards */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {allPoints?.users?.map((user, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                        {user.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <FiUser className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{user.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FiMail className="text-gray-400" />
                          <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReferalsPoints;