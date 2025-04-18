import { useState, useEffect } from 'react';
import Historys from '../../hooks/AdminHooks/History.js';
import PickUpDetails from './PickUpDetails.jsx';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaCalendarAlt, FaStore } from "react-icons/fa";
import { RiGpsFill } from "react-icons/ri";
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import {Sidebars} from '../../Store/Side.js';
import {useDispatch} from 'react-redux'

const History = ({ user_ID }) => {
    const { allDatas, setAllDatas } = Historys(user_ID);
    const [openPick, setOpenPick] = useState(false);
    const dispatch = useDispatch();
    const [pickupDetails, setPickupDetails] = useState({
        productName: '',
        start_Date: '',
        return_Date: '',
        Pickuped: '',
        quantity: '',
        size: ''
    });

    useEffect(() => {
        const socket = io('https://backend-production-62ff.up.railway.app');

        socket.on('pickup-status-updated', (data) => {
            setAllDatas((prevDatas) => {
                return prevDatas.map((item) => {
                    if (item.id === data.prodID) {
                        return { ...item, Pickuped: data.Pickuped };
                    }
                    return item;
                });
            });

            toast.success(`Pickup status for product ID ${data.prodID} has been updated to ${data.Pickuped}`);
            dispatch(Sidebars.Activity('Return'))
        });

        return () => {
            socket.off('pickup-status-updated');
            socket.disconnect();
        };
    }, [setAllDatas]);

    
  // Filter to show only Approved items
  const displayItems = allDatas.filter(item => item.status === "Approved");

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {openPick && (
                <PickUpDetails
                    setOpenPick={setOpenPick}
                    productName={pickupDetails.productName}
                    start_Date={pickupDetails.start_Date}
                    return_Date={pickupDetails.return_Date}
                    Pickuped={pickupDetails.Pickuped}
                    quantity={pickupDetails.quantity}
                    size={pickupDetails.size}
                />
            )}

            <div className="mb-8 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Reservation History</h2>
            </div>

            <div className="space-y-6">
                {displayItems.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                        <IoCheckmarkDoneCircleOutline className="mx-auto text-6xl text-gray-400 mb-4" />
                        <p className="text-xl font-medium text-gray-600">No approved items yet</p>
                        <p className="text-gray-400 mt-2">Your approved reservations will appear here</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {allDatas.map(pro => {
                            const startDate = new Date(pro.start_Date);
                            const returnDate = new Date(pro.return_Date);
                            const options = { year: 'numeric', month: 'long', day: 'numeric' };
                            const Starto = startDate.toLocaleDateString('en-US', options);
                            const returns = returnDate.toLocaleDateString('en-US', options);

                            return (
                                <div
                                    key={pro.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="relative">
                                        <img
                                            src={`https://backend-production-62ff.up.railway.app/uploads/${pro.picture}`}
                                            className="w-full h-48 object-cover"
                                            alt={pro.product_Name}
                                        />
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                                            pro.Pickuped === "ITEM PICKED UP ALREADY"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                            {pro.Pickuped === "ITEM PICKED UP ALREADY" ? "Picked Up" : "Pending"}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">{pro.product_Name}</h3>
                                        
                                        <div className="space-y-3 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-green-600" />
                                                <span>Start: {Starto}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RiGpsFill className="text-red-600" />
                                                <span>Return: {returns}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaStore className="text-blue-600" />
                                                <span className="capitalize">{pro.PD} payment</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MdOutlineInventory2 className="text-purple-600" />
                                                <span>
                                                    {pro.PD === "In store" && pro.Pickuped === "ITEM PICKED UP ALREADY"
                                                        ? "Fully Paid"
                                                        : pro.PD === "Gcash|FullPaid"
                                                        ? "Paid via GCash"
                                                        : "Payment Pending"}
                                                </span>
                                            </div>
                                        </div>

                                        {pro.Pickuped !== "ITEM PICKED UP ALREADY" && (
                                            <button
                                                onClick={() => {
                                                    setPickupDetails({
                                                        productName: pro.product_Name,
                                                        start_Date: Starto,
                                                        return_Date: returns,
                                                        Pickuped: pro.Pickuped,
                                                        quantity: pro.quantity,
                                                        size: pro.size
                                                    });
                                                    setOpenPick(true);
                                                }}
                                                className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
                                            >
                                                <IoCheckmarkDoneCircleOutline className="text-lg" />
                                                Pickup Details
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;