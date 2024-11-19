import { useState, useEffect, useRef } from "react";
import toast from 'react-hot-toast';
import HistoryOfUser from "../../../hooks/AdminHooks/History.js";
import { useLoaderData } from 'react-router-dom';
import PickUp from "./PickUp.jsx";
import io from 'socket.io-client';
import QRCode from 'react-qr-code';
import { toCanvas } from 'html-to-image';

import { 
  PiCalendarBlank, 
  PiClock, 
  PiPackage,
  PiShoppingBag,
  PiWarning,
  PiCheckCircle,
  PiHandGrabbing,
  PiDownload
} from "react-icons/pi";

const History = () => {
  const userID = useLoaderData();
  const qrRef = useRef(null);
  
  const {allDatas, setAllDatas, deletedItems } = HistoryOfUser(userID.data1[0].id);
  const [pickUp, setPickUp] = useState(false);

  const [QrValue, setQrValue] = useState({});

  const [productINFO, setProductInfo] = useState({
    product_Name: "",
    subtotal: "",
    startDate: "",
    endDate: "",
    status: "",
    Pickuped: "",
    customerName: "",
    approvedID: 0,
    quantity: "",
    size: "",
    code:"",
    subTotal:0
   // subtotal:0
  });

   //!For Specific data
   useEffect(() => {
    if (allDatas.length > 0) {
      const pro = allDatas[0];  // Use the first item in `allDatas` as an example
      const data = {
        product_name: pro.product_Name,
        quantity: pro.quantity,
        status: pro.status,
        picture: pro.picture,
        start_date: new Date(pro.start_Date).toLocaleDateString(),
        return_date: new Date(pro.return_Date).toLocaleDateString(),
        pickup_status: pro.Pickuped,
        penalty: 0,
        user_id: pro.user_ID,
        price: pro.price,
        returnID: pro.id,
        code:pro.code
      };
  
      setQrValue(data); 
    }
  }, [allDatas]);


  useEffect(() => {
    const socket = io('http://localhost:8000');

    socket.on('pickup-status-updated', (data) => {
      setAllDatas((prevDatas) => prevDatas.map((item) => {
        if (item.id === data.prodID) {
          return { ...item, Pickuped: data.Pickuped };
        }
        return item;
      }));
      toast.success(`Pickup status for product ID ${data.prodID} has been updated to ${data.Pickuped}`);
    });

    return () => {
      socket.off('pickup-status-updated');
    };
  }, [setAllDatas]); 



  const handleGracePeriodCheck = (startDate, Pickuped) => {
    const now = new Date();
    const gracePeriodEnd = new Date(startDate);
    gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 1);

    if (now > gracePeriodEnd && Pickuped === "THIS ITEM NOT PICKED UP YET") {
      return "No Show";
    }
    return Pickuped;
  };


  const StatusBadge = ({ status, id }) => {
    let Icon = PiClock;
    let colorClasses = "bg-gray-500/20 text-gray-300 border border-gray-500/30";

    if (status === "ITEM PICKED UP ALREADY") {
      Icon = PiCheckCircle;
      colorClasses = "bg-green-500/20 text-green-400 border border-green-500/30";
    } else if (status === "No Show") {
      Icon = PiWarning;
      colorClasses = "bg-red-500/20 text-red-400 border border-red-500/30";
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11111DELETE
      setTimeout(() => {
        deletedItems(id);
        window.location.reload();
      }, 1000);
    }

    return (
      <span className={`flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${colorClasses} backdrop-blur-sm`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };


  const handleDownloadQRCode = async (e) => {
    e.preventDefault();

    if (qrRef.current === null) return;

    try {
        // Create a temporary container
        const container = document.createElement('div');
        container.style.background = 'white';
        container.style.padding = '20px';
        container.style.width = 'fit-content';
        
        // Create a temporary element for the QR code
        const qrContainer = document.createElement('div');
        container.appendChild(qrContainer);
        document.body.appendChild(container);

        // Clone the SVG
        const svg = qrRef.current.querySelector('svg');
        if (svg) {
            const svgClone = svg.cloneNode(true);
            qrContainer.appendChild(svgClone);

            // Convert to canvas with options to suppress font errors
            const canvas = await toCanvas(container, {
                skipFonts: true,
                filter: (node) => {
                    // Properly check for node type and className
                    if (node.tagName === 'LINK') return false;
                    if (node.className && typeof node.className === 'string' && 
                        node.className.includes('google')) return false;
                    return true;
                },
                backgroundColor: '#ffffff'
            });
            
            // Clean up the temporary elements
            document.body.removeChild(container);

            // Convert canvas to blob and download
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'qrcode.png';
                    link.click();
                    // Clean up
                    URL.revokeObjectURL(url);
                }
            }, 'image/png', 1.0);
        }

    } catch (err) {
        console.error('Failed to download QR code:', err);
    }
};
  
  


  //SEE IF Zero array Length
  if (allDatas.length === 0) {
    return (
      <div className="mt-6 p-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-700/50">
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <PiShoppingBag className="w-16 h-16 mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-200">No History Found</h3>
          <p className="text-sm">User has not reserved or purchased any items</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {pickUp && (
        <PickUp
          setPickUp={setPickUp}
          productINFO={productINFO}
          setProductInfo={setProductInfo}
        />
      )}

      <div className="mt-6 h-[80vh] overflow-auto px-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="space-y-6">
          {allDatas.map(pro => {
            const dateOfNow = new Date();
            const startDate = new Date(pro.start_Date);
            const returnDate = new Date(pro.return_Date);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const Starto = startDate.toLocaleDateString('en-US', options);
            const returns = returnDate.toLocaleDateString('en-US', options);
            const istodayPickuped = dateOfNow.toDateString() === returnDate.toDateString();
            const PickupedStatus = handleGracePeriodCheck(startDate, pro.Pickuped);

            return (
              <div 
                key={pro.id}
                className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] border border-gray-700/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="flex gap-6 flex-col sm:flex-row">
                  <div className="flex-shrink-0">
                    <img
                      src={`http://localhost:8000/uploads/${pro.picture}`}
                      alt={pro.product_Name}
                      className="w-32 h-40 object-cover rounded-lg border border-gray-700/50 shadow-lg"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-200">
                        {pro.product_Name}
                      </h3>
                      <StatusBadge status={PickupedStatus} id={pro.id} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-400">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                          <PiCalendarBlank className="w-4 h-4 text-blue-400" />
                          <span className={istodayPickuped ? "text-green-400 font-medium" : ""}>
                            Start: {Starto}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                          <PiCalendarBlank className="w-4 h-4 text-blue-400" />
                          <span>Return: {returns}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                          <PiPackage className="w-4 h-4 text-blue-400" />
                          <span>Size: {pro.size}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="font-medium text-gray-200 bg-gray-800/50 p-2 rounded-lg border border-gray-700/50">
                          Quantity: {pro.quantity}
                        </p>
                       
                        
                        <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        

                        <h3>QR Code:</h3>
                            <div ref={qrRef} className="bg-white p-4">
                                <QRCode 
                                    value={JSON.stringify(QrValue)} 
                                    size={150}
                                    style={{ background: 'white' }}
                                />
                            </div>
                          
                          <div className="flex flex-col gap-3">
                            <button
                              onClick={(e) => handleDownloadQRCode(e)}
                              className="inline-flex justify-center items-center px-4 py-2 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-lg hover:bg-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/50 transition-all duration-300 border border-blue-500/30 backdrop-blur-sm"
                            >
                              <PiDownload className="w-4 h-4 mr-2" />
                              Download QR Code
                            </button>



                            <button
                              onClick={() => {
                                setProductInfo({
                                  ...pro,
                                  product_Name: pro.product_Name,
                                  subtotal: pro.subtotal,
                                  startDate: Starto,
                                  endDate: returns,
                                  status: pro.status,
                                  Pickuped: PickupedStatus,
                                  customerName: userID.data1[0].name,
                                  approvedID: pro.id,
                                  quantity: pro.quantity,
                                  size: pro.size,
                                  code:pro.code,
                                  subTotal:pro.subTotal
                                });
                                setPickUp(true);
                              }}
                              className="inline-flex justify-center items-center px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded-lg hover:bg-green-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500/50 transition-all duration-300 border border-green-500/30 backdrop-blur-sm"
                            >
                              <PiHandGrabbing className="w-4 h-4 mr-2" />
                              Manage Pick Up
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default History;