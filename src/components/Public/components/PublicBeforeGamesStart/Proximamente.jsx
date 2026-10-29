
import { FaRegCalendarAlt, FaBolt, FaMedal, FaCamera, FaClone, FaTv } from 'react-icons/fa';
import './IntersujFeatures.css';
import { useSelector } from 'react-redux';

const featureItems = [
    {
        id: 1,
        title: 'Agenda Diaria',
        description: 'Horarios completos de todos los eventos por disciplina, sede y hora. Nunca te pierdas un enfrentamiento',
        Icon: FaRegCalendarAlt,
        styleType: 'calendar',
    },
    {
        id: 2,
        title: 'Resultados',
        description: 'Marcadores actualizados por cada evento deportivo',
        Icon: FaBolt,
        styleType: 'bolt',
    },
    {
        id: 3,
        title: 'Tabla de Medallas',
        description: 'Seguimiento del medallero por universidad ¿Cómo va la semana de competencias?',
        Icon: FaMedal,
        styleType: 'medal',
    },
    {
        id: 4,
        title: 'Fotografía del Evento',
        description: 'Galería de fotos, mejores momentos y capturas exclusivas de toda la jornada deportiva.',
        Icon: FaCamera,
        styleType: 'camera',
    },
    {
        id: 5,
        title: 'Tarjetas Compartibles',
        description: 'Genera y comparte tarjetas personalizadas con los resultados de tu universidad en redes sociales',
        Icon: FaClone,
        styleType: 'share',
    },
    {
        id: 6,
        title: 'Transmisión en Vivo',
        description: 'Stream oficial de los eventos principales. Vívelo desde cualquier lugar, en cualquier pantalla',
        Icon: FaTv,
        styleType: 'live',
    },];

const Proximamente = () => {

    const { fechaInicio, anio, urlLogotipo } = useSelector((state) => state.public);

    return (
        <section className="intersuj-features-section py-5 px-3">
            <div className="container" >

                {/* Encabezado */}
                <header className="text-center mb-4">
                    <p className="intersuj-badge-subtitle text-uppercase mb-2">
                        Próximamente
                    </p>
                    <h2 className="intersuj-main-title mb-3 mt-4">
                        VIVE EL EVENTO EN <span className="intersuj-gradient-text d-block">VIVO</span>
                    </h2>
                    <p className="intersuj-description mx-auto px-2">
                        Cuando el torneo arranque, esta plataforma se convierte en tu centro de comando para todo <br /> INTERSUJ {anio}.
                    </p>
                </header>

                {/* Lista de Tarjetas */}
                <div className="row g-3 g-md-4 mt-5">
                    {featureItems.map(({ id, title, description, Icon, styleType }) => (
                        <div key={id} className="col-12 col-md-6 col-lg-3">
                            <article className="intersuj-card p-4 border-0 d-flex flex-column align-items-start h-100">
                                <div
                                    className={`intersuj-icon-wrapper ${styleType} d-flex align-items-center justify-content-center mb-3`}
                                >
                                    <Icon size={24} />
                                </div>

                                <h3 className="intersuj-card-title mb-2">
                                    {title}
                                </h3>
                                <p className="intersuj-card-text mb-0">
                                    {description}
                                </p>
                            </article>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Proximamente;