import { 
  VscHome,
  VscJersey,
  VscCalendar,
  VscExclude,
  VscFeedback,
  VscTriangleLeft 
} from "react-icons/vsc";
import { NavLink, useNavigate } from 'react-router-dom';
import { PiBookOpenUserThin } from "react-icons/pi";

const SideAdmin = ({isSidebarOpen}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ID");
    navigate('/');
  };

  const navItems = [
    { icon: <VscHome size={20} />, text: 'Dashboard', path: '/admin' },
    { icon: <VscJersey size={20} />, text: 'Manage Products', path: 'Products' },
    { icon: <VscCalendar size={20} />, text: 'Users & Orders', path: 'Orders' },
    { icon: <PiBookOpenUserThin size={20} />, text: 'Appointment', path: 'appointment' },
    { icon: <VscFeedback size={20} />, text: 'Inquiries', path: 'Inquires' },
    { icon: <VscExclude size={20} />, text: 'Settings', path: 'Settings' },
  ];

  return (
    <aside className={`
    min-h-screen
          bg-gradient-to-b
          from-gray-900
          to-gray-800
          text-gray-100
          py-6
          px-4
          fixed
          lg:static
          w-64
          z-40
          transform
          duration-300
          ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>

      {/* Logo Section */}
      <div className="mb-8 text-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Cristobal Collection
        </h1>
      </div>

      {/* Admin Profile Section */}
      <div className="mb-8 px-4">
        <div className="p-4 rounded-xl bg-white/10 backdrop-blur-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-lg font-bold">A</span>
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 px-2">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-white/20 text-white shadow-lg' 
                : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.text}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-8 left-4 right-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 
                   hover:bg-red-500/10 hover:text-red-500 transition-all duration-200"
        >
          <VscTriangleLeft size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SideAdmin;