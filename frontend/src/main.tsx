// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { TelegramProvider } from "./context/TelegramContext";
import { LoyaltyProvider } from "./context/LoyaltyContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TelegramProvider>
      <LoyaltyProvider>
        <App />
      </LoyaltyProvider>
    </TelegramProvider>
  </React.StrictMode>
);
