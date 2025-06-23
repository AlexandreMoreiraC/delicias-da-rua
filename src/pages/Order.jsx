import React, { useState, useContext } from "react";
import { OrdersContext } from "../context/OrdersContext.jsx";

const doces = [
  { id: 1, nome: "Brigadeiro" },
  { id: 2, nome: "Bolo de Cenoura" },
  { id: 3, nome: "Brownie" }
];

const Order = () => {
  const { addOrder } = useContext(OrdersContext);

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    doce: doces[0].nome,
    quantidade: 1,
    observacao: ""
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder(formData);
    setEnviado(true);
  };

  return (
    <section className="order">
      <h2>Faça seu pedido</h2>
      {!enviado ? (
        <form onSubmit={handleSubmit}>
          <label>
            Nome
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </label>
          <label>
            Telefone
            <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} required />
          </label>
          <label>
            Escolha o doce
            <select name="doce" value={formData.doce} onChange={handleChange} required>
              {doces.map((d) => (
                <option key={d.id} value={d.nome}>{d.nome}</option>
              ))}
            </select>
          </label>
          <label>
            Quantidade
            <input type="number" name="quantidade" min="1" value={formData.quantidade} onChange={handleChange} required />
          </label>
          <label>
            Observação
            <textarea name="observacao" value={formData.observacao} onChange={handleChange} />
          </label>
          <button type="submit" className="btn-primary">Enviar pedido</button>
        </form>
      ) : (
        <p className="success-message">Pedido enviado! Obrigado, {formData.nome}.</p>
      )}
    </section>
  );
};

export default Order;
