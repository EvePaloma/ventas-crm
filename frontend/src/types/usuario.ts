export type RolNombre = 'admin' | 'vendedor';

export interface Rol {
  id: number;
  nombre: RolNombre;
}

export interface UsuarioListado {
  id: number;
  email: string;
  rol: Rol;
}

export interface UsuarioSesion {
  id: number;
  email: string;
  rol: RolNombre;
}

export interface AuthResponse {
  token: string;
  usuario: UsuarioSesion;
}

export interface UsuarioFormData {
  email: string;
  password?: string;
  rolId: number;
}