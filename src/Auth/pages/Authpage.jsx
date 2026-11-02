import { useCallback, useEffect, useState } from 'react';
import '../styles/login.css'
import Registro from '../components/Registro';
import HeaderConvocatoria from '../../components/Public/components/HeaderConvocatoria';

export const Authpage = () => {

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
               <Registro
                onCrearCuenta={handleCrearCuenta}
                onIniciarSesion={handleIniciarSesion}
              /> 
            </div>
    )
 
}
 
