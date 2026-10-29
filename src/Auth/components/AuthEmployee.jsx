import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { RECAPTCHA_SITE_KEY } from "../../config";
import "../styles/styles_login.css";
import { useNavigate, Link } from "react-router-dom";
import { FaEyeSlash } from "../../assets/img/icons/FaEyeSlash";
import { FaEye } from "../../assets/img/icons/FaEye";
import { startLoginDITCookies } from "../store";
export const AuthEmployee = () => {
  // const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  let formData = {
    email: "proyectosdgi@ibero.mx",
    password: "Prueb@s01",
  };

  ///Si es produccion, quita el usuario pruebas
  if (
    window.location.href.includes("https://juegosintersuj.com/") ||
    window.location.href.includes("https://juegosintersujpru.ibero.mx/") ||
    window.location.href.includes("https://juegosintersujdes.ibero.mx/")
  ) {
    formData = {
      email: "",
      password: "",
    };
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = async (values) => {
    try {
      const executeRecaptcha = async () => {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: "submit",
        });
        const { email, password } = values;
        // setToken(token); // Aquí puedes usar el token como desees
        token != ""
          ? dispatch(startLoginDITCookies({emailOrUser: email,password:  password, recaptchaToken: token, navigate}))
          : "";
      };

      executeRecaptcha();
    } catch (err) {
      console.log(err);
      // setToken("");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("El correo electrónico es obligatorio")
      .email("Introduce un formato de correo válido (ejemplo@dominio.com)")
      .trim(), // Limpia espacios accidentales al inicio o final
    password: Yup.string().required("La contraseña es obligatoria"),
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
          <div className="row">
            <div className="col sm-12 col-md-12 mb-4">
              <div className="form-group">
                <label htmlFor="email" className="color-title">
                  Correo electrónico
                </label>
                <Field
                  className={`form-control form-control-login mb-0 ${errors.email && touched.email ? "is-invalid" : ""}`}
                  name="email"
                  placeholder="Ej. taylor2003@gmail.com"
                  required
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error-text-login d-block text-start mt-1"
                  role="alert"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col sm-12 col-md-12">
              <label htmlFor="password" className="color-title">
                Escribe tu contraseña
              </label>
              <div className="password-input-container">
                <Field
                  className={`form-control form-control-login mb-0 ${errors.password && touched.password ? "is-invalid" : ""}`}
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"} // Cambiar tipo según el estado
                  required
                />
                <span
                  className="password-toggle"
                  onClick={togglePassword}
                  role="button"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                    // Icono de ojo abierto
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

          <div className="row">
            <div className="content-btn -mrgnTop-1r mt-5">
              <input className="ingresar-btn" type="submit" value="Iniciar sesión" />
              <Link 
                to="/auth/registro-usuario" 
                style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: '#4d5261', textDecoration: 'none', fontFamily: 'Oxygen', fontSize: '14px' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                Registrarse
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
