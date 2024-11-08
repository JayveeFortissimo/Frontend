import { useMemo, useState } from 'react';
import { VscChromeClose, VscSearch } from "react-icons/vsc";
import jsPDF from "jspdf";

const TotalReservations = ({ setTotalReserve, DashInfo }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Group reservations by CustomerID
  const groupedReservations = useMemo(() => {
    return DashInfo.reduce((acc, reservation) => {
      if (!acc[reservation.CustomerID]) {
        acc[reservation.CustomerID] = {
          customerInfo: {
            name: reservation.name,
            id: reservation.CustomerID,
          },
          reservations: []
        };
      }
      acc[reservation.CustomerID].reservations.push(reservation);
      return acc;
    }, {});
  }, [DashInfo]);

  // Filter customers based on search query
  const filteredCustomers = useMemo(() => {
    return Object.values(groupedReservations).filter(userData =>
      userData.customerInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userData.customerInfo.id.toString().includes(searchQuery)
    );
  }, [groupedReservations, searchQuery]);


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
    
    // Customer Details
    filteredCustomers.forEach((customer, index) => {
      yPosition += 15;
      
      // Add page if content exceeds page height
      if (yPosition >= 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Customer Info
      doc.setFont(undefined, 'bold');
      doc.text(`Customer ${index + 1}: ${customer.customerInfo.name} (ID: ${customer.customerInfo.id})`, 10, yPosition);
      
      // Reservations
      doc.setFont(undefined, 'normal');
      customer.reservations.forEach((reservation) => {
        yPosition += 10;
        
        // Add page if content exceeds page height
        if (yPosition >= 280) {
          doc.addPage();
          yPosition = 20;
        }
        
        // Format dates
        const startDate = new Date(reservation.StartDate).toLocaleDateString();
        const returnDate = new Date(reservation.ExpectedReturnDate).toLocaleDateString();
        
        doc.text(`• Item: ${reservation.product_Name}`, 20, yPosition);
        yPosition += 7;
        doc.text(`  Start Date: ${startDate}`, 20, yPosition);
        yPosition += 7;
        doc.text(`  Return Date: ${returnDate}`, 20, yPosition);
        yPosition += 7;
      });
      
      // Add separator between customers
      yPosition += 5;
      doc.text('---------------------------------', 10, yPosition);
    });
    
    // End of report
    yPosition += 10;
    doc.text('End of Report', 10, yPosition);
    
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
                        
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Item ID:</span>
                            <span className="text-gray-300">{reservation.ItemID}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Start:</span>
                            <span className="text-gray-300">
                              {new Date(reservation.StartDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Return:</span>
                            <span className="text-gray-300">
                              {new Date(reservation.ExpectedReturnDate).toLocaleDateString()}
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