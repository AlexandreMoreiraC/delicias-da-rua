import React, { useState } from "react";

const sweets = [
  { id: 1, name: "Brigadeiro" },
  { id: 2, name: "Bolo de Cenoura" },
  { id: 3, name: "Brownie" }
];

const OrderForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    sweetId: sweets[0].id,
    quantity: 1,
    observation: ""
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Pedido feito:\nNome: ${form.name}\nTelefone: ${form.phone}\nDoce: ${sweets.find(s => s.id === +form.sweetId).name}\nQuantidade: ${form.quantity}\nObservação: ${form.observation}`);
    setForm({
      name: "",
      phone: "",
      sweetId: sweets[0].id,
      quantity: 1,
      observation: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Seu nome"
        required
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Telefone"
        required
      />
      <select name="sweetId" value={form.sweetId} onChange={handleChange}>
        {sweets.map(sweet => (
          <option key={sweet.id} value={sweet.id}>
            {sweet.name}
          </option>
        ))}
      </select>
      <input
        name="quantity"
        type="number"
        min="1"
        value={form.quantity}
        onChange={handleChange}
        required
      />
      <textarea
        name="observation"
        value={form.observation}
        onChange={handleChange}
        placeholder="Observação (opcional)"
      />
      <button type="submit">Enviar Pedido</button>
    </form>
  );
};

export default OrderForm;
