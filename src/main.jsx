import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./styles/responsive.css";
import "./styles.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { persistor, store } from "./redux-toolkit/store.js";
import { AxiosInterceptor } from "./interceptor/axios.interceptor.js";
import { SnackbarProvider } from "notistack";

AxiosInterceptor();
createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer position="top-right" autoClose={5000} />
    </PersistGate>
  </Provider>,
  // </StrictMode>
);
