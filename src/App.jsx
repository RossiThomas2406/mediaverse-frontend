import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 

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
          
          {/* RUTA DE REDIRECCIÓN INICIAL (AÑADIR ESTA LÍNEA) */}
          {/* Si el usuario llega a la URL base (que es /), lo enviamos al login inmediatamente */}
          <Route path="/" element={<Navigate to="/login" replace />} /> 

          {/* Rutas Públicas (acceso libre) */}
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          
          {/* GRUPO DE RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoutes />}>
            {/* Cambiamos la ruta "/" protegida a "/search" para evitar conflicto con la redirección inicial, o la eliminamos ya que la pusimos en la redirección */}
            <Route path="/search" element={<SearchPage />} /> 
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;