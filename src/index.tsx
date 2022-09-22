import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globalStyle.css";
import { BrowserRouter } from "react-router-dom";
import Providers from "./providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Providers>
        <App />
      </Providers>
    </React.StrictMode>
  </BrowserRouter>
);
