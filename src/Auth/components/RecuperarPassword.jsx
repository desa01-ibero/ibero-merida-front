import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";
import { startForgotPassword } from "../store/auth_thunk";
import "../styles/loginIntersuj.css";

export const RecuperarPassword = () => {
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendEmail = () => {
    dispatch(startForgotPassword(email, () => {
      setIsSent(true);
      setCountdown(60);
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isSent && email) {
      handleSendEmail();
    } else if (isSent && countdown === 0) {
      handleSendEmail();
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          
          {/* Columna de la tarjeta (Lado izquierdo) */}
          <div className="col-lg-5 d-flex justify-content-center mb-5 mb-lg-0">
            <div className="glass-card p-5 text-center position-relative">
              
              {/* Flecha de regreso */}
              <Link 
                to="/auth/login" 
                style={{ position: 'absolute', top: '25px', left: '25px', color: '#1f263e' }}
              >
                <ArrowBackIcon />
              </Link>

              {/* Contenido Dinámico */}
              {!isSent ? (
                <>
                  <h1 className="font-h1 mt-3">Restablece tu <br/> contraseña</h1>
                  <p className="font-sub mt-4" style={{ fontSize: '16px', lineHeight: '1.4' }}>
                    Ingresa tu correo de acceso, en caso de ser válido te
                    enviaremos un mail para cambiar tu contraseña
                  </p>

                  <form onSubmit={handleSubmit} className="mt-5 text-start">
                    <label htmlFor="email" className="color-title ms-1">
                      Mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-login"
                      placeholder="Ej. mail@contacto.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    
                    <div className="text-center mt-5">
                      <button type="submit" className="ingresar-btn" style={{ width: '100%', maxWidth: '200px' }}>
                        Enviar
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h1 className="font-h1 mt-3">Correo enviado <br/> exitosamente</h1>
                  <p className="font-sub mt-4" style={{ fontSize: '16px', lineHeight: '1.4' }}>
                    En breve recibirás un mail con un link para realizar el
                    cambio de contraseña
                  </p>

                  <form onSubmit={handleSubmit} className="mt-5 text-start">
                    <label htmlFor="email_sent" className="color-title ms-1">
                      Mail
                    </label>
                    <input
                      type="email"
                      id="email_sent"
                      className="form-control form-control-login"
                      value={email}
                      readOnly
                      style={{ opacity: 0.8 }}
                    />
                    
                    <div className="text-center mt-4">
                      <button 
                        type="submit" 
                        className="ingresar-btn" 
                        style={{ width: '100%', maxWidth: '200px', opacity: countdown > 0 ? 0.5 : 1, cursor: countdown > 0 ? 'not-allowed' : 'pointer' }}
                        disabled={countdown > 0}
                      >
                        {countdown > 0 ? `Reenviar en ${countdown}s` : "Enviar de nuevo"}
                      </button>
                    </div>
                    
                    <div className="text-center mt-3">
                      <span style={{ fontSize: '13px', color: '#3c3b45', fontFamily: 'Oxygen' }}>
                        ¿El correo es correcto y aún no llega?
                      </span>
                    </div>
                  </form>
                </>
              )}

            </div>
          </div>

          {/* Columna del texto (Lado derecho) */}
          <div className="col-lg-6 offset-lg-1 text-center text-lg-start">
            <h2 className="display-1 fw-bolder brand-text font-intersuj">INTERSUJ</h2>
            <p className="brand-subtext fs-5">
            La plataforma donde universidades, deportistas y competencias se conectan para vivir la experiencia <strong>INTERSUJ.</strong>
          </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};
