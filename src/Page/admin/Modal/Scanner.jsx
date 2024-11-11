import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { FaTimesCircle } from 'react-icons/fa';
import { RiQrScanLine } from 'react-icons/ri';
import { IoMdClose } from 'react-icons/io';
import ReturnITEMS from '../../../hooks/AdminHooks/UserReturned.js';

const Scanner = ({ setOpenScanner,  toReturn , setToReturn, ItemID }) => {
 
  const { pushAutoMatically } = ReturnITEMS( toReturn , setToReturn);

  const qrCodeRegionId = "qr-reader";
  const [qrCodeData, setQrCodeData] = useState(null);
  const [parsedData, setParsedData] = useState({});
  const [error, setError] = useState(null);

  const onScanSuccess = (qrCodeMessage) => {
    try {

      const data = JSON.parse(qrCodeMessage); 

      const dateOfNow = new Date();
      const startDate = new Date(data.start_date);
      const returnDate = new Date(data.return_date);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const startFormatted = startDate.toLocaleDateString('en-US', options);
      const returnFormatted = returnDate.toLocaleDateString('en-US', options);
      
      const isPastReturnDate = dateOfNow > returnDate;
      const daysNotReturned = Math.floor((dateOfNow - returnDate) / (1000 * 60 * 60 * 24));
      const penaltyPerDay = 500;
      const totalPenalty = isPastReturnDate ? daysNotReturned * penaltyPerDay : 0;

          //!MATIC SCAN
  
      //!DISPLAYED SCAN
      setParsedData({
        product_Name: data.product_name,
        quantity: data.quantity,
        status: data.status,
        start_date: startFormatted,
        return_date: returnFormatted,
        picture: data.picture,
        pickup_status: data.pickup_status,
        payment_method: data.payment_method,
        penalty: totalPenalty,
        user_id: data.user_id,
        returnID:data.returnID
      });

      const FindID =  data.returnID === ItemID.current;
      
      if (!FindID) {
        console.error("ID not found:", data.returnID);

        setError(`ID ${data.returnID} this is not item you reserve`);
      } else {

     //!Pushed all data in history then scanner modal closed automatic HAHAHAHA
        pushAutoMatically({
          product_Name: data.product_name,
          picture: data.picture,
          start_Date: startFormatted,
          return_Date: returnFormatted,
          status: "THIS IS ITEM IS BACK",
          user_ID: data.user_id,
          penalty: totalPenalty,
          returnID: data.returnID,
          quantity:data.quantity
        });
        setOpenScanner(false);
        //!OPTIONAL THIS ONE BAGUHIN MO SYA
        //window.location.reload();
      }

    } catch (err) {
      console.error("Error parsing QR Code JSON:", err);
      setError("Invalid QR Code data.");
    }
  };

  const onScanFailure = (error) => {
    console.warn(`QR Code scan failed: ${error}`);
    setError("Failed to scan QR code. Please try again.");
  };

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrCodeRegionId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. Error:", error);
      });
    };
  }, []);



  return (
    <div className="font-sans">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex justify-center py-3">
        <div className="mt-16 relative h-[35rem] overflow-auto w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl shadow-2xl border border-gray-700/50">
          <div className="relative p-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-3">
              <RiQrScanLine className="text-blue-400" />
              QR Scanner
            </h2>
            <button
              onClick={() => setOpenScanner(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-700/50 transition-colors"
            >
              <IoMdClose className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="relative">
              <div
                id={qrCodeRegionId}
                className="overflow-hidden rounded-2xl border-2 border-blue-500/30 bg-gray-800/50"
                style={{ width: "90%", maxWidth: "300px", margin: "auto" }}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl">
                <FaTimesCircle />
                <p>{error}</p>
              </div>
            )}

            {
            
            qrCodeData && 
            (
              <div className="space-y-4 bg-gray-800/50 p-4 rounded-xl h-[20rem] overflow-auto">
                <h3 className="text-lg font-semibold text-gray-300">Scanned Data:</h3>
                <div className="bg-gray-700/50 p-4 rounded-lg break-all">
                  <p><strong>Product Name:</strong> {parsedData.product_Name}</p>
                  <p><strong>Quantity:</strong> {parsedData.quantity}</p>
                  <p><strong>Status:</strong> {parsedData.status}</p>
                  <p><strong>Start Date:</strong> {parsedData.start_date}</p>
                  <p><strong>Return Date:</strong> {parsedData.return_date}</p>
                  <p><strong>Pickup Status:</strong> {parsedData.pickup_status}</p>
                  <p><strong>Payment Method:</strong> {parsedData.payment_method}</p>
                  <p><strong>Penalty: {parsedData.penalty}</strong></p>
                  <p><strong>User ID:</strong> {parsedData.user_id}</p>
               
                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
