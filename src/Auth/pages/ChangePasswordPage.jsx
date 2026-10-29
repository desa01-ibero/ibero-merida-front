import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import ibero_login from "../../assets/img/ibero_login.png";
import { ChangePassAdmin } from '../components/ChangePassAdmin';
import { useSearchParams } from "react-router-dom";
import { validarCambioPassword } from '../store';
import { SnackbarUtilities } from '../../utilities/snackbar-manager';

export const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({
    value: 410,
    label: "Administrador",
  });
  const [backgroundImage, setBackgroundImage] = useState(ibero_login);
  const [validacion, setValidacion] = useState(false);
  const [searchParams] = useSearchParams();
  const [cuenta, setCuenta] = useState(null);
  const [ticket, setTicket] = useState("");

  useEffect(() => {
    const ticketParam = searchParams.get("ticket");
    if(ticketParam){
      
      dispatch(validarCambioPassword(ticketParam))
              .unwrap() 
              .then((resp) => {
                if(resp.success){
                  setValidacion(true);
                  setCuenta(resp.data.idCuentaUsuario);
                  setTicket(ticketParam);
                }
              })
              .catch((err) => {
                SnackbarUtilities.error("Error al procesar la solicitud");
              });
    }else{
      setCuenta(null);
      setTicket("");
      setValidacion(false);
    }
  }, [searchParams]);


  return (
  <div className="login-wrapper d-flex align-items-center justify-content-center">
  <div className="container">
    <div className="row align-items-center justify-content-center">
      <div className="col-lg-6 d-flex justify-content-center mb-5 mb-lg-0">
        {validacion ? 
          <div className="glass-card p-5 text-center">
            <p className="font-sub">Configura tu nueva contraseña</p>
            <p className="font-pass">Recuerda que debe contener mínimo:
            </p>
            <div className='d-flex justify-content-center'>
              <p className='font-pass'>
                  <label className='mt-1'>• 8 caracteres</label>
                  <label className='mt-2'>• 1 letra mayúscula</label>
                  <label className='mt-2'>• 1 número</label>
                  <label className='mt-2'>• 1 caracter especial</label>
              </p>
            </div>
            
            <ChangePassAdmin dataTicket={ {idCuenta: cuenta, ticket: ticket } } />
          </div>:
          <div className="glass-card p-5 d-flex justify-content-center align-items-center text-center">
            <p className='font-enlace-expirado'>
              <strong>Tu enlace ha expirado. </strong>Solicita uno nuevo para continuar.<br/><br/>
              Recuerda que los enlaces de acceso tienen <strong>una vigencia de 72 horas.</strong>
            </p>
          </div>
        }
      </div>

      
    </div>
  </div>
</div>
  );
};

