import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { RutaProtegida } from './components/auth/RutaProtegida';
import LoginPage from './pages/loginPage';
import { DashboardPage } from './pages/dashboardPage'; 
import { ClientesPage } from './pages/clientesPages';
import { UsuariosPage } from './pages/UsuariosPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RutaProtegida />}>
          
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/clientes" element={<ClientesPage />} />
            <Route path="/usuarios" element={<UsuariosPage />} />
            {/* "Ventas", iría acá:
            <Route path="/ventas" element={<VentasPage />} /> */}
          </Route>

        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;