import { Users, LayoutDashboard, Settings } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar de prueba */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-xl font-bold mb-8 text-blue-400">Ventas CRM</h1>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <Users size={20} /> Clientes
          </div>
          <div className="flex items-center gap-3 text-slate-300 hover:text-white cursor-pointer">
            <Settings size={20} /> Configuración
          </div>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800">Panel Principal</h2>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        </div>
      </main>
    </div>
  );
}

export default App;