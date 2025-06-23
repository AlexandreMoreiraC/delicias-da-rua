import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sweet, setSweet] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, phone, sweet, quantity, notes });
    setName('');
    setPhone('');
    setSweet('');
    setQuantity(1);
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Telefone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Escolha o doce"
        value={sweet}
        onChange={e => setSweet(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        min="1"
        onChange={e => setQuantity(Number(e.target.value))}
        required
      />
      <textarea
        placeholder="Observações (opcional)"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
      <button type="submit">Enviar Pedido</button>
    </form>
  );
};

export default OrderForm;
