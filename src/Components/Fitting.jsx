import React, { useState, useEffect } from "react";
import { VscChromeClose, VscChevronLeft } from "react-icons/vsc";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

const Fitting = ({ setOpenFitting }) => {
  const ID = JSON.parse(localStorage.getItem("ID"));
  const [startDate, setStartDate] = useState(new Date());
  const [times, setTimes] = useState('');
  const [next, setNext] = useState(false);
  
  const [availableTimes, setAvailableTimes] = useState({
    morning: false,
    afternoon: false,
    evening: false
  });

  const [info, setInfo] = useState({
    fname: '',
    email: '',
    contact: '',
    user_ID: ID.id
  });

  useEffect(() => {
    updateAvailableTimes();
  }, [startDate]);

  const updateAvailableTimes = () => {
    const now = new Date();
    const selectedDate = new Date(startDate);
    
    if (selectedDate.toDateString() === now.toDateString()) {
      const currentHour = now.getHours();
      setAvailableTimes({
        morning: currentHour < 9,
        afternoon: currentHour < 17,
        evening: currentHour < 20
      });
    } else if (selectedDate > now) {
      setAvailableTimes({
        morning: true,
        afternoon: true,
        evening: true
      });
    } else {
      setAvailableTimes({
        morning: false,
        afternoon: false,
        evening: false
      });
    }
  };

  const HandleChange = (type, value) => {
    setInfo(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const HandleSubmits = async (e) => {
    e.preventDefault();
    if (!startDate || !times || !info.fname || !info.contact || !info.email) {
      toast.error("Please complete the form");
      return;
    }

    try {
      const response = await fetch(`https://backend-production-024f.up.railway.app/Appointment`, {
        method: 'POST',
        body: JSON.stringify({
          date: new Date(Date.UTC(new Date(startDate).getFullYear(), new Date(startDate).getMonth(), new Date(startDate).getDate())).toISOString().split('T')[0],
          time: times,
          fname: info.fname,
          email: info.email,
          contact: info.contact,
          user_ID: ID.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error("Submission failed");

      toast.success("Appointment successfully submitted");
      setOpenFitting(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the appointment");
    }
  };

  const TimeSlot = ({ value, label, disabled }) => (
    <label className={`
      flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200
      ${times === value && !disabled ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-200'}
    `}>
      <input
        type="radio"
        name="PreferredTime"
        value={value}
        checked={times === value}
        onChange={e => setTimes(e.target.value)}
        disabled={disabled}
        className="hidden"
      />
      <span className={`${times === value && !disabled ? 'text-blue-700' : 'text-gray-700'}`}>
        {label}
      </span>
    </label>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b">
            <div className="flex items-center gap-3">
              {next && (
                <button 
                  onClick={() => setNext(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <VscChevronLeft className="w-5 h-5" />
                </button>
              )}
              <h2 className="text-xl font-semibold">
                {!next ? "Schedule Fitting Appointment" : "Complete Your Details"}
              </h2>
            </div>
            <button
              onClick={() => setOpenFitting(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <VscChromeClose className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mt-6">
            <form onSubmit={HandleSubmits} className="space-y-6">
              {!next ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={date => setStartDate(date)}
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <div className="space-y-3">
                      <TimeSlot 
                        value="morning" 
                        label="Morning (9AM - 12PM)"
                        disabled={!availableTimes.morning}
                      />
                      <TimeSlot 
                        value="afternoon" 
                        label="Afternoon (1PM - 5PM)"
                        disabled={!availableTimes.afternoon}
                      />
                      <TimeSlot 
                        value="evening" 
                        label="Evening (6PM - 8PM)"
                        disabled={!availableTimes.evening}
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-1">Store Location</h3>
                    <p className="text-gray-600">JP Rizal poblacion, Santa Maria, Bulacan</p>
                    <p className="text-gray-600">09604099126</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setNext(true)}
                    disabled={!times}
                    className={`
                      w-full p-3 rounded-lg font-medium transition-colors
                      ${times ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                    `}
                  >
                    Continue
                  </button>
                </>
              ) : (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    onChange={e => HandleChange('fname', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  
                  <input
                    type="email"
                    placeholder="Email Address"
                    onChange={e => HandleChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Contact Number"
                    onChange={e => HandleChange('contact', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />

                

                  <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Confirm Appointment
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitting;