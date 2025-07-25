import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "./Cart/CartProvider";

const queyClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queyClient}>
      <CartProvider>
        <App />
      </CartProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
