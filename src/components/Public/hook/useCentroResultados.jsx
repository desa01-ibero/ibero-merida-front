import { useCallback, useEffect, useState } from "react";
import { useApiData } from "../../../hooks/useApiData";


const useCentroResultados = ({ startDate, formatLocalDate }) => {

  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const { fetchData } = useApiData();


  const buscarEventos = useCallback(async (filtros) => {

    try {
      setLoading(true);

      const deportesSel = (filtros?.deportes && filtros.deportes.length > 0)
        ? filtros.deportes.map(item => Number(item.value ?? item.idCompetencia ?? item.id ?? item)).filter(n => !isNaN(n))
        : null;

      const fechaSel = filtros?.fecha ? filtros.fecha : startDate;

      const payload = {
        nombreAtleta: filtros?.atleta ? filtros.atleta : '',
        IdsCompetencia: deportesSel,
        fechaEvento: formatLocalDate(fechaSel)
      };

      const dataApi = await fetchData(
        `PublicPortal/CentroResultados`,
        payload,
        `Buscando Competencias...`
      );

      

      if (dataApi) {
        setEventos(Array.isArray(dataApi) ? dataApi : (dataApi?.agenda || []));
      }
    } catch (error) {
      console.error("Error loading events:", error);
      setEventos([]);
    } finally {
      setLoading(false);
    }

  }, [fetchData, startDate]);

  useEffect(() => {
    const initialValues = {
      deportes: [],
      atleta:'',
      fecha: startDate
    };
    buscarEventos(initialValues);
  }, [buscarEventos, startDate]);

  return {
    eventos,
    setEventos,
    buscarEventos, 
    loading
  }
}

export default useCentroResultados
