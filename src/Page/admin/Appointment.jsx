import { useState } from "react";
import { FaCalendarAlt, FaClock, FaUser, FaSearch, FaCheckCircle, FaTimesCircle, FaClipboardCheck, FaFilter, FaHistory } from "react-icons/fa";
import Appointments from "../../hooks/Appointment.js";

const Appointment = () => {
  const { allApointment, setAllApointment } = Appointments();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeView, setActiveView] = useState('upcoming');

  const handleStatusChange = async (e, appointmentId, newStatus, id, AID) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000//APPOINTMENTSTATUS/${id}`, {
        method: "put",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus,
          appointmentID: AID
        })
      });

      if (!response.ok) return console.log("CANNOT UPDATE THE STATUS");

      setAllApointment(allApointment.map(apt =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredAppointments = allApointment.filter(apt => {
    const appointmentDate = new Date(apt.date);
    appointmentDate.setHours(0, 0, 0, 0);
    const status = apt.status ? apt.status.trim().toLowerCase() : '';
    const matchesSearch = apt.full_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || status === filterStatus.toLowerCase();
    
    // Modified logic to consider status for history view
    const isHistoryItem = status === 'completed' || status === 'cancelled' || appointmentDate < today;
    
    return matchesSearch && matchesStatus && (
      (activeView === 'upcoming' && !isHistoryItem) ||
      (activeView === 'history' && isHistoryItem)
    );
  });

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
      completed: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-4 sm:py-8 w-full">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg mb-6 p-4 sm:p-6">
          <div className="flex flex-col space-y-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Fitting Appointments</h1>
              <p className="text-sm text-gray-300 mt-1">Manage and track your fitting schedule</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4">
              <button
                onClick={() => setActiveView('upcoming')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all ${
                  activeView === 'upcoming'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <FaCalendarAlt className="inline mr-2" />
                Upcoming
              </button>
              <button
                onClick={() => setActiveView('history')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-all ${
                  activeView === 'history'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <FaHistory className="inline mr-2" />
                History
              </button>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="w-full sm:w-auto px-4 py-2 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 text-white transition-all"
                >
                  <FaFilter className="text-gray-300" />
                  <span>Filter</span>
                </button>
                
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                    <div className="py-1">
                      {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setFilterStatus(status);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-700 ${
                            filterStatus === status ? 'bg-blue-500 text-white' : 'text-gray-300'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appointment) => {
            const date = new Date(appointment.date);
            const formattedDate = date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return (
              <div 
                key={appointment.id} 
                className="relative bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-4 sm:p-6 transition-all hover:shadow-xl hover:transform hover:scale-[1.02] border border-white/10"
              >
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </div>
                
                {/* Customer Info */}
                <div className="mt-4">
                  <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    <FaUser className="text-gray-400" />
                    {appointment.full_Name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">{appointment.email}</p>
                  <p className="text-xs sm:text-sm text-gray-300">{appointment.number}</p>
                </div>

                {/* Appointment Time */}
                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <FaCalendarAlt className="text-gray-400" />
                    {formattedDate}
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                    <FaClock className="text-gray-400" />
                    {appointment.prefer_Time}
                  </div>
                </div>

                {/* Action Buttons - Only show for upcoming appointments that aren't completed/cancelled */}
                {activeView === 'upcoming' && !['completed', 'cancelled'].includes(appointment.status.toLowerCase()) && (
                  <div className="mt-4 sm:mt-6 flex items-center justify-end gap-2">
                    <button
                      onClick={(e) => handleStatusChange(e, appointment.id, 'confirmed', appointment.user_ID, appointment.id)}
                      className="p-1.5 sm:p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors"
                    >
                      <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={(e) => handleStatusChange(e, appointment.id, 'cancelled', appointment.user_ID, appointment.id)}
                      className="p-1.5 sm:p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <FaTimesCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={(e) => handleStatusChange(e, appointment.id, 'completed', appointment.user_ID, appointment.id)}
                      className="p-1.5 sm:p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
                    >
                      <FaClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-8 sm:py-12 bg-white/10 backdrop-blur-lg rounded-2xl">
            <FaCalendarAlt className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-500" />
            <h3 className="mt-4 text-base sm:text-lg font-medium text-white">No appointments found</h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-300">
              {activeView === 'upcoming' 
                ? "No upcoming appointments match your criteria" 
                : "No past appointments match your criteria"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;