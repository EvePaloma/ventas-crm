import api from '../api/api';
import type { Cliente } from '../types/cliente';

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>('/clientes');
  return response.data;
};

export const createCliente = async (cliente: Omit<Cliente, 'id'>) => {
  try {
    const response = await api.post('/clientes', cliente);
    return response.data;
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    throw error;
  }
};