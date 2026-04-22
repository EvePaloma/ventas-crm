import api from '../api/api';

export const getUsuarios = async () => {
  const { data } = await api.get('/usuarios');
  return data;
};

export const createUsuario = async (usuarioData: any) => {
  const { data } = await api.post('/usuarios', usuarioData);
  return data;
};

export const updateUsuario = async (id: number, usuarioData: any) => {
  const { data } = await api.patch(`/usuarios/${id}`, usuarioData);
  return data;
};

export const deleteUsuario = async (id: number) => {
  const { data } = await api.delete(`/usuarios/${id}`);
  return data;
};