import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useApiData } from '../../../hooks/useApiData';

export const useAgenda = () => {
  const [agendaList, setAgendaList] = useState([]);

  // Fechas y Redux
  const { fechaInicio, fechaFin } = useSelector((state) => state.public);

  const parseLocalDate = (dateStr) => {
    if (!dateStr) return null;
    if (dateStr instanceof Date) return dateStr;
    const cleanStr = String(dateStr).split('T')[0];
    const parts = cleanStr.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts.map(Number);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
      }
    }
    return new Date(dateStr);
  };

  const formatLocalDate = (d) => {
    if (!d || !(d instanceof Date) || isNaN(d.getTime())) return null;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const minDateParsed = fechaInicio ? parseLocalDate(fechaInicio) : null;
  const maxDateParsed = fechaFin ? parseLocalDate(fechaFin) : null;

  const [startDate, setStartDate] = useState(() => minDateParsed || new Date());
  const { fetchData } = useApiData();

  // Función para fechas permitidas entre fecha inicio y fecha fin 
  const isDateAllowed = (date) => {
    if (!minDateParsed || !maxDateParsed) return true;
    return date >= minDateParsed && date <= maxDateParsed;
  };

  // Helper de UI / Estado del Card
  const renderStatus = (estado) => {
    const state = estado?.toLowerCase() || '';
    switch (state) {
      case "live":
        return {
          cardBg: "bg-primary bg-opacity-25 border-0",
          dotColor: "#ff355e",
          badge: (
            <span className="intersuj-hero__live-badge">
              <span className="intersuj-hero__live-dot" />
              LIVE
            </span>
          ),
        };
      case "próximo":
        return {
          cardBg: "bg-white border-0 shadow-sm",
          dotColor: "#70e0d6",
          badge: <span className="intersuj-agenda__proximo">Próximo  </span>,
        };
      case "finalizado":
      default:
        return {
          cardBg: "bg-white border-0 shadow-sm",
          dotColor: "#d0d7de",
          badge: <span className="intersuj-agenda__finalizo">Finalizó</span>,
        };
    }
  };

  const mapOptions = (list, idKey, labelKey) => {
    if (!Array.isArray(list)) return [];
    return list.map((item) => {
      if (typeof item === "object" && item !== null) {
        const val = item.value ?? item[idKey] ?? item.id ?? item.idCompetencia ?? item.idDelegacion ?? item.idUniversidad;
        const lbl = item.label ?? item[labelKey] ?? item.nombre ?? item.nombreCompetencia ?? item.nombreUniversidad ?? item.nombreDelegacion ?? String(val);
        return { value: Number(val), label: String(lbl) };
      }
      return { value: Number(item), label: String(item) };
    });
  };

  const [deportes, setDeportes] = useState([]);

  const loadDeportes = useCallback(async () => {
    const dataApi = await fetchData(
      `Catalogs/Competencias`,
      { isMenuAdmin: false },
      `Cargando Competencias...`
    );

    setDeportes(mapOptions(dataApi, 'idCompetencia', 'nombreCompetencia'));
  }, [fetchData]);

  useEffect(() => {
    loadDeportes();
  }, [loadDeportes]);

  const [universidades, setUniversidades] = useState([]);

  const loadUniversidades = useCallback(async () => {
    const dataApi = await fetchData(
      `Catalogs/Universidades`,
      { isMenuAdmin: false },
      `Cargando Universidades...`
    );

    setUniversidades(mapOptions(dataApi, 'idDelegacion', 'nombreDelegacion'));
  }, [fetchData]);

  useEffect(() => {
    loadUniversidades();
  }, [loadUniversidades]);

  const buscarCompetencias = useCallback(async (filtros) => {
    const deportesSel = (filtros?.deportes && filtros.deportes.length > 0)
      ? filtros.deportes.map(item => Number(item.value ?? item.idCompetencia ?? item.id ?? item)).filter(n => !isNaN(n))
      : null;

    const universidadesSel = (filtros?.universidades && filtros.universidades.length > 0)
      ? filtros.universidades.map(item => Number(item.value ?? item.idDelegacion ?? item.idUniversidad ?? item.id ?? item)).filter(n => !isNaN(n))
      : null;

    const fechaSel = filtros?.fecha ? filtros.fecha : startDate;

    const payload = {
      IdsDelegacion: universidadesSel,
      IdsCompetencia: deportesSel,
      Fecha: formatLocalDate(fechaSel)
    };

    const dataApi = await fetchData(
      `PublicPortal/Agenda`,
      payload,
      `Buscando Competencias...`
    );

    if (dataApi) {
      setAgendaList(Array.isArray(dataApi) ? dataApi : (dataApi?.agenda || []));
    } 
  }, [fetchData, startDate]);

  useEffect(() => {
    const initialValues = {
      deportes: [],
      universidades: [],
      fecha: startDate
    };
    buscarCompetencias(initialValues);
  }, [buscarCompetencias, startDate]);

  return {
    agendaList,
    startDate,
    setStartDate,
    minDateParsed,
    maxDateParsed,
    isDateAllowed,
    renderStatus,
    deportes,
    universidades,
    buscarCompetencias,
    formatLocalDate
  };
};