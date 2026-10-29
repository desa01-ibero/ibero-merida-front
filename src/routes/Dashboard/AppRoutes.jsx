import React, { Suspense, useEffect, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRouteGuard } from "./guard/ProtectedRouteGuard";
import { Dashboard } from "./UI/Dashboard";
import { NotFound } from "../../components/404/NotFound";
import { Home } from "../../components/General/pages";
import { Loading } from "../../helpers/Loading";
import { transformRoutes } from "./route-config";
import { startGetMenuRoutes } from "../../Auth/store/auth_thunk";

const AppRoutes = () => {
  const { routes, profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log("llegamos a approutes");
  console.log("profileId:", profileId);

  useEffect(() => {
    console.log("entramos a useEffectDE");
    
    if (profileId) {
      console.log("profileId encontrado, obteniendo rutas del menú");
      dispatch(startGetMenuRoutes(profileId));
    }
  }, [profileId, dispatch]);

  const dashboardRoutes = useMemo(() => transformRoutes(routes), [routes]);

  console.log(dashboardRoutes);
  

  return (
    // Suspense debe envolver las rutas que usan lazy loading
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* 1. Ruta de Layout Protegida */}
          <Route
            element={
              <ProtectedRouteGuard>
                <Dashboard />
              </ProtectedRouteGuard>
            }
          >
            {/* La ruta índice se renderiza dentro del Outlet del dashboard. */}
            <Route index element={<Home />} />

            {dashboardRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRouteGuard>
                    {route.element}
                  </ProtectedRouteGuard>
                }
              />
            ))}

            {/* Ruta catch-all para cualquier cosa no encontrada DENTRO de /dashboard */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* 3. Redirección por defecto si no se está en /dashboard o /auth */}
          {/* Esto puede ser una landing page o una redirección a login */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRoutes;
