import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { RECAPTCHA_SITE_KEY } from "../../config";
import "../styles/styles_login.css";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "../../assets/img/icons/FaEyeSlash";
import { FaEye } from "../../assets/img/icons/FaEye";
import CloseEye from "../../assets/svg/closeEye.svg";
import OpenEye from "../../assets/svg/openEye.svg";
import { useApiData } from "../../hooks/useApiData";

export const ChangePassAdmin = ({ dataTicket }) => {

  const { fetchData, sendData } = useApiData();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  let formData = {
    password: "",
    passwordConfirm: "",
  };
  

  ///Si es produccion, quita el usuario pruebas
  if (
    window.location.href.includes("https://prestamoequipo.ibero.mx/") ||
    window.location.href.includes("https://prestamoequipodes.ibero.mx/") ||
    window.location.href.includes("https://prestamoequipopru.ibero.mx/")
  ) {
    formData = {
      password: "",
      passwordConfirm: "",
    };
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = async (values) => {
    try {
      
      const dataPass={
        idCuentaUsuario: dataTicket.idCuenta, 
        ticket: dataTicket.ticket, 
        newPassword: values.password
      }
      
      const response = await sendData(
            `Auth/change-password`,
            "post",
            dataPass,
            {},
            "Guardando cambios...",
            {
              title: "Contraseña creada exitosamente",
              message:
                "Ingresa al portal para comenzar",
              confirmText: "Ir al portal",
              onConfirm: () => navigate("/auth/login"),
            },
          );
          

    } catch (err) {
      console.log(err);
      // setToken("");
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('La contraseña es obligatoria')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
      .matches(/[0-9]/, 'Debe contener al menos un número')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Debe contener al menos un carácter especial'
      ),

    passwordConfirm: Yup.string()
      .required('La confirmación de la contraseña es obligatoria')
      .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
  });

  const requerido = "Este campo es requerido";

  // const [usuario, setUser] = useState(false);

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={formData}
      onSubmit={handleOnSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form noValidate>
          <div className="row mt-3">
            <div className="col sm-12 offset-md-2 col-md-8">
              <label htmlFor="password" className="color-title">
                Nueva contraseña
              </label>
              <div className="password-input-container">
                <Field
                  className={`form-control form-control-login mb-0 ${errors.password && touched.password ? 'is-invalid' : ''}`}
                  name="password"
                  placeholder=""
                  type={showPassword ? "text" : "password"} // Cambiar tipo según el estado
                  required
                />
                <span
                  className="password-toggle"
                  onClick={togglePassword}
                  role="button"
                >
                  {showPassword ? (
                    <img src={OpenEye} alt="" />
                  ) : (
                    <img src={CloseEye} alt="" />
                  )}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className="error-text-login d-block text-start mt-1"
                role="alert"
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col sm-12 offset-md-2 col-md-8">
              <label htmlFor="password" className="color-title">
                Confirma tu contraseña
              </label>
              <div className="password-input-container">
                <Field
                  className={`form-control form-control-login mb-0 ${errors.passwordConfirm && touched.passwordConfirm ? 'is-invalid' : ''}`}
                  name="passwordConfirm"
                  placeholder=""
                  type={showPassword ? "text" : "password"} // Cambiar tipo según el estado
                  required
                  onPaste={(e) => e.preventDefault()}
                />
                <span
                  className="password-toggle"
                  onClick={togglePassword}
                  role="button"
                >
                  {showPassword ? (
                    <img src={OpenEye} alt="" />
                  ) : (
                    <img src={CloseEye} alt="" />
                  )}
                </span>
              </div>
              <ErrorMessage
                name="passwordConfirm"
                component="span"
                className="error-text-login d-block text-start mt-1"
                role="alert"
              />
            </div>
          </div>

          <div className="row">
            <div className="content-btn -mrgnTop-1r mt-3 mb-5">
              <input className="ingresar-btn" type="submit" value="Guardar" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
