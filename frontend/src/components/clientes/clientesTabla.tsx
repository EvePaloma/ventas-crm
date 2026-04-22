import type { Cliente } from '../../types/cliente';

interface Props {
  data: Cliente[];
}

export const ClientesTable = ({ data }: Props) => {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Nombre</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Email</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Teléfono</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-600">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 text-sm text-slate-700 font-medium">{cliente.nombre}</td>
              <td className="px-6 py-4 text-sm text-slate-500">{cliente.email}</td>
              <td className="px-6 py-4 text-sm text-slate-500">{cliente.telefono || '---'}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cliente.estado === 'venta_cerrada' ? 'bg-green-100 text-green-700' :
                  cliente.estado === 'contactado' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {cliente.estado.replace('_', ' ')}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};