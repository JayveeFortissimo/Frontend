import { useState, useEffect } from "react";
import { VscBell, VscChromeClose } from "react-icons/vsc";
import { IoRadioButtonOn } from "react-icons/io5";
import io from 'socket.io-client';

const Notif = ({ setTotalReserve, setNotifications }) => {
  const [allMessage, setAllMessage] = useState([]);
  const [newNotification, setNewNotification] = useState(false);

  // Helper function to convert date string to Date object
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0); // fallback for invalid dates
    return new Date(dateStr);
  };

  // Sort notifications by date
  const sortNotifications = (notifications) => {
    return [...notifications].sort((a, b) => {
      const dateA = parseDate(a.dates);
      const dateB = parseDate(b.dates);
      return dateB - dateA; // Sort in descending order (newest first)
    });
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:8000/AdminNotif`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        // Sort notifications before setting state
        setAllMessage(sortNotifications(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();

    const socket = io('http://localhost:8000');

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('newAdminNotification', (data) => {
      const newNotif = {
        message: data.message,
        dates: data.date,
        user_ID: data.user_ID,
        name: data.name,
        id: Date.now()
      };
      
      setNotifications(true);
      // Add new notification and resort the list
      setAllMessage(prev => sortNotifications([newNotif, ...prev]));
      setNewNotification(true);
      setTimeout(() => setNewNotification(false), 3000);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    return () => {
      socket.disconnect();
    };
  }, [setNotifications]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 w-full max-w-md h-[32rem] rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <VscBell className="text-blue-400" size={20} />
            <h2 className="text-white font-semibold">Notifications</h2>
          </div>
          <button
            onClick={() => {
              setTotalReserve(prev => ({ ...prev, Notifs: false }));
              setNotifications(false);
            }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <VscChromeClose size={20} />
          </button>
        </div>

        {/* Notification List */}
        <div className="mt-16 p-4 h-[calc(100%-4rem)] overflow-auto">
          <div className="space-y-3">
            {allMessage.map((notification, index) => {
              const isNewest = index === 0;
              return (
                <div
                  key={notification.id || index}
                  className={`
                    bg-gradient-to-r from-slate-800 to-slate-700
                    p-4 rounded-lg border border-white/5
                    transform transition-all duration-300
                    hover:translate-x-1 hover:shadow-lg
                    ${isNewest && newNotification ? 'animate-pulse border-blue-500/50' : ''}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <IoRadioButtonOn 
                      className={`mt-1 ${isNewest && newNotification ? 'text-blue-400 animate-ping' : 'text-blue-500/50'}`} 
                      size={16}
                    />
                    <div className="flex-1">
                      <p className="text-white/90 font-medium">
                        {notification.message}
                      </p>
                      <div className="mt-1 flex justify-between items-center text-sm">
                        <span className="text-white/50">
                          {notification.dates}
                        </span>
                        <div className="flex flex-row gap-4">
                          <span className="text-blue-400/80 text-xs">
                            {notification.name}
                          </span>
                          <span className="text-blue-400/80 text-xs">
                            ID: {notification.user_ID}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notif;