import React from 'react';

const permissions = [
  { id: 'read', name: 'Read' },
  { id: 'write', name: 'Write' },
  { id: 'delete', name: 'Delete' },
];

const PermissionMatrix = ({ role, onUpdate }) => {
  const handleToggle = (permission) => {
    const updatedPermissions = role.permissions.includes(permission)
      ? role.permissions.filter((p) => p !== permission)
      : [...role.permissions, permission];
    onUpdate(updatedPermissions);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {permissions.map((permission) => (
        <label
          key={permission.id}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={role.permissions.includes(permission.id)}
            onChange={() => handleToggle(permission.id)}
            className="rounded text-blue-600 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-300"
          />
          <span className="text-gray-900 dark:text-gray-200">{permission.name}</span>
        </label>
      ))}
    </div>
  );
};

export default PermissionMatrix;
