import { Pencil, Trash2 } from 'lucide-react';
import type { UsuarioListado } from '../../types/usuario';

interface Props {
  usuarios: UsuarioListado[];
  onEdit: (usuario: UsuarioListado) => void;
  onDelete: (id: number) => void;
}

const TablaUsuarios = ({ usuarios, onEdit, onDelete }: Props) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50/50">
          <tr className="text-left text-xs uppercase font-bold text-slate-500 tracking-wider">
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Rol</th>
            <th className="px-6 py-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {usuarios.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                {u.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  u.rol?.nombre === 'admin' 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {u.rol?.nombre || 'Sin Rol'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                <div className="flex justify-center gap-2">
                  {/* Botón Editar */}
                  <button 
                    onClick={() => onEdit(u)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Editar usuario"
                  >
                    <Pencil size={18} />
                  </button>
                  
                  {/* Botón Eliminar */}
                  <button 
                    onClick={() => onDelete(u.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Eliminar usuario"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;