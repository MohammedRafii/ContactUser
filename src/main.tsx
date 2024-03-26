import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppContextProvider } from "./context/contextAPI";
import axios from "axios";
axios.defaults.baseURL = "https://nodejs-contactusers-api.onrender.com/api/v1";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AppContextProvider>
  </React.StrictMode>
);