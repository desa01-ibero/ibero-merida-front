import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import  imgLogo  from '../../../assets/img/logo-ibero-merida.png'

const links = [
  { label: 'Convocatoria', to: '/' },
  { label: 'Fechas', to: '/' },
  { label: 'Preguntas', to: '/' },
]

export const HeaderConvocatoria = () => {
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <header className="registro-header">
      <div className="container-fluid px-3 px-md-4">
        <div className="row align-items-center gy-2">
          {/* Marca */}
          <div className="col">
            <Link to="/" className="registro-brand">
              <img src={imgLogo} className="img-logo" alt="Logo Ibero Mérida" />
              <span className="registro-brand-text">
                Convocatoria
                <br />
                Ibero
                <br />
                Mérida
              </span>
            </Link>
          </div>

          {/* Botón de menú (solo móvil) */}
          <div className="col-auto d-md-none">
            <button
              type="button"
              className="btn registro-menu-toggle"
              aria-controls="registro-menu"
              aria-expanded={menuAbierto}
              aria-label="Abrir menú"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              {menuAbierto ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Navegación */}
          <nav
            id="registro-menu"
            className={`col-12 col-md-auto ${menuAbierto ? 'd-block' : 'd-none'} d-md-block`}
          >
            <ul className="list-unstyled d-flex flex-column flex-md-row align-items-md-center gap-2 gap-md-0 mb-0 pb-2 pb-md-0">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="registro-nav-link d-block">{label}</Link>
                </li>
              ))}
              <li className="ms-md-3">
                <Link to="/registro" className="btn btn-registro-header">Participar</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default HeaderConvocatoria
