export const fakePreLogin200 = {
  data: {
    canLogin: true,
    perfilId: 437,
    eventId: 1,
    universityId: 1,
    isFirstLogin: true,
  },
  respuestaStatus: "[Axios] OK",
  refresh: false,
  message: "Operación generada correctamente.",
  success: 1,
};


export const fakePreLogin200ErroresValidacion = {
  data: [
     "El campo Correo es requerido",
    "El Correo no tiene un formato válido."
  ],
  respuestaStatus: "[Axios] OK",
  refresh: false,
 message: "Ocurrieron errores de validación",
  success: 0,
};
