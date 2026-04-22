import { Users, LayoutDashboard, Settings, LogOut } from 'lucide-react'; 
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import { logout } from '../../services/authService'; 

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const isActive = (path: string) => 
    location.pathname === path 
      ? 'text-blue-400 bg-slate-800' 
      : 'text-slate-300 hover:text-white hover:bg-slate-800/50';

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl flex-shrink-0 flex flex-col h-screen">
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-8 text-blue-400">Ventas CRM</h1>
        <nav className="space-y-2">
          <Link to="/" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/')}`}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/clientes" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/clientes')}`}>
            <Users size={20} /> Clientes
          </Link>
          <Link to="/usuarios" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/usuarios')}`}>
            <Users size={20} /> Usuarios
          </Link>
          <Link to="/configuracion" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/configuracion')}`}>
            <Settings size={20} /> Configuración
          </Link>
        </nav>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} /> 
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};