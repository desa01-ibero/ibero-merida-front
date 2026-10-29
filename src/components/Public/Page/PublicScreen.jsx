import { useCallback, useEffect, useState } from 'react';
import '../css/publicPage.css'
import PublicScreenBeforeGamesStart from './PublicScreenBeforeGamesStart';

const PublicScreen = () => {

    const [data, setData] = useState(null);


    const [overrideIniciado, setOverrideIniciado] = useState(false);



    const targetDate = "2024-09-20T00:00:00"; // Fecha y hora del evento (20 de septiembre de 2024 a las 00:00)

    // Si aún no ha llegado fechaInicio, eventoIniciado es false
    const eventoIniciado = overrideIniciado || (targetDate ? new Date() >= targetDate : false);

    return <PublicScreenBeforeGamesStart fechaEvento={targetDate} onFinalizado={() => setOverrideIniciado(true)} data={data}/>;
   

 
}

export default PublicScreen
