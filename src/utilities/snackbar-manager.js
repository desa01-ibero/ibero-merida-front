import { toast } from "react-toastify";

// Ya no necesitamos snackbarRef ni el configurador para usarlo en JS puro
export const SnackbarUtilities = {
  toast(msg, type = "default", autoHideDuration = 3000) {
    toast(msg, {
      type: type, // "success", "error", "info", "warning", "default"
      autoClose: autoHideDuration,
      position: "top-right",
      pauseOnHover: true,
      draggable: true,
    });
  },
  success(msg) {
    this.toast(msg, "success");
  },
  error(msg) {
    if(msg == 'Request failed with status code 401'){
      this.toast("Sesión finalizada", "error");

    }else{
      this.toast(msg, "error");
    }
    console.error("Error Log:", msg);
  },
  info(msg) {
    this.toast(msg, "info");
  },
  warning(msg) {
    this.toast(msg, "warning");
  },
};
