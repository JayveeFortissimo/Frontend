import { useLoaderData } from 'react-router-dom';
import { VscCalendar, VscJersey, VscAccount, VscOutput, VscBell, VscBellDot } from "react-icons/vsc";
import { IoIosPie } from "react-icons/io";
import { useState, useEffect } from 'react';
import Notif from './Modal/Notif';
import TotalReservations from './Reports/TotalReservations';
import NumbersOfUsers from './Reports/NumberofUsers';
import TotalGowns from './Reports/TotalGowns';
import HavePenaltys from './Reports/Cacelled';
import ReservesToday from './Reports/ReservesToday';
import PieCharts from './Reports/PieCharts';
import io from 'socket.io-client';
import jsPDF from 'jspdf';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IoIosToday } from "react-icons/io";
import AdminProfile from '../../hooks/AdminHooks/AdminProfile';
import Dashboards from '../../hooks/AdminHooks/Dasboards';

const Dashboard = () => {

  const DashInfo = useLoaderData();

 //!THI IS HOOKS 
  const {profile} = AdminProfile();
  const { TodaysRented , RentedGowns, pieChart, cancels ,  setTodaysRented, setRentedGowns, setCancels} = Dashboards();

   const [filteredData, setFilteredData] = useState([]);
   const [selectedMonth, setSelectedMonth] = useState('All Months');
    const [notifications, setNotifications] = useState(false);

  
    useEffect(() =>{
      const socket = io('http://localhost:8000');
  
      socket.on('connect', () => {
        console.log('Connected to Socket.IO server');
      });

      socket.on('bellsDash', () => {
           setNotifications(true);
      });
        
      socket.on('newCheckOut', (data) => {

  setTodaysRented(prevOrders => {
    const quantitySum = data.checkouts.reduce((total, item) => total + (item.quantity || 0), 0);
    return {
      reservations: [...(prevOrders?.reservations || []), ...data.checkouts],
      totalReservations: parseInt(prevOrders?.totalReservations || 0) + quantitySum
    };
  });

  setRentedGowns(prevOrders => {
    if (!prevOrders || typeof prevOrders.reservations === 'undefined') {
      prevOrders = { totalReservations: 0, reservations: [] };
    }

    const quantitySum = data.checkouts.reduce((total, item) => total + (item.quantity || 0), 0);
    return {
      ...prevOrders,
      reservations: [...prevOrders.reservations, ...data.checkouts],
      totalReservations: parseInt(prevOrders.totalReservations) + quantitySum
    };
  });
        
      });


      socket.on('canceled', (data) => {
        setCancels((prevOrders) => {

          const updatedCancelledDetails = Array.isArray(prevOrders.cancelledDetails) 
            ? prevOrders.cancelledDetails 
            : [];
          
          return {
            ...prevOrders,
            cancelledDetails: [...updatedCancelledDetails, data]
          };
        });
  
        setCancels((prevOrders) => ({
          ...prevOrders,
          totalCancelled: parseInt(prevOrders.totalCancelled) + data.quantity
        }));
        
      });
      

      return () => {
        socket.off('bellsDash');
        socket.off('newCheckOut');
        socket.off('canceled');
        socket.disconnect();
      };
  
    },[]);
  

  const filterData = (month) => {
    let filtered;
    if (month === 'All Months') {
      filtered = DashInfo.data7;
    } else {
      filtered = DashInfo.data7.filter(item => item.Date === month);
    }
    setFilteredData(filtered.map(item => ({ name: item.Date, reservations: item.total_count })));
  };

  useEffect(() => {
    filterData(selectedMonth);
  }, [selectedMonth, DashInfo.data7]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const [openTotalReserve, setTotalReserve] = useState({
    TotalReserves: false,
    TotalGowns: false,
    NumbersOfUsers: false,
    HavePenaltys: false,
    Notifs: false,
    PaymentMethods:false,
    ReservesTodays:false,
    Piechar:false
  });

 

 const generatePDF = () => {
  // Initialize PDF document
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

  // Add header with background
  doc.setFillColor(51, 122, 183); // Professional blue color
  doc.rect(0, 0, pageWidth, 15, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255); // White text
  doc.setFontSize(16);
  addCenteredText('Gown Rental System', 10);
  
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

  // Summary Section with styled box
  yPosition += 15;
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Summary Overview', 10, yPosition);
  
  // Add decorative line
  yPosition += 3;
  doc.setDrawColor(51, 122, 183);
  doc.setLineWidth(0.5);
  doc.line(10, yPosition, pageWidth - 10, yPosition);

  // Summary data in styled box
  yPosition += 10;
  doc.setFillColor(240, 240, 240);
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(10, yPosition, pageWidth - 20, 30, 1, 1, 'FD');
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  const summaryData = [
    `Total Gowns Rented: ${DashInfo.data3.totalReservations}`,
    `Available Gowns: ${DashInfo.data1.SumAll.totalQuantity}`,
    `Number of Users: ${DashInfo.data4.totalUser}`
  ];

  summaryData.forEach((item, index) => {
    doc.text(item, 15, yPosition + 8 + (index * 8));
  });

  // Monthly Statistics
  yPosition += 45;
  checkPageBreak(40);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Monthly Statistics', 10, yPosition);
  
  // Add decorative line
  yPosition += 3;
  doc.setDrawColor(51, 122, 183);
  doc.line(10, yPosition, pageWidth - 10, yPosition);
  
  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  
  // Monthly stats in styled box
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(10, yPosition, pageWidth - 20, 35, 1, 1, 'FD');
  
  DashInfo.data7.forEach(pro => {
    const datnow = new Date();
    const monthName = datnow.toLocaleString('default', { month: 'long' });
    if(pro.Date === monthName) {
      doc.text(`Total Reservations (${monthName}): ${pro.total_count}`, 15, yPosition + 8);
      yPosition += 8;
    }
  });

  // Financial Information
  doc.text(`Total Canceled Reservations: ${DashInfo.data6.totalCancelled}`, 15, yPosition + 8);
  doc.text(`Current Month Revenue: ₱${DashInfo.data5.AllTotal.toLocaleString()}`, 15, yPosition + 16);
  doc.text(`All-Time Revenue: ₱${DashInfo.data5.AllTotal.toLocaleString()}`, 15, yPosition + 24);

  // Recent Reservations
  yPosition += 50;
  checkPageBreak(40);
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Recent Reservations', 10, yPosition);
  
  // Add decorative line
  yPosition += 3;
  doc.setDrawColor(51, 122, 183);
  doc.line(10, yPosition, pageWidth - 10, yPosition);

  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  
  // Group reservations by customer
  const groupReservationsByCustomer = (reservations) => {
    const grouped = {};
    reservations.forEach(reservation => {
      if (!grouped[reservation.name]) {
        grouped[reservation.name] = {
          customerName: reservation.name,
          items: [],
          startDate: reservation.StartDate,
          returnDate: reservation.ExpectedReturnDate,
          status: reservation.status
        };
      }
      grouped[reservation.name].items.push({
        productName: reservation.product_Name,
        quantity: reservation.quantity
      });
    });
    return Object.values(grouped);
  };

  const groupedReservations = groupReservationsByCustomer(DashInfo.data9.reservations);

  groupedReservations.forEach((customer) => {
    checkPageBreak(45);
    
    // Create a box for each customer's reservations
    doc.setFillColor(240, 240, 240);
    doc.setDrawColor(200, 200, 200);
    doc.roundedRect(10, yPosition, pageWidth - 20, 25 + (customer.items.length * 8), 1, 1, 'FD');
    
    // Format dates
    const startDate = new Date(customer.startDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const returnDate = new Date(customer.returnDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Customer name
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text(`${customer.customerName}`, 15, yPosition + 8);
    
    // Dates and status
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`${startDate} - ${returnDate}`, 15, yPosition + 16);
    
    // Status with color-coding - FIXED VERSION
    if (customer.status === 'Approved') {
        doc.setTextColor(0, 128, 0);  // Green for approved
    } else {
        doc.setTextColor(0, 0, 0);    // Black for other statuses
    }
    doc.text(`Status: ${customer.status}`, pageWidth - 85, yPosition + 8);
    doc.setTextColor(0, 0, 0); // Reset to black
    
    // List all items
    doc.setFont(undefined, 'normal');
    customer.items.forEach((item, index) => {
      doc.text(`• ${item.productName} (Qty: ${item.quantity})`, 20, yPosition + 24 + (index * 8));
    });
    
    yPosition += 30 + (customer.items.length * 8);
});
  // Canceled Reservations
  checkPageBreak(40);
  yPosition += 10;
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Canceled Reservations', 10, yPosition);
  
  // Add decorative line
  yPosition += 3;
  doc.setDrawColor(51, 122, 183);
  doc.line(10, yPosition, pageWidth - 10, yPosition);

  yPosition += 10;
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  
  DashInfo.data6.cancelledDetails.forEach((cancel) => {
    checkPageBreak(15);
    const cancelText = `• ${cancel.Name} - ₱${cancel.Price.toLocaleString()} (${new Date(cancel.start_Date).toLocaleDateString()})`;
    doc.text(cancelText, 15, yPosition);
    yPosition += 8;
  });

  // Footer for all pages
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Footer background
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 280, pageWidth, 17, 'F');
    
    // Footer content
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Gown Rental Management System', 10, 290);
    addCenteredText(`Page ${i} of ${totalPages}`, 290);
  }

  doc.save('Gown_Rental_Report.pdf');
};

 
  const cardData = [

    {
      title: "Todays Rented",
      value:  TodaysRented.totalReservations,
      icon: <IoIosToday  size={24}/>,
      gradient: "from-orange-500 to-yellow-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, ReservesTodays: true }))
    },

    {
      title: "Rented Gowns",
      value: RentedGowns.totalReservations,
      icon: <VscCalendar size={24} />,
      gradient: "from-blue-500 to-blue-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, TotalReserves: true }))
    },

    {
      title: "Available Gowns",
      value: DashInfo.data1.SumAll.totalQuantity,
      icon: <VscJersey size={24} />,
      gradient: "from-purple-500 to-purple-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, TotalGowns: true }))
    },

    {
      title: "Number of Users",
      value: DashInfo.data4.totalUser,
      icon: <VscAccount size={24} />,
      gradient: "from-cyan-500 to-cyan-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, NumbersOfUsers: true }))
    },
    {
      title: "Cancelled Reserved",
      value: cancels.totalCancelled,
      icon: <VscOutput size={24} />,
      gradient: "from-pink-500 to-pink-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, HavePenaltys: true }))
    },

    {
      title: "Gown Trending",
      value: null,
      icon: <IoIosPie size={24}/>,
      gradient: "from-red-500 to-pink-600",
      onClick: () =>  setTotalReserve(prev => ({ ...prev, Piechar: true }))
    },

  ];



  return (
    <>
    
    {openTotalReserve.Piechar && <PieCharts setTotalReserve={setTotalReserve} pieChart={pieChart}/>}

      {openTotalReserve.ReservesTodays &&  <ReservesToday setTotalReserve={setTotalReserve} DashInfo={TodaysRented.reservations}/>}
    
      {openTotalReserve.Notifs && <Notif setTotalReserve={setTotalReserve} setNotifications={setNotifications}/>}
    
      {openTotalReserve.TotalReserves && <TotalReservations setTotalReserve={setTotalReserve} DashInfo={RentedGowns.reservations} />}
   
      {openTotalReserve.TotalGowns && <TotalGowns setTotalReserve={setTotalReserve} DashInfo={DashInfo.data1.INFO} />}
      
      {openTotalReserve.NumbersOfUsers && <NumbersOfUsers setTotalReserve={setTotalReserve} DashInfo={DashInfo.data4.users} />}

      {openTotalReserve.HavePenaltys && <HavePenaltys setTotalReserve={setTotalReserve} DashInfo={cancels} />}
 

      <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <header className="h-16 border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm px-6 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Dashboard Overview
          </h1>
          <div className="relative">
            <button 
              onClick={() => setTotalReserve(prev => ({...prev, Notifs: true}))}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200"
            >
             
               {
                notifications?(
                  <>
                    <VscBellDot className="w-5 h-5 text-indigo-500" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                  </>
                ):(
                  <>
              <VscBell size={22} className="text-gray-300" />
                  </>
                )
               }
            </button>
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <div
                key={index}
                onClick={card.onClick}
                className={`bg-gradient-to-br ${card.gradient} rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 cursor-pointer backdrop-blur-sm bg-opacity-20 border border-gray-700/30`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    {card.icon}
                  </div>
                  <div className="text-white">
                    <p className="text-sm opacity-90">{card.title}</p>
                    <p className="text-2xl font-semibold">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-700/30">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-100">Reservations Over Time</h2>
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All Months">All Months</option>
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f3f4f6'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="reservations"
                    stroke="#60a5fa"
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button
            onClick={generatePDF}
            className="
              px-5 py-3 rounded-lg
              bg-gradient-to-r from-blue-500 to-purple-500
              text-white font-medium
              hover:shadow-lg hover:shadow-blue-500/25
              hover:scale-[1.02]
              transition-all duration-200
              flex items-center justify-center gap-2
              w-full
              border border-gray-700/30
            "
          >
            Download PDF Report
          </button>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

export const Dash = async() => {
  try {
    const endpoints = [
      'numberOfItems',
      'totalUsers',
      'AllTrends',
    ];

    const responses = await Promise.all(
      endpoints.map(endpoint => 
        fetch(`http://localhost:8000/${endpoint}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )
    );

    const [
      dataTotalItems,
      NumbersOfUsers,
      TrendsAll,
    ] = await Promise.all(responses.map(response => response.json()));

    return {
      data1: dataTotalItems,
      data4: NumbersOfUsers,
      data7: TrendsAll,
    };
  } catch (error) {
    console.log(error);
    return null
  }
};