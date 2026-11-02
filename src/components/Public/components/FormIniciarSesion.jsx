import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FiArrowUpRight } from 'react-icons/fi'

const validationSchema = Yup.object({
  correo: Yup.string().trim().email('Ingresa un correo válido').required('El correo es requerido'),
  password: Yup.string().min(8, 'Mínimo 8 caracteres').required('La contraseña es requerida'),
})

export const FormIniciarSesion = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { correo: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    },
  })

  const hasError = (name) => formik.touched[name] && Boolean(formik.errors[name])

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="login-correo" className="form-label registro-label">Correo electrónico</label>
        <input
          id="login-correo"
          name="correo"
          type="email"
          placeholder="nombre@despacho.com"
          className={`form-control registro-input ${hasError('correo') ? 'is-invalid' : ''}`}
          value={formik.values.correo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {hasError('correo') && <div className="invalid-feedback">{formik.errors.correo}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="login-password" className="form-label registro-label">Contraseña</label>
        <input
          id="login-password"
          name="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          className={`form-control registro-input ${hasError('password') ? 'is-invalid' : ''}`}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {hasError('password') && <div className="invalid-feedback">{formik.errors.password}</div>}
      </div>

      <p className="registro-nota mb-3">
        La información de esta sección será visible únicamente para el equipo
        coordinador y nunca para el jurado
      </p>

      <button type="submit" className="btn btn-registro-submit w-100" disabled={formik.isSubmitting}>
        Entrar al portal <FiArrowUpRight className="ms-3" />
      </button>
    </form>
  )
}

export default FormIniciarSesion
