import Swal from "sweetalert2";
import { logout } from "../Auth/store";
// import { startRefreshToken } from "../Auth/store/auth_thunk"
import { TypeService } from "./TypeService";
import { SnackbarUtilities } from "../utilities/snackbar-manager";
import "./css/ModalStyles.css";

const WARNING_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
  <g clip-path="url(#clip0_34_2015)">
    <path d="M26.8041 6.25001L46.6499 40.625C46.8328 40.9417 46.929 41.301 46.929 41.6667C46.929 42.0324 46.8328 42.3916 46.6499 42.7083C46.4671 43.025 46.2041 43.288 45.8874 43.4709C45.5707 43.6537 45.2114 43.75 44.8457 43.75H5.15408C4.78838 43.75 4.42913 43.6537 4.11243 43.4709C3.79573 43.288 3.53275 43.025 3.3499 42.7083C3.16706 42.3916 3.0708 42.0324 3.0708 41.6667C3.0708 41.301 3.16707 40.9417 3.34991 40.625L23.1957 6.25001C23.3786 5.93333 23.6416 5.67036 23.9583 5.48752C24.275 5.30469 24.6342 5.20844 24.9999 5.20844C25.3656 5.20844 25.7248 5.30469 26.0415 5.48752C26.3582 5.67036 26.6212 5.93333 26.8041 6.25001V6.25001ZM8.76241 39.5833H41.2374L24.9999 11.4583L8.76241 39.5833V39.5833ZM22.9166 33.3333H27.0832V37.5H22.9166V33.3333ZM22.9166 18.75H27.0832V29.1667H22.9166V18.75Z" fill="#F56C89"/>
  </g>
  <defs>
    <clipPath id="clip0_34_2015">
      <rect width="50" height="50" fill="white"/>
    </clipPath>
  </defs>
</svg>
`;

const SUCCESS_ICON_SVG = ` <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_41_3995)">
<path d="M24.9998 45.8332C13.4936 45.8332 4.1665 36.5061 4.1665 24.9998C4.1665 13.4936 13.4936 4.1665 24.9998 4.1665C36.5061 4.1665 45.8332 13.4936 45.8332 24.9998C45.8332 36.5061 36.5061 45.8332 24.9998 45.8332ZM24.9998 41.6665C29.4201 41.6665 33.6593 39.9106 36.785 36.785C39.9106 33.6593 41.6665 29.4201 41.6665 24.9998C41.6665 20.5796 39.9106 16.3403 36.785 13.2147C33.6593 10.0891 29.4201 8.33317 24.9998 8.33317C20.5796 8.33317 16.3403 10.0891 13.2147 13.2147C10.0891 16.3403 8.33317 20.5796 8.33317 24.9998C8.33317 29.4201 10.0891 33.6593 13.2147 36.785C16.3403 39.9106 20.5796 41.6665 24.9998 41.6665ZM22.9228 33.3332L14.0832 24.4936L17.029 21.5478L22.9228 27.4415L34.7061 15.6561L37.654 18.6019L22.9228 33.3332Z" fill="#A0BF16"/>
</g>
<defs>
<clipPath id="clip0_41_3995">
<rect width="50" height="50" fill="white"/>
</clipPath>
</defs>
</svg>`;

const showCustomAlert = (title, message) => {
  // 1. Normalizamos el mensaje: si es array lo unimos en una lista, si no, lo dejamos igual
  const formattedMessage = Array.isArray(message)
    ? `<ul class="custom-error-list">
        ${message.map((msg) => `<li>${msg}</li>`).join("")}
       </ul>`
    : message;

  Swal.fire({
    title: title,
    html: `<div class="my-custom-message">${formattedMessage}</div>`, // Cambié <p> por <div> porque un <ul> dentro de un <p> es HTML inválido
    iconHtml: WARNING_ICON_SVG,
    confirmButtonText: "Aceptar",
    buttonsStyling: false,
    customClass: {
      popup: "my-custom-modal",
      confirmButton: "my-confirm-button",
      icon: "my-icon-container",
      title: "my-custom-title",
    },
    showCloseButton: false,
    backdrop: `rgba(0,0,0,0.4)`,
  });
};

export const ManageAxiosResponse = (response) => {
  return async (dispatch) => {
    console.log(response.respuestaStatus);
    switch (response.respuestaStatus) {
      case TypeService.AxiosApi401:
        AlertTokenNovalido();
        dispatch(logout());
        break;
      case TypeService.AxiosNoConexion: // Error de conexion con el APi
        showCustomAlert("Error de conexión con API", response.message);
        break;
      case TypeService.AxiosApi500: //Error interno en el API (Revisar log en en esta)
        showCustomAlert(
          "Ocurrió un error en el servidor remoto, intente más tarde",
          response.message,
        );
        break;
      case TypeService.AxiosApiOkFail: {
        // Peticion correcta, pero exito en 0 (Error controlado en API)
        let alertMessage = response.message;
        
        if (response.message === "Request failed with status code 401") {
          alertMessage = "Sesión finalizada";
          showCustomAlert("", alertMessage);
        } else if (Array.isArray(response.data) && response.data.length > 0) {
          alertMessage = response.data; // showCustomAlert convierte arrays en <ul> automáticamente
          showCustomAlert("Error en los datos", alertMessage);
        }else{
          showCustomAlert("Error en los datos", alertMessage);
        }
        break;
      }

      case TypeService.AxiosApiOk: //Peticion correcta, pero exito en 0 (Error controlado en API)
        showCustomAlert("Error en los datos", response.data);
        break;

      default:
        // Error generico. Cuando no se captura el estaus devuelto por el API
        showCustomAlert(
          "Mensaje del sistema",
          "Ocurrió un error, intente más tarde.",
        );

        break;
    }
  };
};

export const RefreshIsRequared = () => {
  return async (dispatch) => {
    dispatch(startRefreshToken());
  };
};

export const MessageSuccesIntersuj = async ({
  title,
  message,
  icon = "success",
  confirmText = "Aceptar",
  onConfirm = null,
}) => {

  var iconMessage = icon === "success" ? SUCCESS_ICON_SVG : WARNING_ICON_SVG;

  const result = await Swal.fire({
    title: title,
    html: `<div class="my-custom-message">${message}</div>`,
    iconHtml: iconMessage,
    confirmButtonText: confirmText,
    buttonsStyling: false,
    customClass: {
      popup: "my-custom-modal",
      confirmButton: "my-confirm-button",
      icon: "my-icon-container",
      title: "my-custom-title",
    },
    showCloseButton: false,
    backdrop: `rgba(0,0,0,0.4)`,
    width:'650px !important'
  });

  if (result.isConfirmed && onConfirm) {
    onConfirm();
  }
};

export const FinalMessage = (Mensaje) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: `${Mensaje}`,
  });
};

export const AlertTokenNovalido = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    // timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "info",
    title: "Sesión Terminada",
  });
  console.log("limpiamos localstorage");
  localStorage.clear();
};
