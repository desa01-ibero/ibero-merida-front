import { useCallback, useEffect, useState } from 'react';
import '../css/registro.css'
import HeaderConvocatoria from '../components/HeaderConvocatoria';

const PublicScreen = () => {

    const handleCrearCuenta = useCallback((data) => {
        console.log('Crear cuenta:', data);
        // Aquí puedes agregar la lógica para manejar la creación de cuenta
    }
, []);
    const handleIniciarSesion = useCallback((data) => {
        console.log('Iniciar sesión:', data);
        // Aquí puedes agregar la lógica para manejar el inicio de sesión
    }
, []);
    

    return (
         <div className="registro-page">
              <HeaderConvocatoria />
            </div>
    )
 
}

export default PublicScreen
