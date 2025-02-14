import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Info,
  Contact,
  Menu,
  X,
  Settings,
  User,
  Bell
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { id: 'home', title: 'Home', icon: <Home size={20} />, path: '/home' },
    { id: 'create-group', title: 'Create Group', icon: <Info size={20} />, path: '/create-group' },
    { id: 'contact', title: 'Contact', icon: <Contact size={20} />, path: '/contact' },
    { id: 'settings', title: 'Report', icon: <Settings size={20} />, path: '/report' },
    { id: 'profile', title: 'Profile', icon: <User size={20} />, path: '/profile' },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg
          transition-all duration-300 ease-in-out z-50
          ${isOpen ? 'w-64' : 'w-20'}
        `}
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          {isOpen && (
            <Link to="/home" className="text-xl font-bold text-white">
              MyApp
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* User Profile Section */}
        <div className={`px-4 py-6 border-b border-gray-700 ${!isOpen && 'text-center'}`}>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <User size={24} />
            </div>
            {isOpen && (
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-400">Admin</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="px-2 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center px-4 py-3 mb-2 rounded-lg transition-colors
                ${location.pathname === item.path
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700'
                }
                ${!isOpen && 'justify-center'}
              `}
            >
              <span className="flex items-center">
                {item.icon}
              </span>
              {isOpen && (
                <span className="ml-4">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Notifications Badge */}
        <div className="absolute bottom-8 w-full px-4">
          <button 
            className={`
              flex items-center px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors
              ${!isOpen && 'justify-center w-full'}
            `}
          >
            <div className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                3
              </span>
            </div>
            {isOpen && <span className="ml-4">Notifications</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 ${isOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <div className="p-8">
          {/* Your Routes content will be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;