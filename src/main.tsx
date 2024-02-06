import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ProviderTree from "./providers/ProviderTree";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProviderTree>
      <App />
    </ProviderTree>
  </React.StrictMode>
);
