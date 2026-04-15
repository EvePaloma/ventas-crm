import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Users } from 'lucide-react';
import { Sidebar } from './components/sidebar';
import { getClientes } from './services/clienteServices';
import type { Cliente } from './types/cliente';
import { ClientesTable } from './components/clientesTabla';

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
        setStatus('online');
      } catch (error) {
        setStatus('offline');
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 2. Usamos el componente como una etiqueta HTML */}
      <Sidebar />

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Panel de Control</h2>
            <p className="text-slate-500">Bienvenida de nuevo, Evelyn.</p>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border ${
            status === 'online' ? 'bg-green-50 text-green-700 border-green-200' : 
            status === 'offline' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'
          }`}>
            {status === 'online' ? <CheckCircle size={14} /> : <XCircle size={14} />}
            {status === 'online' ? 'BACKEND ONLINE' : status === 'offline' ? 'SIN CONEXIÓN' : 'CONECTANDO...'}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Clientes Totales</h3>
            <p className="text-3xl font-bold text-slate-800 mt-2">{clientes.length}</p>
          </div>
          {/* ... las otras tarjetas ... */}
        </div>

        {clientes.length > 0 ? (
          <ClientesTable data={clientes} />
        ) : (
          <div className="mt-8 bg-white p-12 rounded-xl border border-dashed border-slate-300 text-center text-slate-400">
            No hay clientes cargados aún.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;