import { Outlet } from 'react-router-dom';
import { Sidebar } from '../common/sidebar'; 

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        <Outlet /> 
      </main>
    </div>
  );
};