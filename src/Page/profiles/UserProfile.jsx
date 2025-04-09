import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, redirect, Form, useRouteLoaderData } from 'react-router-dom';
import { GoPackage } from "react-icons/go";
import { 
  VscCalendar, VscMail, VscBell, VscBellDot, VscGear, 
  VscHistory, VscPackage, VscArrowLeft, VscClose, VscCheck,
  VscPerson, VscLocation, VscSymbolMethod,

} from "react-icons/vsc";
import { CiClock1 } from "react-icons/ci";
import { AiOutlineTrophy } from "react-icons/ai";

import Rewards from '../../Components/Modal/Rewards.jsx';
import { userprofile } from '../../Store/Credentials.js';
import { Sidebars } from '../../Store/Side.js';
import History from "../../Components/Modal/History.jsx";
import Cancelled from "../../Components/Modal/Cancelled.jsx";
import To_Return from '../../Components/Modal/To_Return.jsx';
import ReservesOrders from "../../Components/Modal/ReservesOrders.jsx";
import ReasonCacel from "../../Components/Modal/ReasonCacel.jsx";
import FinalH from '../../Components/Modal/FinalH.jsx';
import profileDetails from "../../hooks/ProfileDetails.js";
import EditProfiles from "../../Components/EditProfiles.jsx";
import Message from '../admin/Modal/Message.jsx';
import SeeFitting from '../../Components/SeeFitting.jsx';
import UserNotif from '../../Components/Modal/UserNotif.jsx';
import Settings from '../../Components/Modal/Settings.jsx';
import EditSizex from '../../Components/EditSize.jsx';
import ReferralCode from '../../Components/Modal/ReferralCode.jsx';
import ReferalsPoints from '../../Components/Modal/referalsPoints.jsx';
import io from 'socket.io-client';

const UserProfile = () => {

  let Activity;
  const ID = JSON.parse(localStorage.getItem("ID"));
  const [bell, setHaveNotif] = useState(false);
  const [refferal,setRefferal] = useState(false);
  const [rewards,setRewards] = useState(false);
  const [referalRewards, setReferalsRewards] = useState(false);
  const dispatch = useDispatch();
 

  const userProfile = useSelector(state => state.Credentials.usersDatas);
  const isReserveOrders = useSelector(state => state.Side.Activity);
  const openModal = useSelector(state => state.Cancel.reasonCancel);
  const EditProfile = useSelector(state => state.Side.EditProfile);
  const OpenMessage = useSelector(state => state.Side.message);
  const Appointment = useSelector(state => state.Side.appointment);
  const Notifs = useSelector(state => state.Side.Notifications);
  const Setting = useSelector(state => state.Side.Settings);
  const EditSizes = useSelector(state => state.Side.EditSize);
  
//!Referals Links
const referralLink = userProfile.length > 0 
  ? `${window.location.origin}/register/Referal?ref=${userProfile[0].referral_code}`
  : null;


  const {
    allOrders,
    PushToHistoryCancel,
    setReasonCancel,
    dataCancel,
    Starto,
    time,
    setAllOrders,
    allNotif,
    setAllnotifs
  } = profileDetails();



  useEffect(() => {
    const execute = dispatch(userprofile(dispatch, ID));
    return () => {
      execute
    }
  }, [dispatch]);

  

  useEffect(() => {
    const socket = io('https://backend-production-62ff.up.railway.app');
  
    socket.on('notification', (data) => {
      setHaveNotif(true);
      if (data.user_ID === ID.id) {
        setAllnotifs((prev) => [...prev, data]);
      }
    });
  
    return () => {
      socket.off('notification'); 
      socket.disconnect(); 
    };
  }, []);
  

  if (isReserveOrders === "Reserve") {
    Activity = <ReservesOrders allOrders={allOrders} user_ID={ID.id} PushToHistoryCancel={PushToHistoryCancel} setAllOrders={setAllOrders} />
  } else if (isReserveOrders === "History") {
    Activity = <History user_ID={ID.id} />
  } else if (isReserveOrders === "Cancelled") {
    Activity = <Cancelled dataCancel={dataCancel} />
  } else if (isReserveOrders === "FinalH") {
    Activity = <FinalH ID={ID.id} />
  } else if (isReserveOrders === "Return") {
    Activity = <To_Return user_ID={ID.id} />
  }

  
  const ActivityTab = ({ icon: Icon, label, count, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105
        ${isActive ? 'bg-indigo-50 text-indigo-600 shadow-sm border border-indigo-100' : 'text-gray-600 hover:bg-gray-50'}`}
    >
      <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-500' : 'text-gray-500'}`} />
      <span>{label}</span>
      {count > 0 && (
        <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">
          {count}
        </span>
      )}
    </button>
  );


  return (
    <>

    {referalRewards && <ReferalsPoints setReferalsRewards={setReferalsRewards} setRewards={setRewards} />}
    {rewards && <Rewards  setRewards={setRewards} setReferalsRewards={setReferalsRewards} /> }

     {refferal &&  <ReferralCode referralLink={referralLink} setRefferal={setRefferal}/>}
      {Setting && <Settings dispatch={dispatch} Side={Sidebars} />}
      {Notifs && <UserNotif dispatch={dispatch} Side={Sidebars} allNotif={allNotif} setHaveNotif={setHaveNotif}/>}
      {Appointment && <SeeFitting Sidebars={Sidebars} dispatch={dispatch} />}
      {OpenMessage && <Message id={ID} dispatch={dispatch} Sidebars={Sidebars} />}
      {openModal && <ReasonCacel setReasonCancel={setReasonCancel} PushToHistoryCancel={PushToHistoryCancel} />}
      {EditSizes ? (
        <EditSizex dispatch={dispatch} Sidebars={Sidebars} />
      ) : EditProfile ? (
        <EditProfiles dispatch={dispatch} Sidebars={Sidebars} />
      ) : (
        <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div>
            <h1 className="text-[1rem] font-semibold text-gray-800 flex gap-1 ml-3 xs:hidden md:flex"><span  className="flex flex-row  xs:hidden md:flex"></span> My Account</h1>
            <div className='xs:hidden sm:flex'></div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => dispatch(Sidebars.messageOpen(true))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <VscMail className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => dispatch(Sidebars.Notif(true))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                >
                  {bell ? (
                    <>
                      <VscBellDot className="w-5 h-5 text-indigo-500" />
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                    </>
                  ) : (
                    <VscBell className="w-5 h-5 text-gray-600" />
                  )}
                </button>


                    <button  className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                    <AiOutlineTrophy  onClick={() => setRewards(true)} className="w-5 h-5 text-gray-600"/>
                    </button>
                  
                <button 
                  onClick={() => dispatch(Sidebars.Settings(true))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <VscGear className="w-5 h-5 text-gray-600" />
                </button>
                
              </div>
              <div className="h-6 w-px bg-gray-200" />
              {/*May BABAGUHIN AKO D@2   */}
              <Form method="post">
                <button
                  type="submit"
                  className="px-4 py-[0.3rem] bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
                >
                  Logout
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Profile Card */}
        {userProfile.map(pro => (
          <div
            key={pro.id}
            className="bg-white rounded-2xl shadow-sm p-6 mb-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-white">
                  <span className="text-3xl font-bold">
                    {pro.name.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="flex-grow space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{pro.name}</h2>
                  <p className="text-gray-500">{pro.email}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <VscLocation className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{pro.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <VscSymbolMethod className="w-5 h-5 text-gray-400" />
                    <span className={`text-sm ${pro.status === 1 ? 'text-green-500' : 'text-red-500'}`}>
                      {pro.status === 1 ? '● Active' : '● Inactive'}
                    </span>
                  </div>

                    <div className="w-5 h-5 text-gray-400 flex gap-3" >
                    <CiClock1  className="w-5 h-5 text-gray-400"/>
                    <span className="text-sm">{time}</span>
                  </div>
               
                  <div className="flex items-center gap-2 text-gray-600">
                    <VscCalendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{Starto}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
             //WAIT THIS NOT SURE
        ))}

        {/* Activity Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6 flex-wrap">
            <h3 className="text-lg font-semibold text-gray-800">Orders Status</h3>
            <button
              onClick={() => dispatch(Sidebars.Appointment(true))}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              <VscCalendar className="w-5 h-5" />
              <span className="text-sm font-medium">Schedule Fitting</span>
            </button>

            <button
        onClick={() => setRefferal(true)}
        className="px-6 py-[0.5rem] bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
      >
        Share Referral Code
      </button>

          </div>

          {/* Activity Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            <ActivityTab 
              icon={VscPackage}
              label="For Approval"
              count={0}
              isActive={isReserveOrders === "Reserve"}
              onClick={() => dispatch(Sidebars.Activity("Reserve"))}
            />
            <ActivityTab 
              icon={VscCheck}
              label="Approved"
              count={0}
              isActive={isReserveOrders === "History"}
              onClick={() => dispatch(Sidebars.Activity("History"))}
            />
            <ActivityTab 
              icon={VscArrowLeft}
              label="To Return"
              count={0}
              isActive={isReserveOrders === "Return"}
              onClick={() => dispatch(Sidebars.Activity("Return"))}
            />
            <ActivityTab 
              icon={GoPackage}
              label="Completed"
              count={0}
              isActive={isReserveOrders === "FinalH"}
              onClick={() => dispatch(Sidebars.Activity("FinalH"))}
            />
            <ActivityTab 
              icon={VscClose}
              label="Cancelled"
              count={0}
              isActive={isReserveOrders === "Cancelled"}
              onClick={() => dispatch(Sidebars.Activity("Cancelled"))}
            />
          </div>

          {/* Activity Content */}
          <div className="mt-6">
            {Activity}
          </div>
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default UserProfile;

export const Logout = async () => {
  const ID = JSON.parse(localStorage.getItem("ID"));

  if (!ID || !ID.id) {
    console.log("No ID found in localStorage");
    return;
  }

  try {
    const response = await fetch("https://backend-production-62ff.up.railway.app/logOut", {
      method: "delete",
      body: JSON.stringify({
        ids: parseInt(ID.id)
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) return console.log("Cannot logOut");

    localStorage.clear("ID");
    return redirect('/login');

  } catch (error) {
    console.log(error);
    return null;
  }
};