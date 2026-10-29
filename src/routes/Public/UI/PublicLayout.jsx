import { Outlet } from "react-router-dom";

// layout para páginas de autenticación
export const PublicLayout = () => {
  return (
  
      <main>
        {/* Aquí se renderizarán las páginas de login, registro, etc. */}
        <Outlet /> 
      </main>
    
  );
};