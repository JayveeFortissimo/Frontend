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
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
  
    // Helper functions
    const centerText = (text, y) => {
      const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, y);
    };
  
    const getCurrentDate = () => {
      return new Date().toLocaleDateString('en-US', { 
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    const addPageIfNeeded = (neededSpace) => {
      if (yPosition + neededSpace > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
        // Add header to new page
        doc.setFontSize(10);
        doc.text(`Generated: ${getCurrentDate()}`, pageWidth - 80, 10);
        return true;
      }
      return false;
    };
  
    let yPosition = 20;
  
    // Header
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    centerText('Gown Rental System', yPosition);
    
    yPosition += 10;
    doc.setFontSize(18);
    centerText('User Management Report', yPosition);
  
    // Date
    yPosition += 10;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated: ${getCurrentDate()}`, pageWidth - 80, yPosition);
  
    // Divider
    yPosition += 5;
    doc.setLineWidth(0.5);
    doc.line(15, yPosition, pageWidth - 15, yPosition);
  
    // Summary section
    yPosition += 15;
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Summary Statistics', 15, yPosition);
    
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    
    // Calculate statistics
    const activeUsers = filteredUsers.filter(user => user.status === 0).length;
    const inactiveUsers = filteredUsers.filter(user => user.status === 1).length;
  
    // Display statistics
    const statistics = [
      `Total Registered Users: ${filteredUsers.length}`,
      `Active Users: ${activeUsers}`,
      `Inactive Users: ${inactiveUsers}`,
    ];
  
    statistics.forEach(stat => {
      doc.text(stat, 20, yPosition);
      yPosition += 7;
    });
  
    // User Details Section
    addPageIfNeeded(20);
    yPosition += 15;
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Detailed User Information', 15, yPosition);
  
    // User listing
    filteredUsers.forEach((user, index) => {
      addPageIfNeeded(65); // Approximate height needed for each user card
      yPosition += 15;
  
      // User card background
      doc.setFillColor(248, 250, 252); // Light gray background
      doc.setDrawColor(229, 231, 235); // Border color
      doc.roundedRect(15, yPosition - 5, pageWidth - 30, 55, 3, 3, 'FD');
  
      // User header
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`${user.name}`, 20, yPosition);
      
      // Status indicator
      const userStatus = user.status === 0 ? 'Active' : 'Inactive';
      const statusColor = user.status === 0 ? [34, 197, 94] : [239, 68, 68]; // Green for active, red for inactive
      doc.setTextColor(...statusColor);
      doc.setFontSize(10);
      doc.text(userStatus, pageWidth - 45, yPosition);
      doc.setTextColor(0, 0, 0); // Reset text color
  
      // User details in two columns
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');
      
      // Left column
      yPosition += 10;
      doc.text(`ID: ${user.id}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Email: ${user.email}`, 20, yPosition);
      yPosition += 8;
      doc.text(`Contact: ${user.contact}`, 20, yPosition);
  
      // Right column
      const rightColumnX = pageWidth / 2;
      yPosition -= 16;
      doc.text(`Address: ${user.address}`, rightColumnX, yPosition);
      yPosition += 8;
      doc.text(`Referral Code: ${user.referral_code}`, rightColumnX, yPosition);
      yPosition += 8;
      
      yPosition += 10; // Space after the card
    });
  
    // Footer for each page
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Footer line
      doc.setLineWidth(0.5);
      doc.line(15, pageHeight - 20, pageWidth - 15, pageHeight - 20);
      
      // Footer text
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Gown Rental Management System', 15, pageHeight - 10);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 10);
    }
  
    doc.save('User_Management_Report.pdf');
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