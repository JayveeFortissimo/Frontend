import { VscBell, VscChromeClose } from "react-icons/vsc";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLock, FaTimes } from 'react-icons/fa';
import AdminProfile from "../../../hooks/AdminHooks/AdminProfile.js";
import { motion } from 'framer-motion';

const ProfileEdit = ({setOpenEdit}) => {

  const {  handleProfile, Edits, userPro } = AdminProfile();

  const inputClass = "w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-200 bg-white/50";
  const labelClass = "font-medium text-gray-700 mb-1";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex justify-center items-center z-50 px-3"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] w-full max-w-[30rem] h-auto max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#60a5fa]/10 to-[#c084fc]/10 backdrop-blur-md p-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <VscBell className="text-[#60a5fa]" size={20} />
            <h2 className="text-white font-bold text-xl sm:text-2xl">Your Profile</h2>
          </div>
          <button onClick={() => setOpenEdit(false)} className="text-white/80 hover:text-white transition-colors">
            <VscChromeClose size={20} />
          </button>
        </div>

        {/* Profile Information */}
        <div className="p-6 mt-16 flex flex-col gap-6 animate-fade-in items-start text-white">
          
        <form onSubmit={e => Edits(e)} className="space-y-6">
          <div className="space-y-1">
            <label className={labelClass}>
              <div className="flex items-center gap-2">
                <FaUser className="h-4 w-4 text-white" />
                <span className="text-white">Name</span>
              </div>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={userPro.name}
              onChange={e => handleProfile("name", e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>
              <div className="flex items-center gap-2">
                <FaEnvelope className="h-4 w-4 text-white" />
                <span className="text-white">Email</span>
              </div>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={userPro.email}
              onChange={e => handleProfile("email", e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="h-4 w-4 text-white" />
                <span className="text-white">Address</span>
              </div>
            </label>
            <input
              type="text"
              placeholder="Enter your address"
              value={userPro.address}
              onChange={e => handleProfile("address", e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>
              <div className="flex items-center gap-2">
                <FaPhone className="h-4 w-4 text-white" />
                <span className="text-white">Contact</span>
              </div>
            </label>
            <input
              type="tel"
              placeholder="Enter your contact number"
              value={userPro.contact}
              onChange={e => handleProfile("contact", e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-1">
            <label className={labelClass}>
              <div className="flex items-center gap-2">
                <FaLock className="h-4 w-4 text-white" />
                <span className="text-white">Password</span>
              </div>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={userPro.password}
              onChange={e => handleProfile("password", e.target.value)}
              className={inputClass}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Update Profile
          </button>
        </form>

        </div>
        
      </div>
    </motion.div>
  )
}

export default ProfileEdit;