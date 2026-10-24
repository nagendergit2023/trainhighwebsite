import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import reportWebVitals from "./reportWebVitals.js";
import { BrowserRouter } from "react-router-dom";
// import { initPushAlert } from "./helpers/pushAlert";

const rootElement = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Build-time prerendering places initial page markup in #root. Hydrate it so
// visitors receive useful HTML before React becomes interactive.
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, app);
} else {
  ReactDOM.createRoot(rootElement).render(app);
}

reportWebVitals();

// initPushAlert();

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/service-worker.js").catch(() => {});
//   });
// }
