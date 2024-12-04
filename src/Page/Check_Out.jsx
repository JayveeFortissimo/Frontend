import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiLocationMarker } from 'react-icons/hi';
import { BsCalendarDate, BsBox } from 'react-icons/bs';
import ChekDetails from '../hooks/CheckOutDetails.js';
import toCart from '../hooks/Tocart_check.js';
import RefferalPoints from '../hooks/Referalpoints.js';
import Percent5 from '../Components/Modal/Percent5.jsx';
import OTPSecurity from '../Components/Modal/OTPSecurity.jsx';
import Fitting from '../Components/Fitting.jsx';
import toast from 'react-hot-toast';
import QRGenerator from '../Components/Modal/QRGenerator.jsx';


const Check_Out = () => {
    const redirect = useNavigate();
    const { allOrders, total } = toCart();
    const { allDatas, CheckOUtss } = ChekDetails(allOrders);
    const { allPoints } = RefferalPoints();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    //Onuse is for Percent5 Modal
   // const [onUse,setOnuse] = useState(true);
   // const [isRadio, setRadio] = useState(false);
    //For Fitting
    const [openFitting, setOpenFitting] = useState(false);
    //Qrcode Modal
    const [FinalQR, setFinalQR] = useState(false);
   
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const displayDiscount = JSON.parse(localStorage.getItem("Discount"));

    const TotalsAll = displayDiscount ? (parseInt(total)  * 0.95): parseInt(total);
    const OriginalValue = parseInt(total);


   
     // Initialize state from localStorage
     const [isRadio, setRadio] = useState(() => {
        return localStorage.getItem("Discount") === "true";
    });

    // State for Percent5 Modal
    const [onUse, setOnuse] = useState(() => {
        // Only show modal if conditions are met and discount is not already applied
        console.log('Total:', TotalsAll);
        console.log('Referral Points:', allPoints.totalReferred);
        return TotalsAll >= 3000 && 
               allPoints.totalReferred >= 10 && 
               !localStorage.getItem("Discount");
    });

  //  isRadio? localStorage.setItem("Discount", true) :  localStorage.removeItem("Discount");
  
  //Reserve Button!
  const ConfirmationReserve = async(e) =>{
        e.preventDefault();
        setLoading(true);
        //!I have a probem here
        const email = allDatas[0].email || "No show";

        try{
            const response  = await fetch(`https://backend-production-d6a2.up.railway.app/ForgotPassword`,{
               method:'POST',
               headers:{
                   'Content-Type':'application/json'
               },
               body:JSON.stringify({email})
            })
           
            const data = await response.json();
           
             if(data.message === "EMAIL NOT EXIST") {
               toast.error("EMAIL NOT EXIST");
             }else{
              
                setTimeout(()=>{
                    toast.success("Check Your Email Now");
                    setLoading(false);
                    setConfirm(true);
                },2000);

             }
               }catch(error){
                   console.log(error);
               }
  }


  const handleDiscountToggle = () => {
    // Only allow if total is over 3000 and referral points are 10 or more
    if (TotalsAll >= 3000 && allPoints.totalReferred >= 10) {
        const newDiscountState = !isRadio;
        setRadio(newDiscountState);
        
        // Update localStorage
        if (newDiscountState) {
            localStorage.setItem("Discount", "true");
        } else {
            localStorage.removeItem("Discount");
        }
        
        // Close the Percent5 modal if reopening is not desired
        setOnuse(false);
    }
};


    return (
        <>
 
        {onUse && allPoints.totalReferred >= 10 && (
            <Percent5 
                setOnuse={setOnuse}  
                setRadio={setRadio}
            />
        )}

       { confirm && <OTPSecurity setConfirm={setConfirm} setOpenFitting={setOpenFitting} ConfirmationReserve={ConfirmationReserve}/>  }
     
       {openFitting && <Fitting setOpenFitting={setOpenFitting} setFinalQR={setFinalQR} />}

        {FinalQR && <QRGenerator allOrders = {allOrders} CheckOUtss={CheckOUtss} TotalsAll={TotalsAll} allDatas={allDatas}/>}
       
  

            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Confirmation Page</h1>
                        <p className="mt-2 text-sm text-gray-600">Complete your reservation at Cristobal Collection</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Customer Details & Payment */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Customer Details Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Customer Details</h2>
                                    {allDatas.map(pro => (
                                        <div key={pro.id} className="space-y-4">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        defaultValue={pro.email}
                                                        className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            defaultValue={pro.name}
                                                            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Contact
                                                        </label>
                                                        <input
                                                            type="tel"
                                                            defaultValue={pro.contact}
                                                            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        defaultValue={pro.address}
                                                        className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Methods Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-6">

                            <h3 className="font-semibold text-gray-900">Cristobal Collection</h3>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <HiLocationMarker className="w-4 h-4 mr-1" />
                                            Bagbaguin Santa Maria Bulacan
                                        </div>
         <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d679.1955379849777!2d120.95977901777923!3d14.815306132410914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ad85d98af4ef%3A0xc39409567392e609!2sSonia%E2%80%99s%20Carwash!5e1!3m2!1sen!2sph!4v1728389316190!5m2!1sen!2sph"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full mt-3 rounded"
            />

                            </div>

                           
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                                    <div className="space-y-4">
                                        {allOrders.map(pro => (
                                            <div key={pro.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                                <img
                                                    src={`https://backend-production-d6a2.up.railway.app/uploads/${pro.picture}`}
                                                    alt={pro.product_Name}
                                                    className="h-24 w-24 object-cover rounded-lg"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900">{pro.product_Name}</h3>
                                                    <p className="text-sm text-gray-500">{pro.size}</p>
                                                    <div className="mt-1 space-y-1">
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <BsCalendarDate className="w-4 h-4 mr-1" />
                                                            {formatDate(pro.start_Date)}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <BsCalendarDate className="w-4 h-4 mr-1" />
                                                            {formatDate(pro.return_Date)}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <BsBox className="w-4 h-4 mr-1" />
                                                            Qty: {pro.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Total Section */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">

                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">Referral Points</span>
                                            <span className="text-sm font-medium">{allPoints.totalReferred} </span>
                                        </div>

                                <div className="flex justify-between mb-2">
                               <span className="text-sm text-gray-600 flex gap-3"> 
                                  <p>Apply referral points discount</p>
                                    <input  
                                        type="checkbox"  
                                        checked={isRadio} 
                                        onChange={handleDiscountToggle} 
                                        className='cursor-pointer' 
                                        disabled={TotalsAll < 3000 || allPoints.totalReferred < 10} 
                                    />  
                                </span>
                                        </div>


                                        <span className="text-sm font-medium"><span className='text-[0.6rem]'>(10 points needed for a 5% discount, with a minimum purchase of 3,000 pesos)</span></span>

                                        <div className="flex justify-between">
                                            <span className="text-base font-medium">Total Payment</span>
                                            
                                            <span className="text-lg font-semibold flex gap-4 text-[0.8rem]">
                                                          {
                                                            displayDiscount &&  <p className='line-through'>₱ {OriginalValue}</p>
                                                          }                                                
                                                         <p>₱ {total ? TotalsAll : 0}</p>
                                                </span>
                                        </div>
                                    </div>

                                    {/* Continue Shopping Button */}


                                    <button
                                        onClick={(e) => ConfirmationReserve(e)}
                                        disabled={loading}
                                        className="w-full mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl  py-2 px-4  hover:bg-gray-800 transition-colors"
                                    >
                                      {loading ? (<AiOutlineLoading3Quarters className="h-5 w-5 animate-spin mx-auto" />):(<p>Reserve</p>)} 
                                    </button>

                                    <button
                                        onClick={() => redirect('/Items')}
                                        className="w-full mt-3 bg-gray-900 text-white py-2 px-4 rounded-2xl hover:bg-gray-800 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>

                                    

                                </div>
                            </div>

                            {/* Footer */}
                            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Cristobal Collection</h3>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <HiLocationMarker className="w-4 h-4 mr-1" />
                                            Bagbaguin Santa Maria Bulacan
                                        </div>
                                    </div>
                                </div>
                                <button
                                onClick={()=> redirect('/Faqs')}
                                    className="w-full text-sm text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    Terms of Service
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Check_Out;