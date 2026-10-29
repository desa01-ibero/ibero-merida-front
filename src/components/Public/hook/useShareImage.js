import { useState } from 'react';
import html2canvas from 'html2canvas';

// Helper para obtener texto limpio si val es string u objeto
const getDisplayText = (val) => {
  if (val === null || val === undefined) return "";
  if (typeof val === "object") {
    return val.label || val.nombreEquipoParticipante || val.nombreAtletaParticipante || val.nombre || val.competencia || "";
  }
  return String(val);
};

export const useShareImage = () => {
  const [loading, setLoading] = useState(false);

  const generateCanvas = async (ref) => {
    
    if (!ref?.current) return null;
    return await html2canvas(ref.current, {
      useCORS: true,
      allowTaint: false,
      scale: 2,
      backgroundColor: '#383e4e',
      logging: false,
    });
  };

  /**
   * Descarga la imagen generada a partir del elemento del ref
   * @param {React.RefObject} ref - Referencia al elemento DOM a capturar
   * @param {string|object} rawTitle - Título o nombre de la competencia para el nombre del archivo
   */
  const downloadImage = async (ref, rawTitle = 'evento') => {
    if (!ref?.current || loading) return;
    try {
      setLoading(true);
      const canvas = await generateCanvas(ref);
      if (!canvas) return;

      const titleStr = getDisplayText(rawTitle);
      const nombreLimpio = titleStr ? titleStr.replace(/\s+/g, '_') : 'evento';

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${nombreLimpio}_INTERSUJ.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 'image/png');
    } catch (error) {
      console.error('Error al descargar la imagen:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Comparte la imagen generada a partir del elemento del ref
   * @param {React.RefObject} ref - Referencia al elemento DOM a capturar
   * @param {string|object} rawTitle - Título o nombre de la competencia
   */
  const shareImage = async (ref, rawTitle = 'evento') => {
    if (!ref?.current || loading) return;
    try {
      setLoading(true);
      const canvas = await generateCanvas(ref);
      if (!canvas) return;

      const titleStr = getDisplayText(rawTitle);
      const nombreLimpio = titleStr ? titleStr.replace(/\s+/g, '_') : 'evento';
      const textMessage = titleStr
        ? `Mira los resultados de ${titleStr} en INTERSUJ`
        : 'Mira los resultados en INTERSUJ';

      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) return;

      const file = new File([blob], `${nombreLimpio}_INTERSUJ.png`, { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: titleStr,
          text: textMessage,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: titleStr,
          text: textMessage,
          url: window.location.href,
        });
      } else {
        console.log('La función de compartir no está disponible en este dispositivo/navegador.');
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        console.error('Error al compartir la imagen:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { downloadImage, shareImage, loading };
};
