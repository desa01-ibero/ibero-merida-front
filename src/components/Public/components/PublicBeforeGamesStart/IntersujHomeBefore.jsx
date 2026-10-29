import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./IntersujHomeBefore.css";
const IntersujHomeBefore = ({ onFinalizado }) => {
    // Redux state
    const { fechaInicio, anio, urlLogotipo } = useSelector((state) => state.public);
    const rawFecha = fechaInicio;

    const [tiempoRestante, setTiempoRestante] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

    useEffect(() => {
        if (!rawFecha) return;

        // Convierte fecha (string, timestamp o Date) a un objeto Date válido
        const parseTargetDate = (fecha) => {
            if (!fecha) return null;
            if (fecha instanceof Date) return fecha;
            if (typeof fecha === 'number') return new Date(fecha);
            if (typeof fecha === 'string') {
                const dateStr = fecha.includes('T') ? fecha : fecha.replace(/-/g, '/');
                const parsed = new Date(dateStr);
                return isNaN(parsed.getTime()) ? null : parsed;
            }
            return null;
        };

        const targetDate = parseTargetDate(rawFecha);
        if (!targetDate) return;

        const calcularTiempo = () => {
            const ahora = new Date();
            const diferencia = targetDate.getTime() - ahora.getTime();

            if (diferencia <= 0) {
                setTiempoRestante({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
                if (typeof onFinalizado === 'function') {
                    onFinalizado();
                }
                return;
            }

            setTiempoRestante({
                dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
                horas: Math.floor((diferencia / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((diferencia / 1000 / 60) % 60),
                segundos: Math.floor((diferencia / 1000) % 60)
            });
        };

        calcularTiempo();
        const intervalo = setInterval(calcularTiempo, 1000);

        return () => clearInterval(intervalo);
    }, [rawFecha, onFinalizado]);

    const pad = (n) => String(n).padStart(2, "0");

    const fechaFormateada =fechaInicio;

    return (
        <div className="intersuj-before__bg">
            <nav className="intersuj-hero__navbar navbar-dark px-3 px-md-5 py-3 d-flex flex-wrap align-items-center justify-content-between position-absolute top-0 start-0 w-100 z-3">
                {/* Logo Brand */}
                <a className="navbar-brand d-flex align-items-center gap-2 m-0" href="#home">
                    <img className="intersuj-logo" src={urlLogotipo} alt="Sin logo" />
                    <div className="d-flex flex-column lh-sm">
                        <span className="fw-bold text-white text-uppercase" style={{ letterSpacing: "0.1em", fontSize: '20px' }}>INTERSUJ</span>
                        <span className="text-white-50 small" style={{ fontSize: "14px" }}>EDICIÓN • {anio} </span>
                    </div>
                </a>
            </nav>
            <div className="intersuj-before__content container text-center d-flex flex-column align-items-center justify-content-center">
                
                {/* Pill / Badge Superior */}
                <div className="intersuj-before__tag px-3 py-1 rounded-pill mb-4 d-inline-flex align-items-center gap-2">
                    <span className="intersuj-before__dot"></span>
                    <span>{fechaFormateada} {anio }</span>
                </div>

                {/* Título Principal */}
                <h1 className="intersuj-before__title">
                    <span className="intersuj-before__title--solid">INTER</span>
                    <span className="intersuj-before__title--outline">SUJ</span>
                </h1>
                <div className="intersuj-before__year mb-4 mt-3">
                    {anio }
                </div>

                {/* Texto Descriptivo */}
                <p className="intersuj-before__description mb-5">
                    La pasión deportiva de nuestras universidades está por comenzar.
                    <br />
                    Próximamente podrás vivir el evento: resultados, agenda, fotografías y momentos destacados en un solo lugar.
                </p>

                {/* Sección Contador */}
                <div className="w-100">
                    <p className="intersuj-before__countdown-label mb-3 mt-3">
                        EL EVENTO COMIENZA EN
                    </p>

                    <div className="intersuj-before__countdown-grid">
                        {/* DÍAS */}
                        <div className="intersuj-before__countdown-card-wrapper">
                            <div className="intersuj-before__countdown-card d-flex align-items-center justify-content-center">
                                <span className="intersuj-before__countdown-value">{pad(tiempoRestante.dias)}</span>
                            </div>
                            <span className="intersuj-before__countdown-unit mt-2">DÍAS</span>
                        </div>

                        {/* HORAS */}
                        <div className="intersuj-before__countdown-card-wrapper">
                            <div className="intersuj-before__countdown-card d-flex align-items-center justify-content-center">
                                <span className="intersuj-before__countdown-value">{pad(tiempoRestante.horas)}</span>
                            </div>
                            <span className="intersuj-before__countdown-unit mt-2">HORAS</span>
                        </div>

                        {/* MINUTOS */}
                        <div className="intersuj-before__countdown-card-wrapper">
                            <div className="intersuj-before__countdown-card d-flex align-items-center justify-content-center">
                                <span className="intersuj-before__countdown-value">{pad(tiempoRestante.minutos)}</span>
                            </div>
                            <span className="intersuj-before__countdown-unit mt-2">MIN</span>
                        </div>

                        {/* SEGUNDOS */}
                        <div className="intersuj-before__countdown-card-wrapper">
                            <div className="intersuj-before__countdown-card d-flex align-items-center justify-content-center">
                                <span className="intersuj-before__countdown-value">{pad(tiempoRestante.segundos)}</span>
                            </div>
                            <span className="intersuj-before__countdown-unit mt-2">SEG</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IntersujHomeBefore;