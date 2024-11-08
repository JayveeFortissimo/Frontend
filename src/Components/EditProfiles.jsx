import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLock, FaTimes } from 'react-icons/fa';
import EditProfileUser from "../hooks/EditUserProfile.js";

const EditProfiles = ({ dispatch, Sidebars }) => {
  const { Edits, handleProfile, userPro } = EditProfileUser();

  const inputClass = "w-full h-12 px-4 rounded-lg border border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all duration-200 bg-white/50";
  const labelClass = "font-medium text-gray-700 mb-1";

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex flex-row items-center justify-between border-b border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Edit Profile
        </h2>
        <button
          onClick={() => dispatch(Sidebars.Editpro(false))}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        >
          <FaTimes className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="p-6">
        <form onSubmit={e => Edits(e)} className="space-y-6">
          <div className="space-y-1">
            <label className={labelClass}>
              <div className="flex items-center gap-2">
                <FaUser className="h-4 w-4 text-gray-500" />
                <span>Name</span>
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
                <FaEnvelope className="h-4 w-4 text-gray-500" />
                <span>Email</span>
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
                <FaMapMarkerAlt className="h-4 w-4 text-gray-500" />
                <span>Address</span>
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
                <FaPhone className="h-4 w-4 text-gray-500" />
                <span>Contact</span>
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
                <FaLock className="h-4 w-4 text-gray-500" />
                <span>Password</span>
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
  );
};

export default EditProfiles;