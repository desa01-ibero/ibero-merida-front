import Swal from "sweetalert2";

/**
 * Muestra un modal de confirmación para eliminar un registro.
 * Devuelve una promesa que resuelve a `true` si se confirma, o `false` si se cancela.
 * @param {string} text - El texto que se mostrará en la alerta (opcional).
 * @returns {Promise<boolean>}
 *
 *
 */

export const QUESTION_ICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
  <path d="M20.8333 41.6667C9.32708 41.6667 0 32.3396 0 20.8333C0 9.32708 9.32708 0 20.8333 0C32.3396 0 41.6667 9.32708 41.6667 20.8333C41.6667 32.3396 32.3396 41.6667 20.8333 41.6667ZM20.8333 37.5C25.2536 37.5 29.4928 35.7441 32.6184 32.6184C35.7441 29.4928 37.5 25.2536 37.5 20.8333C37.5 16.4131 35.7441 12.1738 32.6184 9.04822C29.4928 5.92261 25.2536 4.16667 20.8333 4.16667C16.4131 4.16667 12.1738 5.92261 9.04822 9.04822C5.92261 12.1738 4.16667 16.4131 4.16667 20.8333C4.16667 25.2536 5.92261 29.4928 9.04822 32.6184C12.1738 35.7441 16.4131 37.5 20.8333 37.5V37.5ZM18.75 27.0833H22.9167V31.25H18.75V27.0833ZM22.9167 23.6563V25H18.75V21.875C18.75 21.3225 18.9695 20.7926 19.3602 20.4019C19.7509 20.0112 20.2808 19.7917 20.8333 19.7917C21.4252 19.7916 22.0048 19.6235 22.5048 19.3069C23.0049 18.9903 23.4047 18.5383 23.6579 18.0033C23.911 17.4683 24.007 16.8725 23.9348 16.2851C23.8625 15.6977 23.6249 15.1429 23.2497 14.6852C22.8744 14.2276 22.3769 13.8859 21.815 13.6999C21.2532 13.514 20.6501 13.4914 20.0759 13.6348C19.5017 13.7782 18.98 14.0817 18.5716 14.51C18.1632 14.9383 17.8848 15.4738 17.7688 16.0542L13.6813 15.2354C13.9347 13.9689 14.5198 12.7924 15.3769 11.8262C16.234 10.86 17.3323 10.1387 18.5596 9.73608C19.7868 9.33345 21.0989 9.26393 22.3618 9.53462C23.6247 9.8053 24.7931 10.4065 25.7475 11.2767C26.702 12.147 27.4082 13.255 27.794 14.4876C28.1798 15.7203 28.2314 17.0332 27.9435 18.2923C27.6555 19.5514 27.0384 20.7115 26.1553 21.6539C25.2721 22.5963 24.1544 23.2873 22.9167 23.6563V23.6563Z" fill="#9F9DFF"/>
</svg>
  `;

export const WARNING_iCON_SVG = `
<svg width="44" height="39" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.7333 1.04157L43.5791 35.4166C43.762 35.7333 43.8582 36.0925 43.8582 36.4582C43.8582 36.8239 43.762 37.1832 43.5791 37.4999C43.3963 37.8166 43.1333 38.0796 42.8166 38.2624C42.4999 38.4453 42.1406 38.5416 41.7749 38.5416H2.08328C1.71758 38.5416 1.35833 38.4453 1.04163 38.2624C0.724933 38.0796 0.461945 37.8166 0.2791 37.4999C0.0962561 37.1832 -2.32256e-06 36.8239 0 36.4582C2.32265e-06 36.0925 0.0962654 35.7333 0.279114 35.4166L20.1249 1.04157C20.3078 0.724893 20.5708 0.461921 20.8875 0.279087C21.2042 0.0962532 21.5634 0 21.9291 0C22.2948 0 22.654 0.0962532 22.9707 0.279087C23.2874 0.461921 23.5504 0.724893 23.7333 1.04157V1.04157ZM5.69161 34.3749H38.1666L21.9291 6.24991L5.69161 34.3749V34.3749ZM19.8458 28.1249H24.0124V32.2916H19.8458V28.1249ZM19.8458 13.5416H24.0124V23.9582H19.8458V13.5416Z" fill="#F56C89"/>
</svg>

   `;

export const showConfirmAlert = async (
  customTitle = "¿Estás seguro?",
  text,
  buttontext,
  iconType = "question",
) => {
  // Usamos 'await' para esperar la interacción del usuario
  const result = await Swal.fire({
    title: customTitle,
    html: `<div class="my-custom-message">${text}</div>`,
    iconHtml: iconType,
    showCancelButton: true,
    confirmButtonText: buttontext,
    cancelButtonText: "Cancelar",
    buttonsStyling: false,
    customClass: {
      popup: "my-custom-modal",
      confirmButton: "my-confirm-button",
      cancelButton: "my-cancel-button",
      icon: "my-icon-container",
      title: "my-custom-title",
    },
    // reverseButtons: true // Opcional: A veces es útil poner Cancelar a la izquierda
  });

  // Swal.fire devuelve un objeto 'result'.
  // 'result.isConfirmed' será true si presionan "Sí, eliminar"
  // y false si presionan "Cancelar" o cierran el modal.
  return result.isConfirmed;
};



export const ModalMensajes = async ({
  customTitle = "¿Estás seguro?",
  text,
  buttontext = "Aceptar",
  iconType =QUESTION_ICON_SVG,
}) => {
  const result = await Swal.fire({
    title: customTitle,
    html: `<div class="my-custom-message">${text}</div>`,
    iconHtml: iconType,
    showCancelButton: false,
    confirmButtonText: buttontext,
    buttonsStyling: false,
    customClass: {
      popup: "my-custom-modal",
      confirmButton: "my-confirm-button",
      icon: "my-icon-container",
      title: "my-custom-title",
    },
  });

  return result.isConfirmed;
};

