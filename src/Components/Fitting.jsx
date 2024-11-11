import React, { useState, useEffect } from "react";
import { VscChromeClose } from "react-icons/vsc";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

const Fitting = ({ setOpenFitting }) => {
  const ID = JSON.parse(localStorage.getItem("ID"));
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    startDate: new Date(),
    times: '',
    fname: '',
    email: '',
    contact: '',
    user_ID: ID?.id || ''
  });

  const [availableTimes, setAvailableTimes] = useState({
    morning: false,
    afternoon: false,
    evening: false
  });

  useEffect(() => {
    fetchUserProfile();
    updateAvailableTimes(formData.startDate);
  }, []);

  useEffect(() => {
    updateAvailableTimes(formData.startDate);
  }, [formData.startDate]);

  const updateAvailableTimes = (selectedDate) => {
    const now = new Date();
    const selected = new Date(selectedDate);
    
    if (selected.toDateString() === now.toDateString()) {
      const currentHour = now.getHours();
      setAvailableTimes({
        morning: currentHour < 9,
        afternoon: currentHour < 17,
        evening: currentHour < 20
      });
    } else if (selected > now) {
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

  const fetchUserProfile = async () => {
    if (!ID?.id || !ID?.token) return;

    try {
      const response = await fetch(
        `https://backend-production-024f.up.railway.app/profile/${ID.id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${ID.token}`
          }
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error("Failed to fetch user data");

      setFormData(prev => ({
        ...prev,
        fname: data[0].name,
        email: data[0].email,
        contact: data[0].contact
      }));
    } catch (error) {
      toast.error("Failed to load user profile");
      console.error(error);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { startDate, times, fname, contact, email } = formData;

    if (!startDate || !times || !fname || !contact || !email) {
      toast.error("Please complete all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://backend-production-024f.up.railway.app/Appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()))
            .toISOString()
            .split('T')[0],
          time: times,
          fname,
          email,
          contact,
          user_ID: ID.id
        })
      });

      if (!response.ok) throw new Error("Submission failed");

      toast.success("Appointment successfully scheduled");
      setOpenFitting(false);
    } catch (error) {
      toast.error("Failed to schedule appointment");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const TimeSlot = ({ value, label, disabled }) => (
    <label className={`
      flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200
      ${formData.times === value && !disabled ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-200'}
      w-full sm:w-auto
    `}>
      <input
        type="radio"
        name="PreferredTime"
        value={value}
        checked={formData.times === value}
        onChange={e => handleChange('times', e.target.value)}
        disabled={disabled}
        className="hidden"
      />
      <span className={`
        ${formData.times === value && !disabled ? 'text-blue-700' : 'text-gray-700'}
        text-sm sm:text-base w-full text-center
      `}>
        {label}
      </span>
    </label>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setOpenFitting(false)} />
      
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-xl overflow-y-auto max-h-[90vh]">
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between pb-4 border-b sticky top-0 bg-white z-10">
            <h2 className="text-lg sm:text-xl font-semibold">Schedule Fitting Appointment</h2>
            <button
              onClick={() => setOpenFitting(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <VscChromeClose className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fname}
                  onChange={e => handleChange('fname', e.target.value)}
                  className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={formData.contact}
                  onChange={e => handleChange('contact', e.target.value)}
                  className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your contact number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Preferred Date
              </label>
              <DatePicker
                selected={formData.startDate}
                onChange={date => handleChange('startDate', date)}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Preferred Time
              </label>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
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

            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg space-y-1">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">Store Location</h3>
              <p className="text-gray-600 text-xs sm:text-sm">JP Rizal poblacion, Santa Maria, Bulacan</p>
              <p className="text-gray-600 text-xs sm:text-sm">09604099126</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full p-2.5 sm:p-3 rounded-lg font-medium transition-colors text-sm sm:text-base
                ${isSubmitting ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}
              `}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Fitting;