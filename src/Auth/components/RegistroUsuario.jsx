import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { FaEyeSlash } from '../../assets/img/icons/FaEyeSlash';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { FaEye } from '../../assets/img/icons/FaEye';

export const RegistroUsuario = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    let formData = {
        email: "proyectosdgi@ibero.mx",
        name: "Pastizeto Muñoz",
        password: "Prueb@s01",
        passwordConfirm: "Prueb@s01",
    };
    
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleOnSubmit = async (values) => {
    /*try {
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
    }*/
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("El correo electrónico es obligatorio")
      .email("Introduce un formato de correo válido (ejemplo@dominio.com)")
      .trim(), // Limpia espacios accidentales al inicio o final
    name: Yup.string().required("El nombre es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
    passwordConfirm: Yup.string()
      .required("La confirmación de contraseña es obligatoria")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
  });

  const requerido = "Este campo es requerido";

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
                                <label htmlFor="name" className="color-title">
                                    Nombre completo
                                </label>
                                <Field
                                    className={`form-control form-control-login mb-0 ${errors.name && touched.name ? "is-invalid" : ""}`}
                                    name="name"
                                    placeholder="Ej. taylor2003@gmail.com"
                                    required
                                />
                                <ErrorMessage
                                    name="name"
                                    component="span"
                                    className="error-text-login d-block text-start mt-1"
                                    role="alert"
                                />
                            </div>
                        </div>
                    </div>
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
                        <div className="col sm-12 col-md-12 mb-4">
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
                        <div className="col sm-12 col-md-12">
                            <label htmlFor="passwordConfirm" className="color-title">
                                Confirma tu contraseña
                            </label>
                            <div className="password-input-container">
                                <Field
                                    className={`form-control form-control-login mb-0 ${errors.passwordConfirm && touched.passwordConfirm ? "is-invalid" : ""}`}
                                    name="passwordConfirm"
                                    placeholder="Confirma tu contraseña"
                                    type={showPassword ? "text" : "password"}
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
                        <div className="content-btn -mrgnTop-1r mt-5">
                            <input className="ingresar-btn" type="submit" value="Registrarse" />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
