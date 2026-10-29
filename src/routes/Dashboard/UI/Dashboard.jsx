import React, { useState, useMemo } from "react";
import { Outlet } from "react-router-dom"; // ¡La clave es el Outlet!
import { useSelector } from "react-redux";

import { CustomBreadcrumbs } from "./CustomBreadcrumbs";
import { Header } from "./Header";

import { generatedDashboardRoutes, transformRoutes } from "../route-config";
import { Navbar } from "../../../ui/components/Navbar";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { routes = [] } = useSelector((state) => state.auth);

  // Transformar rutas para que Navbar las pueda usar (necesita path relativo)
  const menuRoutes = useMemo(() => transformRoutes(routes).filter((route) => route.label), [routes]);

  console.log(menuRoutes);
  

  return (
    <div className="d-flex container-fluid p-0">
      {/* El Navbar ahora recibe las rutas procesadas */}
      <Navbar routes={menuRoutes} open={open} setOpen={setOpen} />
      <main className="main-content" style={{ padding: 0 }}>
        <Header />
        <div className="p-4 bg-dashboard-content">
          {/* <CustomBreadcrumbs /> */}
          {/* Aquí es donde React Router renderizará el componente de la ruta hija activa */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};
