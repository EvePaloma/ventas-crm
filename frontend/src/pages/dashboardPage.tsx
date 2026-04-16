import { useEffect, useState } from 'react';
import { Users, TrendingUp } from 'lucide-react';
import { getClientes } from '../services/clienteServices';

export const DashboardPage = () => {
  const [totalClientes, setTotalClientes] = useState(0);

  useEffect(() => {
    getClientes()
      .then(data => setTotalClientes(data.length))
      .catch(console.error);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Panel de Control</h2>
        <p className="text-slate-500">Bienvenida de nuevo. Esto es lo que está pasando hoy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Clientes Totales</h3>
            <p className="text-3xl font-bold text-slate-800">{totalClientes}</p>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
          <p className="text-sm italic">Próximamente: Métricas de Ventas</p>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
          <p className="text-sm italic">Próximamente: Tareas Pendientes</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[200px]">
        <TrendingUp size={40} className="text-slate-200 mb-4" />
        <p className="text-slate-500 font-medium">Análisis de Crecimiento</p>
        <p className="text-slate-400 text-sm">Los gráficos aparecerán cuando tengamos más datos históricos.</p>
      </div>
    </div>
  );
};