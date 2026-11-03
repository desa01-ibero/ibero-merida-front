import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  mapping: {},
  routes: [],
  email: "",
  nombre: "",
  userName: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      
      const {
        email,
        nombre,
        userName,
      } = payload;
      state.isAuthenticated = true;
      state.email = email;
      state.userName = userName;
      state.nombre = nombre;
    },
    // loginCheckingFinish: (state) => {
    //   state.checking = true;
    // },
    logout: (state) => {
      Object.assign(state, initialState);
    },
    setProfilesInfo: (state, { payload }) => {
      state.profilesApp = payload;
    },
    setMenuProfile: (state, { payload }) => {
      state.routes = payload;
    },
  },
});

export const {
  login,
  logout,
  setProfilesInfo,
  setMenuProfile,
  loginCheckingFinish,
} = authSlice.actions;
