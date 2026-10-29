import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormCrearCuenta } from './FormCrearCuenta'
import { FormIniciarSesion } from './FormIniciarSesion'

const tabs = [
  { key: 'crear', label: 'Crear cuenta' },
  { key: 'login', label: 'Iniciar sesión' },
]

export const Registro = ({ onCrearCuenta, onIniciarSesion }) => {
  const [tab, setTab] = useState('crear')

  return (
    <div className="container py-4 pb-5">
      <Link to="/" className="registro-back mb-4 mb-lg-5">
        <FiArrowLeft /> Volver a la convocatoria
      </Link>

      <div className="row gy-5 pt-lg-4">
        {/* Columna informativa */}
        <div className="col-12 col-lg-5 registro-intro">
          <p className="registro-eyebrow mb-2">Portal para participantes</p>
          <h1 className="registro-title mb-4">
            Comienza tu
            <br />
            postulación.
          </h1>
          <p className="mb-4">
            Crea tu cuenta para guardar tu avance y enviar tu postulación antes
            del 4 de diciembre de 2026
          </p>
          <p>
            Esta convocatoria está dirigida a personas egresadas de el Sistema
            Universitario Jesuita. Quien registre y presente la postulación en
            representación del despacho deberá cumplir con este requisito
          </p>
        </div>

        {/* Tarjeta de formulario */}
        <div className="col-12 col-md-10 col-lg-6 col-xl-5 offset-md-1 offset-lg-1 offset-xl-2">
          <div className="registro-card p-4 p-md-4 px-xl-5 py-xl-4">
            <div className="registro-tabs mb-4" role="tablist">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  className={`registro-tab ${tab === key ? 'is-active' : ''}`}
                  onClick={() => setTab(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === 'crear' ? (
              <FormCrearCuenta onSubmit={onCrearCuenta} />
            ) : (
              <FormIniciarSesion onSubmit={onIniciarSesion} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro
