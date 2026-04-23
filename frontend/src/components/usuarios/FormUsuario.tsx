import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { UsuarioListado, UsuarioFormData } from '../../types/usuario';

interface Props {
  onClose: () => void;
  onSubmit: (data: UsuarioFormData) => void;
  usuarioToEdit?: UsuarioListado;
}

export const UsuarioForm = ({ onClose, onSubmit, usuarioToEdit }: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '', // En edición puede quedar vacío
    rolId: 2
  });

  // Si hay usuario para editar, cargamos sus datos al abrir
  useEffect(() => {
    if (usuarioToEdit) {
      setFormData({
        email: usuarioToEdit.email,
        password: '', // Por seguridad no traemos la pass vieja
        rolId: usuarioToEdit.rol?.id || 2
      });
    }
  }, [usuarioToEdit]);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-bold text-slate-800">
            {usuarioToEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input 
              required type="email" value={formData.email}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              {usuarioToEdit ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
            </label>
            <input 
              type="password" value={formData.password}
              placeholder={usuarioToEdit ? 'Dejar en blanco para no cambiar' : 'Mínimo 6 caracteres'}
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Rol</label>
            <select 
              className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white transition-all"
              value={formData.rolId}
              onChange={(e) => setFormData({...formData, rolId: Number(e.target.value)})}
            >
              <option value={2}>Vendedor</option>
              <option value={1}>Administrador</option>
            </select>
          </div>

          <div className="pt-6 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-semibold transition-colors">
              Cancelar
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold shadow-md shadow-indigo-200 transition-all active:scale-95">
              {usuarioToEdit ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};