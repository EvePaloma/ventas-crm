export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  estado: 'nuevo' | 'contactado' | 'venta_cerrada' | 'inactivo';
}