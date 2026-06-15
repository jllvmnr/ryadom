import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { role, isAuthenticated } = useAuth();

  if (allowedRoles.includes(role)) {
    return <Outlet />; 
  }

  if (!isAuthenticated && !allowedRoles.includes('GUEST')) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/" replace />; 
};

export default ProtectedRoute;