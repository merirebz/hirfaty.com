import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./redux/store";
import axios from "axios";
import "./i18n";
import { PostHogProvider } from "posthog-js/react";
import '@fortawesome/fontawesome-free/css/all.min.css';

axios.defaults.withCredentials = true;

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

// Configuration de PostHog avec des valeurs réelles
const posthogApiKey = "phc_KYB9UTF8pm4kCzY0B1TXbMmVecjDeuQ4psoXbEsHuL2";
const posthogHost = "https://us.i.posthog.com";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={Store}>
     <PostHogProvider apiKey={posthogApiKey} options={{ api_host: posthogHost }}>

        <App />
      </PostHogProvider>
  </Provider>
);

reportWebVitals();
