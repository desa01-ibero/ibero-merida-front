import axios from "axios";
import { configGlobal } from "../config";
import { TypeService } from "./TypeService";

/**
 * Helper para procesar la respuesta estándar del API
 */
const formatResponse = (res) => ({
  data: res.data?.data || null,
  message: res.data?.message || "",
  success: res.data?.success || 0,
  code: res.data?.code || -1,
  respuestaStatus:
    res.data?.success === 1
      ? TypeService.AxiosApiOk
      : TypeService.AxiosApiOkFail,
});

export const AxiosData = async ({
  endpoint,
  method,
  body,
  queryString,
  useGestionApi = false,
  withCookie = true,
  headers = {},
}) => {
  const baseUrl = useGestionApi
    ? configGlobal.urlApiGestion
    : configGlobal.urlApiIbero;

  const requestHeaders = { ...headers };
  if (body instanceof FormData && !requestHeaders["Content-Type"]) {
    requestHeaders["Content-Type"] = "multipart/form-data";
  }

  try {
    const response = await axios({
      url: `${baseUrl}${endpoint}`,
      method: method.toUpperCase(),
      data: body,
      params: queryString,
      paramsSerializer: {
        indexes: null,
      },
      withCredentials: withCookie,
      headers: requestHeaders,
    });

    return formatResponse(response);
  } catch (error) {
    return {
      data: null,
      message: error.message || "Error inesperado",
      success: 0,
      respuestaStatus: TypeService.AxiosApiOkFail,
    };
  }
};

export const AxiosEmailNotification = async (emailData) => {
  const formData = new FormData();

  // Helper para aplanar el objeto a FormData (incluyendo arrays y tags)
  Object.keys(emailData).forEach((key) => {
    if (Array.isArray(emailData[key])) {
      emailData[key].forEach((item, i) => {
        if (typeof item === "object") {
          Object.keys(item).forEach((subKey) =>
            formData.append(`${key}[${i}].${subKey}`, item[subKey]),
          );
        } else {
          formData.append(`${key}[${i}]`, item);
        }
      });
    } else {
      formData.append(key, emailData[key]);
    }
  });

  // Al usar axios.post, automáticamente se incluye el token y el manejo de errores del interceptor
  return axios.post(`${configGlobal.urlApiGestion}Email`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
