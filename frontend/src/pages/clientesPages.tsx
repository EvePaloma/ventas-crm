import { useEffect, useState } from 'react';
import { ClientesTable } from '../components/clientesTabla';
import { getClientes, createCliente } from '../services/clienteServices';
import type { Cliente } from '../types/cliente';
import { ClienteForm } from '../components/clienteForm';

export const ClientesPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Función para cargar los datos (la sacamos aparte para reusarla)
  const fetchClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  // 2. Carga inicial
  useEffect(() => {
    fetchClientes();
  }, []);

  // 3. Función para manejar el guardado
  const handleCreate = async (nuevoCliente: Omit<Cliente, 'id'>) => {
    try {
      await createCliente(nuevoCliente); // Enviamos al backend
      setIsModalOpen(false);             // Cerramos el modal
      await fetchClientes();             // Refrescamos la tabla con datos frescos
    } catch (error) {
      alert("No se pudo guardar el cliente. Revisá la consola.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Listado de Clientes</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Nuevo Cliente
        </button>
      </div>
      
      <ClientesTable data={clientes} />

      {isModalOpen && (
        <ClienteForm 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreate} // Conectamos la función de arriba
        />
      )}
    </div>
  );
};