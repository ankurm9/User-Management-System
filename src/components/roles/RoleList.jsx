import React, { useState } from 'react';
import RoleModal from './RoleModal';
import PermissionMatrix from './PermissionMatrix';
import { useRoles } from '../../hooks/useRoles';
import { Shield, Plus, Edit2, Trash2, ChevronDown, Lock, Search } from 'lucide-react';

const RoleList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [expandedRoles, setExpandedRoles] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const { roles, addRole, updateRole, deleteRole } = useRoles();

  const toggleRoleExpand = (roleId) => {
    setExpandedRoles(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };

  const getRoleColor = (roleName) => {
    const colors = {
      admin: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      moderator: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      editor: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      user: 'bg-gray-100 dark:bg-gray-800/60 text-gray-800 dark:text-gray-300'
    };
    return colors[roleName.toLowerCase()] || 'bg-gray-100 dark:bg-gray-800/60 text-gray-800 dark:text-gray-300';
  };

  const filteredRoles = roles.filter((role) => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-2 sm:mb-0">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-500" />
              Roles & Permissions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Manage role-based access control and permissions
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedRole(null);
              setIsModalOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 
                       bg-blue-600 dark:bg-blue-500 text-white rounded-md 
                       hover:bg-blue-700 dark:hover:bg-blue-600 
                       transition-colors duration-200 w-full sm:w-auto text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            New Role
          </button>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-700 
                     rounded-md bg-white dark:bg-gray-900 
                     text-gray-900 dark:text-gray-100 
                     focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 
                     text-gray-400 dark:text-gray-500 w-5 h-5" 
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
        {filteredRoles.length > 0 ? (
          filteredRoles.map((role) => (
            <div key={role.id} className="group">
              <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          {role.name}
                          <span className={`${getRoleColor(role.name)} text-xs px-2 py-0.5 rounded-full ml-1`}>
                            {role.permissions?.length || 0} Permissions
                          </span>
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {role.description || `Permissions and access rights for ${role.name}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedRole(role);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 
                               dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteRole(role.id)}
                      className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 
                               dark:hover:text-red-400 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleRoleExpand(role.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 
                               dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      <ChevronDown 
                        className={`w-4 h-4 transform transition-transform duration-200 
                                  ${expandedRoles[role.id] ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                </div>
                
                {/* Permission Matrix - Collapsible */}
                <div className={`mt-4 transition-all duration-200 overflow-hidden
                              ${expandedRoles[role.id] ? 'opacity-100' : 'opacity-0 h-0'}`}>
                  {expandedRoles[role.id] && (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <PermissionMatrix
                        role={role}
                        onUpdate={(permissions) => updateRole({ ...role, permissions })}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <Shield className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No roles found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Get started by creating a new role
            </p>
            <button
              onClick={() => {
                setSelectedRole(null);
                setIsModalOpen(true);
              }}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2 
                         bg-blue-600 dark:bg-blue-500 text-white rounded-md 
                         hover:bg-blue-700 dark:hover:bg-blue-600 
                         transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              New Role
            </button>
          </div>
        )}
      </div>

      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={selectedRole}
        onSave={(role) => {
          if (role.id) {
            updateRole(role);
          } else {
            addRole(role);
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default RoleList;