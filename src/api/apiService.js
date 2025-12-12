// src/api/apiService.js

import axios from 'axios';

// Obtener la URL base de las variables de entorno del Front-End (VITE_*)
const API_URL = import.meta.env.VITE_BACKEND_URL;

// 1. Crear la instancia base de Axios
const apiService = axios.create({
    baseURL: API_URL, // Usa la URL de Render
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Interceptor: Se ejecuta antes de cada petición
apiService.interceptors.request.use(
    (config) => {
        // Obtener el token JWT del almacenamiento local
        const token = localStorage.getItem('token'); 
        
        if (token) {
            // Si hay token, lo adjuntamos al encabezado de la petición
            // El middleware de tu Back-End espera el token en 'x-auth-token'
            config.headers['x-auth-token'] = token;
        }
        return config; // Continúa con la petición
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiService;