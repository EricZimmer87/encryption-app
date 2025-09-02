import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/encryptions">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
