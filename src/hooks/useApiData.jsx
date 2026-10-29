import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { uiFinishLoading, uiStartLoading } from "../ui/store";
import { SnackbarUtilities } from "../utilities/snackbar-manager";
import { AxiosData } from "../services/AxiosConnexion";
import { TypeService } from "../services/TypeService";
import {
  ManageAxiosResponse,
  MessageSuccesIntersuj,
} from "../services/ResponseActionService";

/**
 * Hook para manejar llamadas API con loader y notificaciones globales
 * @returns {object} { fetchData, sendData }
 */
export const useApiData = () => {
  const dispatch = useDispatch();

  /**
   * Llama un endpoint GET y actualiza loader + snackbar
   */
  const fetchData = useCallback(
    async (
      endpoint,
      queryParams = {},
      loadingMessage = "Cargando...",
      successModal = null, // { title: string, message: string }
    ) => {
      dispatch(uiStartLoading(loadingMessage));
      try {
        const resp = await AxiosData({
          endpoint,
          method: "get",
          queryString: queryParams,
        });

        if (resp.respuestaStatus !== TypeService.AxiosApiOk) {
          SnackbarUtilities.error(
            resp.message || "Error al obtener datos del servidor",
          );
          return null;
        }

        // Si se pasan mensajes de éxito, mostramos el modal personalizado
        if (successModal) {
          MessageSuccesIntersuj(successModal);
        }

        return resp.data ?? null;
      } catch (error) {
        console.error("❌ Error en fetchData:", error);
        SnackbarUtilities.error("Error al cargar información");
        return null;
      } finally {
        dispatch(uiFinishLoading());
      }
    },
    [dispatch],
  );

  /**
   * Llama un endpoint para POST, PUT o DELETE
   */
  const sendData = useCallback(
    async (
      endpoint,
      method,
      body = {},
      queryParams = {},
      loadingMessage = "Procesando...",
      successModal = null, // { title: string, message: string }
      customErrorHandling = false,
      headers = {},
    ) => {
      dispatch(uiStartLoading(loadingMessage));
      try {
        const resp = await AxiosData({
          endpoint,
          method,
          body,
          queryString: queryParams,
          headers,
        });

        if (resp.respuestaStatus !== TypeService.AxiosApiOk) {
          if (customErrorHandling) {
            return resp;
          }
          dispatch(ManageAxiosResponse(resp));
          return null;
        }

        // Si se pasan mensajes de éxito, mostramos el modal personalizado
        if (successModal) {
          MessageSuccesIntersuj(successModal);
          if (resp.data == null) {
            resp.data = "OK";
          }
        } else {
          // Si no hay modal, mostramos un snackbar simple
          SnackbarUtilities.success(
            resp.message || "Operación realizada correctamente",
          );
        }

        return resp ?? null;
      } catch (error) {
        console.error("❌ Error en sendData:", error);
        SnackbarUtilities.error("Error al procesar la solicitud");
        throw error;
      } finally {
        dispatch(uiFinishLoading());
      }
    },
    [dispatch],
  );

  return { fetchData, sendData };
};
