
import { useApiData } from '../../../hooks/useApiData';
import { useDispatch } from 'react-redux';

export const PiePagina = ({ isHomeBefore = false, data }) => {
    const dispatch = useDispatch();
    const { sendData, fetchData } = useApiData();


    const textoFecha = (fecha) => {
        
        if (fecha == null) return null;
        const mes = new Date(fecha).toLocaleDateString("es-MX", {
            //day: "numeric",
            month: "long",
            //year: "numeric",
        });

        return fecha ? mes.charAt(0).toUpperCase() + mes.slice(1) + ' ' + fecha.split('-')[2] +', ' + fecha.split('-')[0]: null;
    };

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
        <div className='w-100 p-4 pt-5 pb-5' style={{ backgroundColor: '#212735' }}>
            <div className="container">

           
            <div className='d-flex justify-content-start align-items-center'>
                <img src={data?.urlLogotipo} alt="" style={{ width: '38px' }} />
                <div className='ps-3 pt-3'>
                    <span className='span-pie-inter'>INTERSUJ {data?.anio}</span><br />
                    <span className='span-pie-edicion'>{data?.textoEdicionIntersuj}</span>
                </div>
            </div>
            <div className='pt-3 span-pie-info'>
                {data?.textoCountsInformativos}
            </div>
            {
                !isHomeBefore && ( <div className='pt-4'>
                <span className='nav-pie'>NAVEGACIÓN</span>
                <ul className='pie-ul'>
                    <li className='pt-2' onClick={handleScrollToAgenda}>
                        Agenda
                    </li>
                    <li className='pt-2' onClick={handleScrollToMedallero}>
                        Medallero
                    </li>
                    <li className='pt-2' onClick={handleScrollToResultados}>
                        Resultados
                    </li>
                </ul>
            </div>)

            }
           
            <div className='pt-3 mb-5'>
                <span className='span-pie-info'>INFORMACIÓN DEL EVENTO</span><br />
                <span className='pie-info'>{textoFecha(data?.fechaInicio)}</span><br />
                <span className='pie-info'>México Ciudad de México</span>
            </div>
             </div>
        </div>
    )
}
