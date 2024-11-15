import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import { FaStore, FaGooglePay } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { BsCalendarDate, BsBox } from 'react-icons/bs';
import ChekDetails from '../hooks/CheckOutDetails.js';
import toCart from '../hooks/Tocart_check.js';
import DownPayment from '../Components/Modal/DownPayment.jsx';
import ConfirmGcash from '../Components/Modal/ConfirmGcash.jsx';
import DownpaymentG from '../Components/Modal/DownpaymentG.jsx';
import RefferalPoints from '../hooks/Referalpoints.js';
import Percent5 from '../Components/Modal/Percent5.jsx';

const Check_Out = () => {
    
    const redirect = useNavigate();
    const [downPay, setDownpayment] = useState(false);
    const [gcash, setGcash] = useState(false);

    const { allOrders, total } = toCart();

    console.log("LAHAT NG ORDERS" , allOrders);
    console.log("Total ALL", total);

    const [isdown,setDown] = useState(false);
    const { allDatas, setPayment, Gcash, DownpaymentInstore } = ChekDetails(allOrders);
    const { allPoints } = RefferalPoints();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const [onUse,setOnuse] = useState(true);
 
    const displayDiscount = JSON.parse(localStorage.getItem("Discount"));
    //length ng gowns in array
    const allGownSecurity = allOrders.length;

    const TotalsAll = displayDiscount ? (parseInt(total) + (200 * allGownSecurity)) * 0.95 : parseInt(total) + (200 * allGownSecurity);
    const OriginalValue = parseInt(total) + 200;

    const [isRadio, setRadio] = useState(false);
    const [isradio, setIsRadio ]  = useState(false);

    isRadio? localStorage.setItem("Discount", true) :  localStorage.removeItem("Discount");

    return (
        <>
 
    {
        TotalsAll >= 3000 ?
        (
        <div>
{allPoints.totalReferred >= 10 && onUse &&  <Percent5  setOnuse = {setOnuse}  setRadio={setRadio} setIsRadio={setIsRadio}/>}
        </div>
        ):(<div></div>)
    }
        

            {isdown && <DownpaymentG setDown={setDown} Gcash={Gcash} total={total} allGownSecurity={allGownSecurity}/>}
            
            {gcash && <ConfirmGcash setGcash={setGcash} total={total} setDown={setDown} allGownSecurity={allGownSecurity}/>}
            
            {downPay && <DownPayment setDownpayment={setDownpayment} DownpaymentInstore={DownpaymentInstore} total={total} allGownSecurity={allGownSecurity} />}
            
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                        <p className="mt-2 text-sm text-gray-600">Complete your order at Cristobal Collection</p>
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
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={() => { setPayment("In store"); setDownpayment(true); }}
                                        className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-green-500 bg-green-50 hover:bg-green-100 transition-colors"
                                    >
                                        <FaStore className="w-5 h-5 text-green-600" />
                                        <span className="font-medium text-green-700">Payment in Store</span>
                                    </button>
                                    <button
                                        onClick={() => { setPayment("Gcash"); setGcash(true); }}
                                        className="flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors"
                                    >
                                        <FaGooglePay className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-blue-700">GCash</span>
                                    </button>
                                </div>
                            </div>

                            {/* Cancellation Policy */}
                            <div className="bg-orange-50 rounded-xl border border-orange-200 p-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiAlertCircle className="w-5 h-5 text-orange-500" />
                                    <h3 className="text-lg font-semibold text-orange-800">Cancellation Policy</h3>
                                </div>
                                <p className="text-sm text-orange-700">
                                    Please note that cancellations will incur a 50% fee from your downpayment/full payment.
                                    No cancellations are allowed after admin approval.
                                </p>
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
                                                    src={`http://localhost:8000/uploads/${pro.picture}`}
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
                                            <span className="text-sm text-gray-600">Security Deposit</span>
                                            <span className="text-sm font-medium">₱200</span>
                                        </div>

                                        <div className="flex justify-between mb-2">
                                            <span className="text-sm text-gray-600">Referral Points</span>
                                            <span className="text-sm font-medium">{allPoints.totalReferred} </span>
                                        </div>

                                <div className="flex justify-between mb-2">
                               <span className="text-sm text-gray-600 flex gap-3"> 
                                    <input  
                                        type="checkbox"  
                                        checked={TotalsAll >= 3000 ? isradio : false}   
                                        onChange={() => setRadio(prev => !prev)} 
                                        className='cursor-pointer' 
                                        disabled={TotalsAll < 3000 || allPoints.totalReferred < 10} 
                                    />  
                                    <p>Apply referral points discount</p>
                                </span>
                                        </div>


                                        <span className="text-sm font-medium"><span className='text-[0.6rem]'>(10 points need for 5% Discount)</span></span>

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
                                        onClick={() => redirect('/')}
                                        className="w-full mt-6 bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
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