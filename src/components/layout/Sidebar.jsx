import React, { useState, useEffect } from 'react';
import {
  UsersIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import ThemeToggle from '../theme/ThemeToggle';

const Sidebar = ({ activeMenu, onMenuSelect, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { name: 'Users', icon: UsersIcon },
    { name: 'Roles', icon: ShieldCheckIcon },
    { name: 'Settings', icon: Cog6ToothIcon },
  ];

  const renderMenuItems = () =>
    menuItems.map((item) => {
      const IconComponent = item.icon;
      const isActive = activeMenu === item.name.toLowerCase();

      return (
        <button
          key={item.name}
          onClick={() => {
            onMenuSelect(item.name.toLowerCase());
            if (isMobile) {
              setIsMobileMenuOpen(false);
            }
          }}
          className={`w-full flex items-center px-6 py-3.5 text-gray-300 transition-all duration-200 hover:bg-gray-700/50 dark:hover:bg-gray-800/50 group ${
            isActive
              ? 'bg-gray-700/50 dark:bg-gray-800/50 border-r-4 border-blue-400'
              : ''
          }`}
        >
          <IconComponent
            className={`h-5 w-5 mr-3 transition-colors duration-200 ${
              isActive ? 'text-blue-400' : 'group-hover:text-blue-400'
            }`}
          />
          <span
            className={`font-medium ${
              isActive ? 'text-blue-400' : 'group-hover:text-blue-400'
            }`}
          >
            {item.name}
          </span>
        </button>
      );
    });

  return (
    <>
      {isMobile && !isMobileMenuOpen && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-3 left-2 z-50 p-2 
          bg-white dark:bg-gray-800 
          text-gray-800 dark:text-white 
          rounded-md 
          shadow-md 
          border border-gray-200 dark:border-gray-700"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      )}

      <div
        className={`fixed lg:relative left-0 top-0 
        w-64 min-h-screen 
        bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black 
        text-white 
        flex flex-col 
        shadow-xl 
        transform 
        ${isMobile && !isMobileMenuOpen ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0 
        transition-transform 
        duration-300 
        ease-in-out
        z-40`}
      >
        <div className={`
          p-5 border-b border-gray-700/50 flex items-center justify-between
          ${isMobile ? 'py-3 p-4' : 'p-5'}
        `}>
          <h1 className={`
            font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400
            ${isMobile ? 'text-xl' : 'text-2xl'}
          `}>
            SecureShield
          </h1>

          {isMobile && isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          )}
        </div>

        <nav className="flex-1 pt-4">{renderMenuItems()}</nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700/50 space-y-4">
          <div className="px-4">
            <ThemeToggle />
          </div>

          <button
            onClick={() => {
              onLogout();
              if (isMobile) {
                setIsMobileMenuOpen(false);
              }
            }}
            className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-red-400 transition-colors duration-200 rounded-lg hover:bg-gray-700/50 dark:hover:bg-gray-800/50"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {isMobile && isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};

export default Sidebar;