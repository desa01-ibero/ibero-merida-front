import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, startLogout } from "../../Auth/store";
import { IconIbero } from "./Icons/IconIbero";
import {
  clearLocalStorage,
  LocalStorageKeys,
} from "../../utilities/localStorage.utility";
import "../css/Navbar.css";
import logo from "../../assets/svg/Group13.svg";
import logoutIcon from "../../assets/svg/logout.svg";
import { startLoadingUniversityData } from "../../routes/Dashboard/UI/store/universityData_thunk";
import { useApiData } from "../../hooks/useApiData";
import { setLogoEvento } from "../../routes/Dashboard/UI/store/universityData_slice";

export const Navbar = ({ routes, open, setOpen }) => {
  const { profile, isAuthenticated } = useSelector((state) => state.auth);
  const { urlLogoEvento } = useSelector((state) => state.university);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { fetchData } = useApiData();

  const handleLogOut = () => {
    dispatch(startLogout());
  };

  return (
    <>
      {/* Botón hamburguesa móvil */}
      <button
        className="hamburger-btn d-md-none"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <nav
        className={`sidebar ${open ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
      >

        {/* Perfil usuario */}
        <div className="w-100 d-flex justify-content-center">
          <div className="text-center mt-4 container-logo">
            {!collapsed && (
              <img
                src={urlLogoEvento || logo}
                style={{height: '100%'}}
              />
            )}
          </div>
        </div>
        

        {/* Menú */}
        <br></br>
        <ul className="nav flex-column mt-3">
          {routes?.map((subRoute) => {
            const isFirstUnivOption = subRoute.label === "Tablas de resultados";

            return (
              <React.Fragment key={subRoute.label}>
            
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/${subRoute.path}`}
                    end
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center gap-2 ${isActive ? "active fw-semibold " : "text-menu"}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {subRoute.icono ? (
                      <img
                        className="nav-icon-dynamic"
                        src={
                          new URL(
                            `../../assets/svg/${subRoute.icono}.svg`,
                            import.meta.url,
                          ).href
                        }
                        alt=""
                      />
                    ) : (
                      <IconIbero icon={"ArrowRight"} />
                    )}

                    {!collapsed && <span>{subRoute.label}</span>}
                  </NavLink>
                </li>
              </React.Fragment>
            );
          })}
        </ul>

        {/* Logout */}
        <div
          className="d-flex align-items-center gap-2 p-3 mt-auto cursor-pointer border-top-green"
          onClick={handleLogOut}
        >
          <img style={{ color: '#FFF' }} src={logoutIcon} alt="" />
          {!collapsed && <span className="logout-text">Cerrar sesión</span>}
        </div>
      </nav>

      {/* Overlay móvil */}
      <div
        className={`overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />
    </>
  );
};
