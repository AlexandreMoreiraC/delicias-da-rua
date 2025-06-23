import React from 'react';

const OrderButton = () => {
  const handleClick = () => {
    alert('Formulário de pedidos será implementado em breve!');
  };

  return (
    <section>
      <button onClick={handleClick}>Fazer Pedido</button>
    </section>
  );
};

export default OrderButton;
