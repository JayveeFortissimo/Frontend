import React, { useState } from 'react';
import { 
  VscChromeClose, 
  VscSearch,
  VscMail,
  VscCallIncoming,
  VscLocation,
  VscPass,
  VscError
} from "react-icons/vsc";
import jsPDF from "jspdf";


const NumberofUsers = ({ setTotalReserve, DashInfo }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = DashInfo.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const generatePDF = () => {
    const doc = new jsPDF();
    let yPosition = 10;
    
    // Title
    doc.setFontSize(20);
    doc.text('General Total Reservations Report', 10, yPosition);
    
    // Summary section
    yPosition += 10;
    doc.setFontSize(14);
    doc.text('Summary:', 10, yPosition);
    
    yPosition += 5;
    doc.setFontSize(12);
    doc.text('---------------------------------', 10, yPosition);
    
    // Calculate total users
    const totalUsers = filteredUsers.length;
    yPosition += 10;
    doc.text(`Total Users: ${totalUsers}`, 10, yPosition);
    
    // User Details
    filteredUsers.forEach((user, index) => {
      yPosition += 15;
      
      // Add new page if content exceeds page height
      if (yPosition >= 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      // User header
      doc.setFont(undefined, 'bold');
      doc.text(`User ${index + 1}: ${user.name}`, 10, yPosition);
      doc.setFont(undefined, 'normal');
      
      // User details
      yPosition += 7;
      doc.text(`ID: ${user.id}`, 20, yPosition);
      
      yPosition += 7;
      doc.text(`Email: ${user.email}`, 20, yPosition);
      
      yPosition += 7;
      doc.text(`Contact: ${user.contact}`, 20, yPosition);
      
      yPosition += 7;
      doc.text(`Address: ${user.address}`, 20, yPosition);
      
      yPosition += 7;
      doc.text(`Referral Code: ${user.referral_code}`, 20, yPosition);
      
      yPosition += 7;
      const userStatus = user.status === 0 ? 'Active' : 'Inactive';
      doc.text(`Status: ${userStatus}`, 20, yPosition);
      
      // Separator between users
      yPosition += 7;
      doc.text('---------------------------------', 10, yPosition);
    });
    
    // End of report
    yPosition += 10;
    doc.text('End of Report', 10, yPosition);
    
    doc.save('reservation-report.pdf');
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with modern blur effect */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setTotalReserve(prev => ({ ...prev, NumbersOfUsers: false }))}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl mx-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100">
        {/* Header */}
        <div className="flex flex-col gap-4 p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              User Directory
            </h2>
            <button
              onClick={() => setTotalReserve(prev => ({ ...prev, NumbersOfUsers: false }))}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <VscChromeClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <VscSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50/50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className='ml-7'>
     <button
              onClick={generatePDF}
              className="
                px-5 py-1 rounded-lg
                bg-gradient-to-r from-blue-500 to-purple-500
                text-white font-medium
                hover:shadow-lg hover:shadow-blue-500/25
                transition-all duration-200
                flex items-center gap-2
              "
            >
              Print Report
            </button>
     </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto h-[32rem] custom-scrollbar">
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group"
                >
                  {/* User Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        ID: {user.id}
                      </p>
                    </div>
                    {user.status === 0 ? (
                      <VscError className="w-5 h-5 text-red-500" />
                    ) : (
                      <VscPass className="w-5 h-5 text-green-500" />
                    )}
                  </div>

                  {/* User Details */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <VscMail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-600 truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <VscCallIncoming className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-600">{user.contact}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <VscLocation className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-600 truncate">{user.address}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumberofUsers;