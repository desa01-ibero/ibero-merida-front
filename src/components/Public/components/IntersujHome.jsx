import { useState, useEffect, useCallback } from "react";
import "./IntersujHome.css";
 
const IntersujHome = ({ setActualizarDatos , data, loadInfoHome}) => {
 
   const pad = (n) => String(n).padStart(2, "0");
 
   useEffect(() => {
      const proximaHora = data?.proximaCompetenciaHoy;
 
        // Si no hay datos, viene en null o es "00:00:00", reintentamos en 3 minutos
        if (!proximaHora || proximaHora === "00:00:00") {
            const retryTimer = setTimeout(() => {
                loadInfoHome();
            }, 3 * 60 * 1000); // 3 minutos
 
            return () => clearTimeout(retryTimer);
        }
   }, [data])
   
 
    // --- Menu Toggle State ---
    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
    // --- Countdown State ---
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
 
    const calculateCountdown = useCallback((targetTimestamp) => {
        if (!targetTimestamp) return { hours: 0, minutes: 0, seconds: 0 };
 
        const diff = targetTimestamp - Date.now();
 
        if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
 
        return {
            hours: Math.floor(diff / (1000 * 60 * 60)),
            minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((diff % (1000 * 60)) / 1000),
        };
    }, []);
 
 
    useEffect(() => {
        if (data && data?.proximaCompetenciaHoy) {
            const timeStr = data?.proximaCompetenciaHoy; // Ejemplo: "01:19:51"
            if (!timeStr) return;
            // Convertimos la duración "HH:MM:SS" a milisegundos y se los sumamos al momento actual
            const [h, m, s] = timeStr.split(":").map(Number);
            const durationMs = ((h || 0) * 3600 + (m || 0) * 60 + (s || 0)) * 1000;
 
            if (durationMs <= 0) return;
 
            const targetTimestamp = Date.now() + durationMs;
 
            // Primera actualización inmediata
            setCountdown(calculateCountdown(targetTimestamp));
 
            // Descuento en tiempo real cada segundo
            const interval = setInterval(() => {
                const remaining = calculateCountdown(targetTimestamp);
                setCountdown(remaining);
 
                if (remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
                    clearInterval(interval);
                    setTimeout(() => {
                        loadInfoHome();
                        setActualizarDatos(true);
                    }, 2000);
                }
            }, 1000);
 
            return () => clearInterval(interval);
        }
    }, [data, calculateCountdown, loadInfoHome]);
 
    const handleScrollToAgenda = () => {
        const agendaElement = document.getElementById("agenda-de-hoy");
        if (agendaElement) {
            agendaElement.scrollIntoView({ behavior: "smooth" });
        }
    };
 
    const handleScrollToMedallero = () => {
        const medalleroElement = document.getElementById("medallero");
        if (medalleroElement) {
            medalleroElement.scrollIntoView({ behavior: "smooth" });
        }
    };
 
    const handleScrollToResultados = () => {
        const resultadosElement = document.getElementById("centro-de-resultados");
        if (resultadosElement) {
            resultadosElement.scrollIntoView({ behavior: "smooth" });
        }
    };
 
    return (
        <div className="intersuj-hero">
            {/* Background */}
            <div className="intersuj-hero__bg" />
 
            {/* Navbar */}
            <nav className="intersuj-hero__navbar navbar-dark px-3 px-md-5 py-3 d-flex flex-wrap align-items-center justify-content-between">
                {/* Logo Brand */}
                <a className="navbar-brand d-flex align-items-center gap-2 m-0" href="#home">
                    <img className="intersuj-logo" src={data?.urlLogotipo} alt="Sin logo" />
                    <div className="d-flex flex-column lh-sm">
                        <span className="fw-bold text-white text-uppercase" style={{ letterSpacing: "0.1em", fontSize: '20px' }}>INTERSUJ</span>
                        <span className="text-white-50 small" style={{ fontSize: "14px" }}>EDICIÓN • {data?.anio} </span>
                    </div>
                </a>
 
                {/* Botón Hamburguesa para Mobile
                <button
                    className="navbar-toggler border-0 shadow-none p-1 d-lg-none"
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                    style={{ width: '2rem' }}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
  */}
                {/* Menú Colapsable */}
                {/* <div className={`collapse navbar-collapse justify-content-end mt-3 mt-lg-0 ${isMenuOpen ? "show" : ""} d-lg-flex`} id="navbarIntersuj">
                    <ul className="navbar-nav gap-2 gap-lg-4 text-center flex-row flex-wrap justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link text-white fw-semibold" href="#inicio">Inicio</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white-50" href="#calendario">Calendario</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white-50" href="#medallero">Medallero</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white-50" href="#resultados">Resultados</a>
                        </li>
                    </ul>
                </div>*/}
            </nav>
 
            <div className="intersuj-hero__content px-4 container">
 
                {/* LIVE Badge */}
                <div className="intersuj-hero__live-bar">
                    {data?.competenciasActivas > 0 && <><span className="intersuj-hero__live-badge">
                        <span className="intersuj-hero__live-dot" />
                        LIVE
                    </span>
                    <span className="intersuj-hero__live-text">
                        {data?.competenciasActivas} {data?.competenciasActivas > 1 ? 'competencias' : 'competencia'} sucediendo ahora
                    </span></>}
                </div>
 
                {/* Hero Title */}
                <p className="intersuj-hero__subtitle mb-1">
                    {data?.textoEdicionIntersuj}
                </p>
                <h1 className="intersuj-hero__title">
                    INTER<span className="intersuj-hero__title--accent">SUJ</span>
                </h1>
                <p className="intersuj-hero__year">{data?.anio} </p>
 
                {/* Description */}
                <p className="intersuj-hero__description">
                    {data?.textoCountsInformativos}
                </p>
 
                {/* Countdown */}
                <p className="intersuj-hero__countdown-label">
                    Próxima competencia de hoy en
                </p>
 
                {
                    data?.proximaCompetenciaHoy != null ? (
                        <div className="intersuj-hero__countdown">
                            <div className="intersuj-hero__countdown-item">
                                <span className="intersuj-hero__countdown-value">
                                    {pad(countdown.hours)}
                                </span>
                                <span className="intersuj-hero__countdown-unit">H</span>
                            </div>
                            <div className="intersuj-hero__countdown-item">
                                <span className="intersuj-hero__countdown-value">
                                    {pad(countdown.minutes)}
                                </span>
                                <span className="intersuj-hero__countdown-unit">M</span>
                            </div>
                            <div className="intersuj-hero__countdown-item">
                                <span className="intersuj-hero__countdown-value">
                                    {pad(countdown.seconds)}
                                </span>
                                <span className="intersuj-hero__countdown-unit">S</span>
                            </div>
                        </div>
                    ) : <p className="mb-3 intersuj-hero__countdown-label">Sin competencias programadas por hoy</p>
                }
 
 
                {/* Action Buttons */}
                <div className="intersuj-hero__actions">
                    <button type="button" className="intersuj-hero__btn" onClick={handleScrollToAgenda}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
                        </svg>
                        Calendario
                    </button>
                    <button type="button" className="intersuj-hero__btn" onClick={handleScrollToMedallero}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7.13l.97 2.29.47 1.11 1.2.1 2.47.21-1.88 1.63-.91.79.27 1.18.56 2.41-2.12-1.28L12 14.91l-1.03.65-2.12 1.28.56-2.41.27-1.18-.91-.79-1.88-1.63 2.47-.21 1.2-.1.47-1.11L12 7.13M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" />
                        </svg>
                        Medallero
                    </button>
                    <button type="button" className="intersuj-hero__btn" onClick={handleScrollToResultados}>
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                        </svg>
                        Resultados
                    </button>
                </div>
            </div>
        </div>
    );
};
 
export default IntersujHome;