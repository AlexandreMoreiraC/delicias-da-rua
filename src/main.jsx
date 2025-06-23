import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <OrdersProvider>
    <App />
  </OrdersProvider>
);
