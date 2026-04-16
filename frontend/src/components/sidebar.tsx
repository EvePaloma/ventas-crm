import { Users, LayoutDashboard, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation(); 

  const isActive = (path: string) => location.pathname === path ? 'text-blue-400 bg-slate-800' : 'text-slate-300 hover:text-white';

  return (
    <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl flex-shrink-0">
      <h1 className="text-xl font-bold mb-8 text-blue-400">Ventas CRM</h1>
      <nav className="space-y-2">
        <Link to="/" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/')}`}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link to="/clientes" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/clientes')}`}>
          <Users size={20} /> Clientes
        </Link>
        <Link to="/configuracion" className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive('/configuracion')}`}>
          <Settings size={20} /> Configuración
        </Link>
      </nav>
    </aside>
  );
};