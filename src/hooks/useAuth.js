import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();

    const logout = () => {
        // Eliminar el token del Local Storage
        localStorage.removeItem('token');
        // Redirigir al login
        navigate('/login');
    };

    return { logout };
};