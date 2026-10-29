import { createSlice } from "@reduxjs/toolkit";

const initialState = {
fechaInicio: null,
fechaFin: null,
urlLogotipo: '',
anio:'',

};

export const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    setFechasIntersuj:( state, {payload} ) => {
      state.fechaInicio = payload.fechaInicio;
      state.fechaFin = payload.fechaFin;
    },
    setDatosGenerales:(state, {payload}) => {
      state.urlLogotipo = payload.urlLogotipo;
      state.anio  = payload.anio;
    }
  },
});

export const {
setFechasIntersuj,
setDatosGenerales
} = publicSlice.actions;
