import React, { useContext } from "react";
import { OrdersContext } from "../context/OrdersContext.jsx";

const Admin = () => {
  const { orders } = useContext(OrdersContext);

  return (
    <section className="admin">
      <h2>Pedidos Recebidos</h2>
      {orders.length === 0 ? (
        <p>Nenhum pedido recebido ainda.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Doce</th>
              <th>Quantidade</th>
              <th>Observação</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.nome}</td>
                <td>{order.telefone}</td>
                <td>{order.doce}</td>
                <td>{order.quantidade}</td>
                <td>{order.observacao || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Admin;
