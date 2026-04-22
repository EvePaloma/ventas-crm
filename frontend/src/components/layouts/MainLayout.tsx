import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../common/sidebar'; 

// 1. Definimos que el Layout puede recibir "hijos" (children)
interface MainLayoutProps {
  children?: ReactNode; // El "?" significa que es opcional
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* 2. Si le pasamos hijos, los muestra. Si no, usa el Outlet del Router */}
        {children || <Outlet />} 
      </main>
    </div>
  );
};