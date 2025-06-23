import React from 'react';
import OrderForm from '../components/OrderForm';

const Order = () => {
  const handleOrderSubmit = (orderData) => {
    console.log('Pedido enviado:', orderData);
  };

  return (
    <div>
      <h1>Faça seu pedido</h1>
      <OrderForm onSubmit={handleOrderSubmit} />
    </div>
  );
};

export default Order;
