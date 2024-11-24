import { useMemo, useState } from 'react';
import { VscChromeClose, VscSearch } from "react-icons/vsc";
import jsPDF from "jspdf";
import AdminProfile from '../../../hooks/AdminHooks/AdminProfile.js';

const TotalReservations = ({ setTotalReserve, DashInfo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const {profile} = AdminProfile();
  console.log(DashInfo)
  const groupedReservations = useMemo(() => {
    return DashInfo.reduce((acc, reservation) => {
      if (!acc[reservation.user_ID]) {
        acc[reservation.user_ID] = {
          customerInfo: {
            name: reservation.name,
            id: reservation.user_ID,
          },
          reservations: []
        };
      }
      acc[reservation.user_ID].reservations.push(reservation);
      return acc;
    }, {});
  }, [DashInfo]);

  // Filter customers based on search query
  const filteredCustomers = useMemo(() => {
    return Object.values(groupedReservations).filter(userData =>
      userData.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) 
     // userData.customerInfo.id.toString().includes(searchQuery)
    );
  }, [groupedReservations, searchQuery]);


  const generatePDF = () => {
    // Initialize PDF document in portrait mode
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    
    // Helper function to check page break
    const checkPageBreak = (requiredSpace) => {
      if (yPosition + requiredSpace >= 280) {
        doc.addPage();
        yPosition = 20;
        return true;
      }
      return false;
    };
  
    // Helper function for centered text
    const addCenteredText = (text, y, fontSize = 12) => {
      doc.setFontSize(fontSize);
      const textWidth = doc.getStringUnitWidth(text) * fontSize / doc.internal.scaleFactor;
      const textOffset = (pageWidth - textWidth) / 2;
      doc.text(text, textOffset, y);
    };
  
    // Add header with logo (if available)
    doc.setFillColor(51, 122, 183); // Professional blue color
    doc.rect(0, 0, pageWidth, 15, 'F');
    
    // Title
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(16);
    addCenteredText('General Total Reservations Report', 10);
    
    // Reset text color to black
    doc.setTextColor(0, 0, 0);
    
    // Add report metadata
    yPosition += 15;
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    doc.text(`Generated on: ${currentDate} at ${currentTime}`, 10, yPosition);
    yPosition += 7;
    doc.text(`Generated by: ${profile[0].name}`, 10, yPosition);
    
    // Summary section
    yPosition += 15;
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Reservation Summary', 10, yPosition);
    
    // Add decorative line
    yPosition += 3;
    doc.setDrawColor(51, 122, 183);
    doc.setLineWidth(0.5);
    doc.line(10, yPosition, pageWidth - 10, yPosition);
    
    // Customer Details
    filteredCustomers.forEach((customer, index) => {
      yPosition += 15;
      checkPageBreak(40);
      
      // Customer Info Box
      doc.setFillColor(240, 240, 240);
      doc.setDrawColor(200, 200, 200);
      doc.roundedRect(10, yPosition - 5, pageWidth - 20, 12, 1, 1, 'FD');
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(`Customer ${index + 1}: ${customer.customerInfo.name}`, 15, yPosition + 2);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(10);
      doc.text(`ID: ${customer.customerInfo.id}`, pageWidth - 50, yPosition + 2);
      
      // Reservations
      customer.reservations.forEach((reservation) => {
        yPosition += 15;
        checkPageBreak(30);
        
        // Format dates
        const startDate = new Date(reservation.start_Date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        const returnDate = new Date(reservation.return_Date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        
        // Reservation details with improved formatting
        doc.setFont(undefined, 'bold');
        doc.text(`${reservation.product_Name}`, 20, yPosition);
        doc.setFont(undefined, 'normal');
        
        yPosition += 7;
        doc.text(`Start Date: ${startDate}`, 25, yPosition);
        doc.text(`Return Date: ${returnDate}`, pageWidth - 85, yPosition);
      });
      
      // Add separator between customers
      yPosition += 10;
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.line(15, yPosition, pageWidth - 15, yPosition);
    });
    
    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      addCenteredText(`Page ${i} of ${totalPages}`, 290);
    }
    
    // Save the PDF
    doc.save('reservation-report.pdf');
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={() => setTotalReserve(prev => ({ ...prev, TotalReserves: false }))}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-7xl mx-4 bg-gradient-to-br from-slate-900/70 to-black/50 backdrop-blur-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Total Reservations</h2>
            <button
              onClick={() => setTotalReserve(prev => ({ ...prev, TotalReserves: false }))}
              className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
            >
              <VscChromeClose className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <VscSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder:text-gray-400"
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
        <div className="overflow-y-auto h-[calc(100vh-15rem)]">
          
          <div className="p-6 space-y-6">
            {filteredCustomers.map((userData, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden"
              >
                {/* Customer Header */}
                <div className="bg-gray-900/50 px-4 py-3 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {userData.customerInfo.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        ID: {userData.customerInfo.id}
                      </p>
                    </div>
                    <div className="bg-blue-900/80 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      {userData.reservations.length} Items
                    </div>
                  </div>
                </div>

                {/* Reservations Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {userData.reservations.map((reservation, resIndex) => (
                      <div 
                        key={resIndex}
                        className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 hover:bg-gray-800/50 transition-all hover:shadow-md hover:scale-102 border border-gray-200/30"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-white text-sm truncate pr-2">
                            {reservation.product_Name}
                          </h4>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap ${
                              reservation.status === "Approved"
                                ? "bg-green-900/80 text-green-300"
                                : "bg-red-900/80 text-red-300"
                            }`}
                          >
                            {reservation.status}
                          </span>
                        </div>

                        <div className='mt-3'>
                       <img src={`http://localhost:8000/uploads/${reservation.picture}`} className='h-[8rem]' />
                      </div>
                        
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Item ID:</span>
                            <span className="text-gray-300">{reservation.item_id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Start:</span>
                            <span className="text-gray-300">
                              {new Date(reservation.start_Date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Return:</span>
                            <span className="text-gray-300">
                              {new Date(reservation.return_Date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span className="text-gray-300">{reservation.ReservationType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Qty:</span>
                            <span className="text-gray-300">{reservation.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalReservations;