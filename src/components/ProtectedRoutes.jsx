// src/components/ProtectedRoutes.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    // 1. Verificar si existe el token en Local Storage
    const isAuthenticated = localStorage.getItem('token'); 
    
    // 2. Si el token existe, permite el acceso al componente hijo (<Outlet />)
    // 3. Si no existe, redirige (Navigate) al login.
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;