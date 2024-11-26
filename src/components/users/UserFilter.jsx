import React, { useState } from 'react';

const UserFilter = ({ onSearch, onRoleChange, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    onRoleChange(role);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onStatusChange(status);
  };

  return (
    <div className="flex space-x-4 bg-white p-4 rounded-lg shadow dark:bg-gray-800">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
      <div className="w-48">
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-700"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>
      <div className="w-48">
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-full px-3 py-2 border rounded-md text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-700"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilter;
