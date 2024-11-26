import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { 
  UserGroupIcon, 
  ShieldCheckIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';

const RoleModal = ({ isOpen, onClose, role, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    permissions: []
  });

  useEffect(() => {
    if (role) {
      setFormData(role);
    } else {
      setFormData({
        name: '',
        permissions: []
      });
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const InputField = ({ icon: Icon, label, type, name, value, onChange, required }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative rounded-lg">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:border-transparent transition duration-200
                    placeholder-gray-400 dark:placeholder-gray-500"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );

  const PermissionCard = ({ icon: Icon, label, description, checked, onChange }) => (
    <div className="relative flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-700
                    bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition duration-150">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 
                     rounded focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-150"
        />
      </div>
      <div className="ml-3 flex items-center">
        <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3" />
        <div>
          <label className="font-medium text-gray-900 dark:text-gray-100">
            {label}
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
        <div className="flex items-center mb-6">
          <UserGroupIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {role ? 'Edit Role Details' : 'Create New Role'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={ShieldCheckIcon}
            label="Role Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Permissions
            </label>
            <div className="grid gap-4">
              <PermissionCard
                icon={DocumentTextIcon}
                label="Read"
                description="View and access resources"
                checked={formData.permissions.includes('read')}
                onChange={() => handlePermissionChange('read')}
              />
              <PermissionCard
                icon={PencilSquareIcon}
                label="Write"
                description="Create and modify resources"
                checked={formData.permissions.includes('write')}
                onChange={() => handlePermissionChange('write')}
              />
              <PermissionCard
                icon={TrashIcon}
                label="Delete"
                description="Remove resources from the system"
                checked={formData.permissions.includes('delete')}
                onChange={() => handlePermissionChange('delete')}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                        bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                        rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 
                        focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 
                        transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white 
                        bg-blue-600 dark:bg-blue-500 rounded-lg 
                        hover:bg-blue-700 dark:hover:bg-blue-600 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                        transition duration-200"
            >
              {role ? 'Update Role' : 'Create Role'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RoleModal;