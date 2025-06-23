import React from "react";
import { useNavigate } from "react-router-dom";

const OrderButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/order")}>Faça seu pedido</button>
  );
};

export default OrderButton;
