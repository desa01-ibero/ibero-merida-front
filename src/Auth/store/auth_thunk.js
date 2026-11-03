import { appIdConfig, configGlobal } from "../../config";
import { AxiosData } from "../../services/AxiosConnexion";
import { ManageAxiosResponse } from "../../services/ResponseActionService";
import { TypeService } from "../../services/TypeService";
import { uiFinishLoading, uiStartLoading, uiModalClose } from "../../ui/store";

import { SnackbarUtilities } from "../../utilities/snackbar-manager";
import {
  login,
  loginCheckingFinish,
  logout,
  setMenuProfile,
  setProfilesInfo,
} from "./authSlice";
import { mockRoutes } from "../../routes/Dashboard/route-config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { data } from "react-router-dom";
import axios from "axios";


export const startLoginCookies = ({
  emailOrUser,
  password,
  recaptchaToken,
  navigate,
}) => {
  return async (dispatch, getState) => {
    dispatch(uiStartLoading("Iniciando Sesión..."));


    const resp = await AxiosData({
      endpoint: "Auth/login",
      method: "POST",
      body: { correo: emailOrUser, password, captcha: recaptchaToken },
      queryString: null, // Puedes omitir esto si es null o undefined
      useGestionApi: false,
      withCookie: false,
    });

    dispatch(uiFinishLoading());

    console.log("Respuesta de login:", resp.data);

    if (resp.respuestaStatus === TypeService.AxiosApiOk) {
    

      // Despachamos login AQUÍ, solo cuando postlogin haya finalizado con éxito
      dispatch(
        login({
          roleid: 0,
          isAuthenticated: true,
          perfil: {
            nombre: data?.nombrecompleto,
            userName: data?.nombreColectivo,
          },
          email: data?.correo,
        }),
      );

      navigate("/dashboard");
      SnackbarUtilities.success(`Bienvenido/a ${user.profile} `);
      return true;
    }

    dispatch(ManageAxiosResponse(resp));
    return false;
  };
};

export const startGetMenuRoutes = (profileId) => {
  return async (dispatch) => {
    const appId = appIdConfig;

    dispatch(uiStartLoading("Cargando rutas..."));

    // const resp = await AxiosData({
    //   endpoint: "MenuRouter/MenuService",
    //   method: "GET",
    //   body: null,
    //   queryString: { appId, profileId },
    //   useGestionApi: true,
    // });

    const resp = {
      "data": [
        {
          "permission": "Registro",
          "element": "Registro/Page/RegistroScreen",
          "path": "/dashboard/registro",
          "icono": "TablaResultadosIcon"
        },

      ],
      "message": "Operación generada correctamente.",
      "success": 1,
      "code": 200,
      "respuestaStatus": "[Axios] OK"
    }


    dispatch(uiFinishLoading());

    if (resp.respuestaStatus === TypeService.AxiosApiOk) {
      const dynamicRoutes = remapRoutes(resp.data);
      const staticRoutes = mockRoutes.map((r) => ({
        ...r,
        icono: null,
      }));

      const allRoutes = [...staticRoutes, ...dynamicRoutes];
      dispatch(setMenuProfile(allRoutes));
    } else {
      const staticRoutes = mockRoutes.map((r) => ({
        ...r,
        icono: null,
      }));
      dispatch(setMenuProfile(staticRoutes));
      dispatch(ManageAxiosResponse(resp));
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading("Cerrando sesión..."));
      await AxiosData({
        endpoint: "Auth/logout",
        method: "POST",
        body: null,
        useGestionApi: false,
      });
      dispatch(uiFinishLoading());
    } catch (error) {
      console.error("No se pudo invalidar la sesión en el servidor:", error);
    } finally {
      console.log("Ejecutando logout localmente...");
      localStorage.clear();
      sessionStorage.clear();

      dispatch(logout());
      dispatch(uiModalClose());
    }
  };
};

// --------------------------------

const remapRoutes = (data) => {
  if (!data) return [];
  return data.map((item) => ({
    path: item.path,
    element: item.element,
    label: item.permission,
    icono: item.icono,
  }));
};

export const validarCambioPassword = createAsyncThunk(
  "evento/getDatos",
  async (ticket) => {
    try {
      const resp = await AxiosData({
        endpoint: "Auth/validate-ticket",
        method: "POST",
        body: { ticket },
        useGestionApi: false,
      });

      if (resp.respuestaStatus === TypeService.AxiosApiOk) {
        return resp;
      } else {
        return { success: 0, message: "Error al validar el ticket" };
      }
    } catch (error) {
      SnackbarUtilities.error("Error al procesar la solicitud");
    }
  },
);

export const startForgotPassword = (email, onSuccess) => {
  return async (dispatch) => {
    dispatch(uiStartLoading("Enviando correo..."));

    try {
      const resp = await AxiosData({
        endpoint: "Auth/forgot-password",
        method: "POST",
        body: { correo: email },
        useGestionApi: false,
      });

      dispatch(uiFinishLoading());

      if (resp.success === 1 || resp.code === 200 || resp.respuestaStatus === TypeService.AxiosApiOk) {
        SnackbarUtilities.success(resp.message || "Se generó el ticket de cambio de contraseña.");
        if (onSuccess) onSuccess();
      } else {
        SnackbarUtilities.error(resp.message || "Ocurrió un error al intentar recuperar la contraseña.");
      }
    } catch (error) {
      dispatch(uiFinishLoading());
      SnackbarUtilities.error("Error de conexión");
    }
  };
};
