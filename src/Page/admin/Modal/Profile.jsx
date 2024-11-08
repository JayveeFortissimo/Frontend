import { VscBell, VscChromeClose } from "react-icons/vsc";
import AdminProfile from "../../../hooks/AdminHooks/AdminProfile.js";
import { motion } from 'framer-motion';

const Profile = ({ setOpenProfile, setOpenEdit }) => {

  const { profile } = AdminProfile();

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
          <button onClick={() => setOpenProfile(false)} className="text-white/80 hover:text-white transition-colors">
            <VscChromeClose size={20} />
          </button>
        </div>

        {/* Profile Information */}
        <div className="p-6 mt-16 flex flex-col gap-6 animate-fade-in items-start">
          {profile.map((profile, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#60a5fa] to-[#c084fc] p-4 rounded-full">
                  <span className="text-3xl font-bold text-white">{profile.name[0]}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl">{profile.name}</h3>
                  <p className="text-gray-400">{profile.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-gray-400">Address</p>
                  <p className="text-white font-bold text-xl">{profile.address}</p>
                </div>
                <div>
                  <p className="text-gray-400">Contact</p>
                  <p className="text-white font-bold text-xl">{profile.contact}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className={`text-white font-bold text-xl ${profile.status === 1? "text-green-600":"text-red-600"}`}>{profile.status === 1 ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </div>
          ))}

        <button 
        onClick={()=>{
          setOpenProfile(false);
          setOpenEdit(true);
        }}
        className="px-6 py-[0.5rem] bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50">EDIT</button>

        </div>
        
      </div>
    </motion.div>
  );
};

export default Profile;
