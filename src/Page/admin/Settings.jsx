import { VscAccount, VscRobot } from "react-icons/vsc";
import { useState } from "react";
import Profile from "./Modal/Profile";
import ProfileEdit from "./Modal/ProfileEdit";

const SettingCard = ({ icon, title, subtitle, onclick }) => (
  <div onClick={onclick} className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer">
    <div className="relative h-24 w-full rounded-2xl bg-gray-800/60 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80"></div>
      <div className="relative h-full px-6 py-4 flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-700/20 group-hover:bg-gray-700/30 transition-colors duration-300">
          {icon}
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium text-gray-200">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
        <div className="ml-auto">
          <svg
            className="w-5 h-5 text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const Settings = () => {

  
  const [openProfile, setOpenProfile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);


  const settingsOptions = [
    {
      icon: <VscAccount size={24} className="text-gray-400" />,
      title: "Your Account",
      subtitle: "Personal information and preferences",
      onclick: () => setOpenProfile(true)
    },
    {
      icon: <VscRobot size={24} className="text-gray-400" />,
      title: "Help",
      subtitle: "Support and documentation"
    }
  ];


  return (
   <>
   
{openProfile &&  <Profile setOpenProfile={setOpenProfile} setOpenEdit={setOpenEdit}/>}

{openEdit && <ProfileEdit setOpenEdit={setOpenEdit}/>}
  
   <div className="min-h-[100vh] w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-200">Settings</h1>
          <p className="mt-2 text-sm text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Grid */}
        <div className="space-y-4">
          {settingsOptions.map((option, index) => (
            <SettingCard
              key={index}
              icon={option.icon}
              title={option.title}
              subtitle={option.subtitle}
              onclick={option.onclick}
            />
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-12 p-4 rounded-2xl bg-gray-800/60 border border-gray-700/50">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gray-700/20">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300">Need help with settings?</h3>
              <p className="mt-1 text-sm text-gray-400">
                Check out our documentation or contact support for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
   
   </>
  );
};

export default Settings;