import React, { useState } from 'react';
import { Plus, Filter, Users, X } from 'lucide-react';
import Table from '../common/Table';
import UserModal from './UserModal';
import UserFilter from './UserFilter';
import { useUsers } from '../../hooks/useUsers';

const UserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, addUser, updateUser, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const getStatusColor = (status) => {
    const statusColors = {
      active: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      inactive: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300',
      pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      suspended: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    };
    return statusColors[status.toLowerCase()] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
  };

  const getRoleBadgeColor = (role) => {
    const roleColors = {
      admin: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      user: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      editor: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
    };
    return roleColors[role.toLowerCase()] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300';
  };

  const columns = [
    { 
      header: 'Name', 
      accessor: 'name',
      cell: (user) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <div className="font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
          </div>
          <div className="sm:hidden">
            <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">{user.name}</div>
          </div>
        </div>
      )
    },
    { 
      header: 'Role', 
      accessor: 'role',
      cell: (user) => (
        <span className={`${getRoleBadgeColor(user.role)} px-2 py-1 rounded-full text-xs sm:text-sm font-medium capitalize`}>
          {user.role}
        </span>
      )
    },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (user) => (
        <span className={`${getStatusColor(user.status)} px-2 py-1 rounded-full text-xs sm:text-sm font-medium capitalize`}>
          {user.status}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'actions',
      cell: (user) => (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setSelectedUser(user);
              setIsModalOpen(true);
            }}
            className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                     text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 
                     transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => deleteUser(user.id)}
            className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 
                     border border-red-200 dark:border-red-800 rounded-md 
                     hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole ? user.role.toLowerCase() === selectedRole.toLowerCase() : true;
    const matchesStatus = selectedStatus ? user.status.toLowerCase() === selectedStatus.toLowerCase() : true;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
          <div className="w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2 sm:mb-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              User Management
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Manage your team members and their account permissions
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 dark:bg-blue-500 text-white 
                     rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>

        <div className="space-y-6">
          {/* Mobile Filter Toggle */}
          <div className="sm:hidden flex justify-between items-center">
            <div className="text-gray-700 dark:text-gray-300">Filters</div>
            <button 
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="text-blue-600 dark:text-blue-400 flex items-center gap-2"
            >
              {isMobileFilterOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
              {isMobileFilterOpen ? 'Close' : 'Open'}
            </button>
          </div>

          {isMobileFilterOpen && (
            <div className="sm:hidden fixed inset-0 bg-white dark:bg-gray-900 z-50 p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="text-gray-600 dark:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <UserFilter 
                onSearch={setSearchTerm}
                onRoleChange={setSelectedRole}
                onStatusChange={setSelectedStatus}
                isMobile={true}
                onClose={() => setIsMobileFilterOpen(false)}
              />
            </div>
          )}

          <div className="hidden sm:block">
            <UserFilter 
              onSearch={setSearchTerm}
              onRoleChange={setSelectedRole}
              onStatusChange={setSelectedStatus}
            />
          </div>
          
          {filteredUsers.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                No users found matching your search criteria
              </div>
            </div>
          ) : (
            <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
              <Table 
                columns={columns} 
                data={filteredUsers}
              />
            </div>
          )}
        </div>
      </div>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        onSave={(user) => {
          if (user.id) {
            updateUser(user);
          } else {
            addUser(user);
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default UserList;