import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthEmployee } from "../components";
import Select from "react-select";
import ibero_login from "../../assets/img/ibero_login.png";
import logoSuperior from "../../assets/img/logo_ibero_superior.png";
import { getProfilesApp } from "../functions/functions";
import "../styles/loginIntersuj.css";

import { AxiosData } from "../../services/AxiosConnexion";
import { TypeService } from "../../services/TypeService";
import { appIdConfig } from "../../config";

export const Authpage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState({
    value: 410,
    label: "Administrador",
  });
  const [options, setOptions] = useState([]);
  const { profilesApp } = useSelector((state) => state.auth);
  const [backgroundImage, setBackgroundImage] = useState(ibero_login);


  return (
  <div className="login-wrapper d-flex align-items-center justify-content-center">
  {/* Agregamos container para limitar el ancho máximo y centrar el contenido */}
  <div className="container">
    <div className="row align-items-center justify-content-center">
      
      {/* Columna de la tarjeta (Lado izquierdo en desktop) */}
      <div className="col-lg-5 d-flex justify-content-center mb-5 mb-lg-0">
        <div className="glass-card p-5 text-center">
          <h1 className="font-h1">¡Hola!</h1>
          <p className="font-sub">¿Comenzamos?</p>
          <AuthEmployee  />
        </div>
      </div>

      {/* Columna del texto (Lado derecho en desktop) */}
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
