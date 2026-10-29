import axios from "axios";
import { store } from "../redux-toolkit/store";
import { logout } from "../Auth/store/authSlice";
import { uiFinishLoading } from "../ui/store/uiSlice";
import { configGlobal } from "../config";

/**
 * Instancia limpia SOLO para refresh
 * Evita loops de interceptors
 */
const axiosClean = axios.create({
  withCredentials: true,
});

/**
 * Control de refresh concurrente
 */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve();
  });

  failedQueue = [];
};

let isLoggingOut = false;
const safeLogout = () => {
  if (isLoggingOut) return;
  isLoggingOut = true;
  store.dispatch(logout());
  localStorage.clear();
  sessionStorage.clear();

  // Liberar el candado después de un tiempo para permitir futuros logouts
  // en la misma sesión de navegador si el usuario vuelve a iniciar sesión.
  setTimeout(() => {
    isLoggingOut = false;
  }, 2000);
};

export const AxiosInterceptor = () => {
  /**
   * REQUEST INTERCEPTOR
   */

  axios.interceptors.request.use(
    (config) => {
      const url = config.url?.toLowerCase() || "";

      const isCookieEndpoint =
        url.includes("login-cookies") ||
        url.includes("logout") ||
        url.includes(configGlobal.urlApiIbero?.toLowerCase() || "");

      config.withCredentials = isCookieEndpoint;

      return config;
    },
    (error) => Promise.reject(error),
  );

  /**
   * RESPONSE INTERCEPTOR
   */
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      const status = error?.response?.status;
      const url = originalRequest?.url?.toLowerCase() || "";

      const isUnauthorized = status === 401 || error?.message?.includes("401");

      if (isUnauthorized) {
        console.warn(
          "Petición no autorizada (401). Forzando logout inmediato.",
        );

        safeLogout();
        store.dispatch(uiFinishLoading());

        return Promise.reject(error);
      }

      store.dispatch(uiFinishLoading());

      return Promise.reject(error);
    },
  );
};
