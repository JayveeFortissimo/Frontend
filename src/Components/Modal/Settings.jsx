import React from 'react';
import { VscChromeClose, VscEdit, VscJersey } from "react-icons/vsc";

const Settings = ({ dispatch, Side }) => {
  const MenuItem = ({ icon: Icon, text, onClick }) => (
    <button
      onClick={onClick}
      className="w-full p-4 mb-3 flex items-center gap-4 rounded-lg transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 group"
    >
      <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-white transition-colors duration-200">
        <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
      </div>
      <span className="font-medium text-gray-700 group-hover:text-gray-900">
        {text}
      </span>
    </button>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
            <button
              onClick={() => dispatch(Side.Settings(false))}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <VscChromeClose size={20} className="text-gray-500" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            <MenuItem
              icon={props => <VscEdit {...props} size={24} />}
              text="Edit your profile"
              onClick={() => {
                dispatch(Side.Settings(false));
                dispatch(Side.Editpro(true));
              }}
            />
            
            <MenuItem
              icon={props => <VscJersey {...props} size={24} />}
              text="Edit your size"
              onClick={() => {
                dispatch(Side.Settings(false));
                dispatch(Side.EditSize(true));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;