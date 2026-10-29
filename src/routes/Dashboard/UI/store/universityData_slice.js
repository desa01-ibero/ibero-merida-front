import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idUniversidad: null,
  nombre: "",
  nombreCorto: "",
  pais: "",
  contacto: "",
  urlLogotipo: "",
  urlLogoEvento:""
};

export const universityDataSlice = createSlice({
  name: "universityData",
  initialState,
  reducers: {
    setDataUniversity: (state, { payload }) => {
      const {
        idUniversidad,
        nombre,
        nombreCorto,
        pais,
        contacto,
        urlLogotipo,
      } = payload;
      state.idUniversidad = idUniversidad;
      state.nombre = nombre;
      state.nombreCorto = nombreCorto;
      state.pais = pais;
      state.contacto = contacto;
      state.urlLogotipo = urlLogotipo;
    },
    setLogoEvento: (state, { payload }) => {
      state.urlLogoEvento = payload;
    }
  },
});

export const { setDataUniversity, setLogoEvento } = universityDataSlice.actions;
