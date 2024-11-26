import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import UserList from '../users/UserList';
import RoleList from '../roles/RoleList';

const Layout = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState('users');

  const renderContent = () => {
    switch (activeMenu) {
      case 'users':
        return (
          <div className="p-4 sm:p-8">
            <UserList />
          </div>
        );
      case 'roles':
        return (
          <div className="p-4 sm:p-8">
            <RoleList />
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 sm:p-8 text-gray-600 dark:text-gray-400">
            Settings page has no content
          </div>
        );
      default:
        return <UserList />;
    }
  };

  return (
    <div className="h-screen flex bg-white dark:bg-gray-900">
      <Sidebar 
        activeMenu={activeMenu} 
        onMenuSelect={setActiveMenu}
        onLogout={() => {/* Logout logic */}}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-800">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;