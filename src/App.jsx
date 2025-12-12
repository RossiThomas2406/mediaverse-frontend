import { HashRouter as Router, Routes, Route } from 'react-router-dom'; 

import LoginPage from './pages/Auth/LoginPage'; 
import RegisterPage from './pages/Auth/RegisterPage'; 
import SearchPage from './pages/Search/SearchPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProtectedRoutes from './components/ProtectedRoutes'; 

function App() {
  return (
    // USAMOS EL HashRouter PARA COMPATIBILIDAD CON SERVIDORES ESTÁTICOS COMO GITHUB PAGES
    <Router>
      <div className="min-h-screen"> 
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          
          {/* GRUPO DE RUTAS PROTEGIDAS */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<SearchPage />} /> 
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;