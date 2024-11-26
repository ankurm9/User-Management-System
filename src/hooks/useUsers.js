import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { mockUsers } from '../services/mockData';

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: uuidv4(),
      status: 'Active',
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return { users, addUser, updateUser, deleteUser };
};