import { Users, LayoutDashboard, Settings } from 'lucide-react';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white p-6 shadow-xl flex-shrink-0">
      <h1 className="text-xl font-bold mb-8 text-blue-400">Ventas CRM</h1>
      <nav className="space-y-4">
        <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer transition-colors">
          <LayoutDashboard size={20} /> Dashboard
        </div>
        <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer transition-colors">
          <Users size={20} /> Clientes
        </div>
        <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer transition-colors">
          <Settings size={20} /> Configuración
        </div>
      </nav>
    </aside>
  );
};