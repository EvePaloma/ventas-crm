import { Navigate, Outlet } from 'react-router-dom';
import { getUsuario } from '../../services/authService';
import type { RolNombre } from '../../types/usuario';

interface Props {
  requiredRoles?: RolNombre[];
}

export const RutaProtegida = ({ requiredRoles }: Props) => {
  const token = sessionStorage.getItem('token');
  const usuario = getUsuario();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && usuario && !requiredRoles.includes(usuario.rol)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};