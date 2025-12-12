// src/App.jsx (VERSIÓN FINAL Y MÁS ROBUSTA PARA HASHROUTER)

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // <-- IMPORTAR COMPONENTE
import 'react-toastify/dist/ReactToastify.css'; // <-- IMPORTAR ESTILOS CSS

import LoginPage from './pages/Auth/LoginPage'; 
import RegisterPage from './pages/Auth/RegisterPage'; 
import SearchPage from './pages/Search/SearchPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProtectedRoutes from './components/ProtectedRoutes';


function App() {
  return (
    <Router>
      <div className="min-h-screen"> 
        <Routes>
          
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          
          {/* GRUPO DE RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoutes />}>
            
            {/* CRÍTICO: Definimos la ruta base '/' como la página de búsqueda.
               Si el usuario no está logueado, ProtectedRoutes lo enviará a /login.
            */}
            <Route path="/" element={<SearchPage />} /> 
            
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          
          {/* Ruta comodín: Maneja cualquier ruta que no coincida enviando al usuario
             a la página de Login/Registro si no se encuentra. 
          */}
          <Route path="*" element={<LoginPage />} />
          
        </Routes>
      </div>
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
        theme="dark" 
        // PROPIEDAD CRÍTICA: Usa la clase global que definiste en index.css
        toastClassName="mediaverseToast" 
        
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
    </Router>
  );
}

export default App;