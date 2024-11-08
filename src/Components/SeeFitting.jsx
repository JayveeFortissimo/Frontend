import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Appointment from '../hooks/Appointment.js';

const SeeFitting = ({ Sidebars, dispatch }) => {
  const { data } = Appointment();
  const [statusFilter, setStatusFilter] = useState("confirmed");

  const getTimeRange = (preferTime) => {
    const timeRanges = {
      evening: "6 PM - 8 PM",
      morning: "8 AM - 12 PM",
      afternoon: "1 PM - 5 PM"
    };
    return timeRanges[preferTime] || "";
  };

  // Sort and filter appointments
  const filteredAppointments = data
    .filter((appointment) => {
      const dateOfNow = new Date();
      dateOfNow.setHours(0, 0, 0, 0); // Reset time to start of day
      const date = new Date(appointment.date);
      date.setHours(0, 0, 0, 0); // Reset time to start of day
      
      // Only filter out appointments from before today
      const isPast = date < dateOfNow;

      // Normalize status comparison by converting both to lowercase
      const normalizedAppointmentStatus = appointment.status.toLowerCase();
      const normalizedStatusFilter = statusFilter.toLowerCase();

      // Apply status filter
      return (!isPast && normalizedAppointmentStatus === normalizedStatusFilter);
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      return new Date(b.date) - new Date(a.date);
    });

  // Define consistent status options
  const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-emerald-500" },
    { value: "cancelled", label: "Canceled", color: "bg-red-500" },
    { value: "completed", label: "Completed", color: "bg-blue-500" },
    { value: "confirmed", label: "Confirmed", color: "bg-purple-500" }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white/95 shadow-2xl rounded-xl mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your Appointments
            </h2>
            <button
              onClick={() => dispatch(Sidebars.Appointment(false))}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <AiOutlineClose className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {statusOptions.map(({ value, label, color }) => (
              <button
                key={value}
                onClick={() => setStatusFilter(value)}
                className={`px-4 py-2 rounded-full ${
                  statusFilter.toLowerCase() === value ? color : "bg-gray-300"
                } text-white text-sm font-medium shadow-lg transition-transform hover:scale-105`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Appointments List */}
          <div className="space-y-4 h-[15rem] overflow-auto">
            {filteredAppointments.map((appointment, index) => {
              const date = new Date(appointment.date);
              date.setHours(0, 0, 0, 0); // Reset time to start of day
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Reset time to start of day
              
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              const appointmentDate = date.toLocaleDateString('en-US', options);
              const isToday = date.getTime() === today.getTime();
              const isNewest = index === 0;
              const isPast = date < today;

              // Define status badge styling
              const statusBadgeStyles = {
                pending: "bg-yellow-500 text-yellow-100",
                cancelled: "bg-red-500 text-red-100",
                completed: "bg-blue-500 text-blue-100",
                confirmed: "bg-purple-500 text-purple-100"
              };

              // Normalize the status for consistent styling
              const normalizedStatus = appointment.status.toLowerCase();

              return (
                <div
                  key={appointment.id}
                  className={`transform transition-all duration-200 hover:scale-[1.02] ${isToday ? 'animate-pulse' : ''}`}
                >
                  <div
                    className={`rounded-xl p-4 ${
                      isPast 
                        ? 'bg-gradient-to-r from-gray-400 to-gray-500'
                        : isNewest
                        ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                    } shadow-lg`}
                  >
                    <div className="flex items-center justify-between text-white">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{appointment.prefer_Time}</span>
                          {isNewest && (
                            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                              Newest
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {isToday ? (
                            <span className="font-bold">TODAY'S FITTING APPOINTMENT</span>
                          ) : (
                            <span>{appointmentDate}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-sm font-medium bg-white/20 px-4 py-2 rounded-lg">
                        {getTimeRange(appointment.prefer_Time)}
                      </div>
                    </div>
                    {/* Status Badge */}
                    <div className={`mt-4 inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeStyles[normalizedStatus]}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Empty State */}
            {filteredAppointments.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No appointments found for the selected status.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeFitting;