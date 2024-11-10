import { useState, useEffect, useRef } from 'react';
import { VscChromeClose } from "react-icons/vsc";
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import io  from 'socket.io-client';

const HavePenaltys = ({ setTotalReserve, DashInfo, setCancelled, setRentalE}) => {
  const [clickedItems, setClickedItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("pending");

  const Reason = useRef('');

useEffect(() => {
  const socket = io('https://backend-production-024f.up.railway.app');

  socket.on('statusUpdated', (data) => {
      // Handle the real-time data (status update) from the backend
      console.log("Received status update:", data);
      toast.success(`Status for item ${data.id} updated to ${data.status}`);
      
      // Optionally, update `setCancelled` or other relevant state
      setCancelled(prevCancelled => ({
        ...prevCancelled,
        cancelledDetails: prevCancelled.cancelledDetails.map(item => 
            item.id === data.id ? { ...item, status: data.status } : item
        )

    }));

      if(Reason.current === "ADMIN DECLINE"){
        console.log("HAHAHHA")
      }else{
        setRentalE(prevCancelled => ({
          ...prevCancelled,
          AllTotal: prevCancelled.AllTotal - data.TotalEdit  
      }))
      }
   

  });

  return () => {
      socket.off('statusUpdated');
  };
}, [filterStatus]);


  const handleSubmitEdit = async (e, id, code, sub_Total, Reason) => {
    e.preventDefault();
     
    const TotalEdit =  Reason === "ADMIN DECLINE" ?  sub_Total :(sub_Total * 0.50);

    setClickedItems(prev => [...prev, id]);
    
    try {
      const response = await fetch(`https://backend-production-024f.up.railway.app/editStatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: 'APPROVED BY ADMIN',
          code: code,
          TotalEdit: TotalEdit
        })
      });
      if (!response.ok) console.log("Cannot Update");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredDashInfo = filterStatus === "pending"
    ? DashInfo.cancelledDetails.filter(item => item.status === "WAITING FOR REFUND")
    : DashInfo.cancelledDetails.filter(item => item.status === "APPROVED BY ADMIN");


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
    
      // Separator
      yPosition += 5;
      doc.setFontSize(12);
      doc.text('---------------------------------', 10, yPosition);
      
      // Separate DashInfo by status
      const approvedItems = DashInfo.cancelledDetails.filter(item => item.status === "APPROVED BY ADMIN");
      const waitingForRefundItems = DashInfo.cancelledDetails.filter(item => item.status === "WAITING FOR REFUND");
    
      // Print Approved Items
      if (approvedItems.length > 0) {
        yPosition += 10;
        doc.setFontSize(14);
        doc.text('Approved by Admin:', 10, yPosition);
    
        approvedItems.forEach(item => {
          yPosition += 10;
          doc.setFontSize(12);
          doc.text(`Name: ${item.Name}`, 10, yPosition);
          yPosition += 5;
          doc.text(`Price: ${item.Price}`, 10, yPosition);
          doc.text(`Status: ${item.status}`, 100, yPosition);
          yPosition += 5;
          doc.text(`Code: ${item.code}`, 10, yPosition);
          yPosition += 5;
          doc.text(`Subtotal: ${item.sub_Total}`, 10, yPosition);
          yPosition += 5;
          doc.text('---------------------------------', 10, yPosition);
        });
      }
    
      // Print Waiting for Refund Items
      if (waitingForRefundItems.length > 0) {
        yPosition += 10;
        doc.setFontSize(14);
        doc.text('Waiting for Refund:', 10, yPosition);
    
        waitingForRefundItems.forEach(item => {
          yPosition += 10;
          doc.setFontSize(12);
          doc.text(`Name: ${item.Name}`, 10, yPosition);
          yPosition += 5;
          doc.text(`Price: ${item.Price}`, 10, yPosition);
          doc.text(`Status: ${item.status}`, 100, yPosition);
          yPosition += 5;
          doc.text(`Code: ${item.code}`, 10, yPosition);
          yPosition += 5;
          doc.text(`Subtotal: ${item.sub_Total}`, 10, yPosition);
          yPosition += 5;
          doc.text('---------------------------------', 10, yPosition);
        });
      }
    
      // End of report
      yPosition += 10;
      doc.text('End of Report', 10, yPosition);
    
      doc.save('reservation-report.pdf');
    };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-slate-900 bg-opacity-80" />
      
      <div className="relative w-full max-w-4xl mx-4 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Cancelled Items</h2>
            <p className="text-sm text-gray-400 mt-1">
              {filteredDashInfo?.length || 0} total items
            </p>
          </div>
          <button onClick={() => setTotalReserve(prev => ({ ...prev, HavePenaltys: false }))} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
            <VscChromeClose className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div>
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
          <div className="mr-4 flex gap-2">
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "pending"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-slate-700 text-gray-400 hover:bg-slate-600"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === "approved"
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-slate-700 text-gray-400 hover:bg-slate-600"
              }`}
            >
              Approved
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[32rem] p-6">
          {filteredDashInfo && filteredDashInfo.length > 0 ? (
            filteredDashInfo.map((item, index) => (
              <div key={index} className="mb-4 bg-slate-800 rounded-2xl border border-gray-700 p-4 hover:shadow-lg transition-all">
      
      <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.Name}</h3>
                    <p className="text-sm text-white">Order ID: ORD-2024-{item.id}</p>
                    <p className="text-sm  text-white">Customer Name: {item.name}</p>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Items</p>
                        <p className="font-medium text-white">{item.quantity} × Size {item.size}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 ">Dates</p>
                        <p className="font-medium text-white">
                          {new Date(item.start_Date).toLocaleDateString()} - {new Date(item.return_Date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-gray-500 text-sm">Reason</p>
                      <p className="text-sm mt-1 text-white">{item.Reason}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="mb-2">
                      <p className="text-sm text-gray-400">Original Amount</p>
                      <p className="text-lg font-bold text-white">₱{item.sub_Total.toFixed(2)}</p>
                    </div>

                 
                    <div>
                      <p className="text-sm text-gray-400">{item.Reason === "ADMIN DECLINE"? "" : "Refund (50%)"}</p>
                      <p className="text-lg font-bold text-green-500">
                       {item.Reason === "ADMIN DECLINE"? "":` ₱${(item.sub_Total * 0.50).toFixed(2)}`}
                      </p>
                    </div>
                   

                    {item.status !== "APPROVED BY ADMIN" && !clickedItems.includes(item.id) && (
                      <button
                        onClick={(e) => {
                          handleSubmitEdit(e, item.id, item.code, item.sub_Total, item.Reason);
                          Reason.current = item.Reason
                        }}
                        className="mt-4 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Approve Refund
                      </button>
                    )}

                    <div className="mt-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === "APPROVED BY ADMIN" || clickedItems.includes(item.id)
                            ? "bg-green-100 text-green-500"
                            : "bg-orange-100 text-orange-500"
                        }`}
                      >
                        {item.status === "APPROVED BY ADMIN"
                          ? "Approved"
                          : clickedItems.includes(item.id)
                          ? "Processing"
                          : "Pending"}
                      </span>
                    </div>
</div>
</div>

              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No cancelled items found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HavePenaltys;