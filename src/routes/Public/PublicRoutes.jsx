import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicLayout } from './UI/PublicLayout'
import PublicScreen from '../../components/Public/Page/PublicScreen'

const PublicRoutes = () => {
  return (
     <Routes>
      <Route path="/" element={<PublicLayout />}>
        {/* Rutas anidadas que se renderizan dentro del Outlet de AuthLayout */}
        <Route path="" element={<PublicScreen />} />        
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Route>
    </Routes>
  )
}

export default PublicRoutes
