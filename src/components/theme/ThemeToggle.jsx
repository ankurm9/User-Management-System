import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-24 h-10 rounded-full bg-gray-700 flex items-center p-1 cursor-pointer transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <div 
        className={`
          absolute w-22 h-8 rounded-full 
          transition-transform duration-300 ease-in-out
          ${isDark ? 'translate-x-0' : 'translate-x-0'}
        `}
      />
      
      <div 
        className={`
          z-10 w-8 h-8 rounded-full bg-white 
          shadow-lg transform transition-transform duration-300 ease-in-out
          flex items-center justify-center
          ${isDark ? 'translate-x-14' : 'translate-x-0'}
        `}
      >
        {isDark ? (
          <MoonIcon className="h-5 w-5 text-gray-700" />
        ) : (
          <SunIcon className="h-5 w-5 text-yellow-500" />
        )}
      </div>

      <div className="absolute inset-0 w-full h-full flex justify-between items-center px-3">
        <SunIcon className={`h-5 w-5 ${isDark ? 'text-gray-500' : 'text-yellow-300'}`} />
        <MoonIcon className={`h-5 w-5 ${isDark ? 'text-gray-300' : 'text-gray-500'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;