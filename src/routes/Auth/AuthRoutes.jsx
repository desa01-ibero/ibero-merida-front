import { Navigate, Route, Routes } from 'react-router-dom'
import { Authpage } from '../../Auth/pages/Authpage'
import { AuthLayout } from './UI/AuthLayout';
import { ChangePasswordPage } from '../../Auth/pages/ChangePasswordPage';
import { RecuperarPassword } from '../../Auth/components/RecuperarPassword';
import { RegistroUsuario } from '../../Auth/components/RegistroUsuario';


export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        {/* Rutas anidadas que se renderizan dentro del Outlet de AuthLayout */}
        <Route path="login" element={<Authpage />} />
        {/* <Route path="register" element={<RegisterPage />} /> */}
        <Route path="cambio-password" element={<ChangePasswordPage />} />
        <Route path="recuperar-password" element={<RecuperarPassword />} />
        <Route path="registro-usuario" element={<RegistroUsuario />} />
        {/* <Route path="register" element={<RegisterPage />} /> */}
        
        {/* Cualquier otra ruta bajo /auth/ redirige a login */}
        <Route path="*" element={<Navigate to="/auth/login" replace/>} />
      </Route>
    </Routes>
  );
};