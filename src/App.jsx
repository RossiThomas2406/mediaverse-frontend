import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage'; 
import RegisterPage from './pages/Auth/RegisterPage'; 
import SearchPage from './pages/Search/SearchPage'; // <-- Importar
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProtectedRoutes from './components/ProtectedRoutes'; // <-- Importar

function App() {
  return (
    <Router>
      <div className="min-h-screen"> 
        <Routes>
          {/* Rutas Públicas (acceso libre) */}
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