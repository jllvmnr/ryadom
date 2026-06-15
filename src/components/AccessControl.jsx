import React from 'react';
import { useAuth } from '../context/AuthContext';

export const AccessControl = ({ allowedRoles, children }) => {
  const { role } = useAuth();
  
  if (!allowedRoles.includes(role)) return null;
  
  return <>{children}</>;
};