import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  mapping: {},
  routes: [],
  profile: {},
  profileId: null,
  profilesApp: [],
  email: "",
  isFirstLogin: null,
  universityId: null,
  eventId: null,
  //checking: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      
      const {
        roleid,
        perfil,
        profileId,
        email,
        isFirstLogin,
        universityId,
        eventId,
      } = payload;
      state.isAuthenticated = true;
      state.profile = perfil;
      state.profileId = profileId;
      state.email = email;
      state.isFirstLogin = isFirstLogin;
      state.universityId = universityId;
      state.eventId = eventId;
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
