import { useEffect, useState } from 'react';
import { ClientesTable } from '../components/clientesTabla';
import { getClientes } from '../services/clienteServices';
import type { Cliente } from '../types/cliente';

export const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    getClientes().then(setClientes).catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Listado de Clientes</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          + Nuevo Cliente
        </button>
      </div>
      
      {/* El componente "mueble" vive adentro de la "habitación" */}
      <ClientesTable data={clientes} />
    </div>
  );
};