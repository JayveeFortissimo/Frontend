import { useLoaderData } from 'react-router-dom';
import { VscCalendar, VscJersey, VscAccount, VscOutput, VscBell, VscBellDot } from "react-icons/vsc";
import { MdOutlinePayments, MdOutlinePayment } from "react-icons/md";
import { FaPesoSign, FaMoneyBill1Wave } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import Notif from './Modal/Notif';
import TotalReservations from './Reports/TotalReservations';
import NumbersOfUsers from './Reports/NumberofUsers';
import RentalRevenue from './Reports/RentalRevenue';
import TotalGowns from './Reports/TotalGowns';
import SecurityDeposit from './Reports/SecurityDeposit';
import HavePenaltys from './Reports/Cacelled';
import PaymentStatus from './Reports/PaymentStatus';
import ReservesToday from './Reports/ReservesToday';
import io from 'socket.io-client';
import jsPDF from 'jspdf';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IoIosToday } from "react-icons/io";
import AdminProfile from '../../hooks/AdminHooks/AdminProfile';

const Dashboard = () => {
  const DashInfo = useLoaderData();
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('All Months');
   //ADMIN PROFILE
   const {profile} = AdminProfile();

    const [rentalE,setRentalE] = useState(DashInfo.data5);
    const [Cancelled,setCancelled] = useState(DashInfo.data6);
    const [securityDeposit, setSecurityDeposit] = useState(DashInfo.data2);
    const [reserveToday,setReserveToday] = useState();
 
    console.log(DashInfo)

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
    SecurityDeposit: false,
    NumbersOfUsers: false,
    RentalRevenue: false,
    HavePenaltys: false,
    Notifs: false,
    PaymentStatus:false,
    PaymentMethods:false,
    ReservesTodays:false
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    
    // Helper function for centering text
    const centerText = (text, y) => {
      const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
      const x = (pageWidth - textWidth) / 2;
      doc.text(text, x, y);
    };
  
    // Helper function for current date
    const getCurrentDate = () => {
      const now = new Date();
      return now.toLocaleDateString('en-US', { 
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    };
  
    // Header
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    centerText('Gown Rental System', 20);
  
    doc.setFontSize(16);
    centerText('General Reservation Report', 30);
  
    // Date and Time
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Date Generated: ${getCurrentDate()}`, 15, 40);
    doc.text(`Generate By: ${profile[0].name}`, 15, 45);
    
    // Divider
    doc.setLineWidth(0.5);
    doc.line(15, 49, pageWidth - 15, 49);
  
    // Summary Section
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Summary Overview', 15, 60);
  
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    const summaryData = [
      `Total Gowns Rented: ${DashInfo.data3.totalReservations}`,
      `Available Gowns: ${DashInfo.data1.SumAll.totalQuantity}`,
      `Number of Users: ${DashInfo.data4.totalUser}`
    ];
  
    let yPos = 70;
    summaryData.forEach(item => {
      doc.text(item, 20, yPos);
      yPos += 8;
    });
  
    // Monthly Statistics
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Monthly Statistics', 15, yPos + 10);
    
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    yPos += 20;
  
    DashInfo.data7.forEach(pro => {
      const datnow = new Date();
      const monthName = datnow.toLocaleString('default', { month: 'long' });
      if(pro.Date === monthName) {
        doc.text(`Total Reservations (${monthName}): ${pro.total_count}`, 20, yPos);
        yPos += 8;
      }
    });
  
    // Financial Information
    doc.text(`Total Canceled Reservations: ${DashInfo.data6.totalCancelled}`, 20, yPos);
    yPos += 8;
    doc.text(`Current Month Revenue: ₱${DashInfo.data5.AllTotal.toLocaleString()}`, 20, yPos);
    yPos += 8;
    doc.text(`All-Time Revenue: ₱${DashInfo.data5.AllTotal.toLocaleString()}`, 20, yPos);
    
    // Recent Reservations
    yPos += 20;
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Recent Reservations', 15, yPos);
  
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    yPos += 10;
    DashInfo.data2.reservations.forEach((reservation) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`• ${reservation.Name}`, 20, yPos);
      yPos += 8;
    });
  
    // Canceled Reservations
    if (yPos > 220) {
      doc.addPage();
      yPos = 20;
    }
    
    yPos += 10;
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Canceled Reservations', 15, yPos);
  
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    yPos += 10;
    DashInfo.data6.cancelledDetails.forEach((cancel) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      const cancelText = `• ${cancel.Name} - ₱${cancel.Price.toLocaleString()} (${new Date(cancel.start_Date).toLocaleDateString()})`;
      doc.text(cancelText, 20, yPos);
      yPos += 8;
    });
  
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Footer line
      doc.setLineWidth(0.5);
      doc.line(15, 280, pageWidth - 15, 280);
  
      // Company name
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Gown Rental Management System', 15, 287);
  
      // Page numbers
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, 287);
    }
  
    doc.save('Gown_Rental_Report.pdf');
  };


  const cardData = [

    {
      title: "Todays Rented",
      value:  DashInfo.data9.totalReservations,
      icon: <IoIosToday  size={24}/>,
      gradient: "from-red-500 to-blue-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, ReservesTodays: true }))
    },

    {
      title: "Rented Gowns",
      value: DashInfo.data3.totalReservations,
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
      title: "Security Deposit",
      value: `₱ ${securityDeposit.TotalIncomes}`,
      icon: <FaMoneyBill1Wave size={24} />,
      gradient: "from-emerald-500 to-emerald-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, SecurityDeposit: true }))
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
      value: DashInfo.data6.totalCancelled,
      icon: <VscOutput size={24} />,
      gradient: "from-pink-500 to-pink-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, HavePenaltys: true }))
    },
    {
      title: "Rental Income",
      value: `₱ ${rentalE.AllTotal}`,
      icon: <FaPesoSign size={24} />,
      gradient: "from-amber-500 to-amber-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, RentalRevenue: true }))
    },

    {
      title: "Payment Status",
      value: `See Here`,
      icon: <MdOutlinePayment size={24} />,
      gradient: "bg-yellow-600",
      onClick: () => setTotalReserve(prev => ({ ...prev, PaymentStatus: true }))
    },

  ];

  const [notifications, setNotifications] = useState(false);

  useEffect(() =>{
    const socket = io('https://backend-production-024f.up.railway.app');

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('bellsDash', () => {
         setNotifications(true);
    });

    return () => {
      socket.disconnect();
    };

  },[]);


  return (
    <>
          {openTotalReserve.ReservesTodays &&  <ReservesToday setTotalReserve={setTotalReserve} DashInfo={DashInfo.data9.reservations}/>}
      {openTotalReserve.PaymentStatus && <PaymentStatus setTotalReserve={setTotalReserve} DashInfo ={DashInfo.data8} />}
      {openTotalReserve.Notifs && <Notif setTotalReserve={setTotalReserve} setNotifications={setNotifications}/>}
      {openTotalReserve.TotalReserves && <TotalReservations setTotalReserve={setTotalReserve} DashInfo={DashInfo.data3.reservations} />}
      {openTotalReserve.TotalGowns && <TotalGowns setTotalReserve={setTotalReserve} DashInfo={DashInfo.data1.INFO} />}
      {openTotalReserve.SecurityDeposit && <SecurityDeposit 
      setTotalReserve={setTotalReserve}
       DashInfo={securityDeposit.reservations} 
       setSecurityDeposit={setSecurityDeposit}
       />}
      {openTotalReserve.NumbersOfUsers && <NumbersOfUsers setTotalReserve={setTotalReserve} DashInfo={DashInfo.data4.users} />}
      {openTotalReserve.HavePenaltys && <HavePenaltys setTotalReserve={setTotalReserve} DashInfo={Cancelled} setCancelled={setCancelled} setRentalE={setRentalE} />}
      {openTotalReserve.RentalRevenue && <RentalRevenue setTotalReserve={setTotalReserve} DashInfo={DashInfo.data5.AllResult} />}

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
      'numbersOfPending',
      'totalReserves',
      'totalUsers',
      'totalIncome',
      'AllCancelled',
      'AllTrends',
      'PaymentStatus',
      'Today'
    ];

    const responses = await Promise.all(
      endpoints.map(endpoint => 
        fetch(`https://backend-production-024f.up.railway.app/${endpoint}`, {
          method: 'get',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      )
    );

    const [
      dataTotalItems,
      dataPending,
      dataReserves,
      NumbersOfUsers,
      RentalIncome,
      AllCacelled,
      TrendsAll,
      PaymentStatus,
      Today
    ] = await Promise.all(responses.map(response => response.json()));

    return {
      data1: dataTotalItems,
      data2: dataPending,
      data3: dataReserves,
      data4: NumbersOfUsers,
      data5: RentalIncome,
      data6: AllCacelled,
      data7: TrendsAll,
      data8: PaymentStatus,
      data9: Today
    };
  } catch (error) {
    console.log(error);
  }
};