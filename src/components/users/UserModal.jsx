import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useRoles } from '../../hooks/useRoles';
import { UserIcon, EnvelopeIcon, ShieldCheckIcon, CircleStackIcon } from '@heroicons/react/24/outline';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const { roles } = useRoles();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Active',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
        status: 'Active',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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

  const SelectField = ({ icon: Icon, label, name, value, onChange, required, options }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative rounded-lg">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        </div>
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 
                    focus:border-transparent transition duration-200
                    appearance-none"
        >
          {options}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 9l-7 7-7-7"></path>
          </svg>
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
          <UserIcon className="h-8 w-8 text-blue-500 dark:text-blue-400 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user ? 'Edit User Details' : 'Create New User'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            icon={UserIcon}
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <InputField
            icon={EnvelopeIcon}
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <SelectField
            icon={ShieldCheckIcon}
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            options={
              <>
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </>
            }
          />

          <SelectField
            icon={CircleStackIcon}
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            options={
              <>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </>
            }
          />

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
              {user ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserModal;