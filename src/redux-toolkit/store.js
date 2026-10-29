import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; //esto usa localstorage por defecto
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { uiSlice } from "../ui/store";
import { authSlice } from "../Auth/store/authSlice";
import { universityDataSlice } from "../routes/Dashboard/UI/store/universityData_slice";
import { publicSlice } from "../components/Public/store/publicSlice";

//Configuracion de persistencia
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "university"],
};

//se combinana todos los reducers
const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  auth: authSlice.reducer,
  university: universityDataSlice.reducer,
  public: publicSlice.reducer,
});

const persisReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persisReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          "ui/uiSetHeader",
        ],
        ignoredPaths: ["ui.headerOnBack"],
      },
    }),
});

// Crea el persistor
export const persistor = persistStore(store);
