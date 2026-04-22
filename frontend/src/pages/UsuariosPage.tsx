import { useEffect, useState } from 'react';
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } from '../services/usuarioService';
import TablaUsuarios from '../components/usuarios/TablaUsuarios';
import { UsuarioForm } from '../components/usuarios/FormUsuario';
import { AlertTriangle } from 'lucide-react'; 

export const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const loadData = async () => setUsuarios(await getUsuarios());
  useEffect(() => { loadData(); }, []);

  // 1. Manejar Guardado y Edición
  const handleFormSubmit = async (data: any) => {
    try {
      const dataToSend = { ...data };

      // Limpieza de password si está vacío en edición
      if (!dataToSend.password || dataToSend.password.trim() === "") {
        delete dataToSend.password;
      }

      if (userToEdit) {
        await updateUsuario(userToEdit.id, dataToSend);
      } else {
        if (!dataToSend.password) {
          return alert("La contraseña es obligatoria para usuarios nuevos");
        }
        await createUsuario(dataToSend);
      }

      setIsModalOpen(false);
      setUserToEdit(null);
      loadData(); 
    } catch (error) {
      console.error("Error al procesar:", error);
      alert("Error al guardar. Revisá los datos.");
    }
  };

  // 2. LA FUNCIÓN QUE FALTABA: Confirmar eliminación
  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await deleteUsuario(userToDelete.id);
        setUserToDelete(null); // Cerramos el modal
        loadData(); // Recargamos la lista
      } catch (error) {
        console.error("Error al borrar:", error);
        alert("No se pudo eliminar el usuario. Probablemente tenga clientes asignados.");
      }
    }
  };

  return (
    <div className="p-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">Gestión de Usuarios</h1>
        <button 
          onClick={() => { setUserToEdit(null); setIsModalOpen(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-all active:scale-95"
        >
          + Agregar Usuario
        </button>
      </div>

      <TablaUsuarios 
        usuarios={usuarios} 
        onEdit={(u) => { setUserToEdit(u); setIsModalOpen(true); }} 
        onDelete={(id) => setUserToDelete(usuarios.find((u: any) => u.id === id))} 
      />

      {isModalOpen && (
        <UsuarioForm 
          onClose={() => { setIsModalOpen(false); setUserToEdit(null); }} 
          onSubmit={handleFormSubmit}
          usuarioToEdit={userToEdit}
        />
      )}

      {userToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">¿Estás segura?</h3>
            <p className="text-slate-500 mb-6">
              Vas a eliminar a <span className="font-semibold text-slate-700">{userToDelete.email}</span>. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setUserToDelete(null)} className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                Cancelar
              </button>
              {/* ACÁ YA NO DEBERÍA MARCAR ERROR */}
              <button onClick={confirmDelete} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors shadow-md shadow-red-200">
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};