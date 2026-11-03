import { useCallback, useEffect, useState } from 'react';
import '../styles/login.css'
import Registro from '../components/Registro';
import HeaderConvocatoria from '../../components/Public/components/HeaderConvocatoria';
import { useDispatch } from 'react-redux';
import { startLoginCookies } from '../store';
import { useNavigate } from 'react-router-dom';
import { RECAPTCHA_SITE_KEY } from '../../config';

export const Authpage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCrearCuenta = useCallback((data) => {
        console.log('Crear cuenta:', data);
       
    }
, []);
    const handleIniciarSesion = useCallback((data) => {

        const executeRecaptcha = async () => {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: "submit",
        });

        console.log(token);
        

        token != ""
          ? dispatch(startLoginCookies({
            emailOrUser: data.correo,
            password: data.password,
            recaptchaToken: token,
            navigate: navigate
        }))
          : "";
      };

      executeRecaptcha();
       
    }
, [dispatch, navigate]);
    

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
 
