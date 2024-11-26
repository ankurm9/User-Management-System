import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { mockRoles } from '../services/mockData';

export const useRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    setRoles(mockRoles);
  }, []);

  const addRole = (role) => {
    const newRole = {
      ...role,
      id: uuidv4(),
      permissions: role.permissions || [],
    };
    setRoles([...roles, newRole]);
  };

  const updateRole = (updatedRole) => {
    setRoles(roles.map((role) =>
      role.id === updatedRole.id ? updatedRole : role
    ));
  };

  const deleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  return { roles, addRole, updateRole, deleteRole };
};