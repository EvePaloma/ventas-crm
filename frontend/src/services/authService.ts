import api from '../api/api'; 

export const login = async (email: string, password: string) => {
  
  const response = await api.post('/auth/login', { email, password });
  
  const { token, usuario } = response.data;

  if (token) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
  }
  
  return response.data;
};

export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('usuario');
  
  window.location.href = '/'; 
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const getUsuario = () => {
  const user = sessionStorage.getItem('usuario');
  return user ? JSON.parse(user) : null;
};