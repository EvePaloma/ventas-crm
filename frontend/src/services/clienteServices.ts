import api from '../api/api';
import type { Cliente } from '../types/cliente';

export const getClientes = async (): Promise<Cliente[]> => {
  const response = await api.get<Cliente[]>('/clientes');
  return response.data;
};
