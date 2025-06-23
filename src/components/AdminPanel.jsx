import React, { useContext } from 'react'
import { OrdersContext } from '../context/OrdersContext'

export default function AdminPanel() {
  const { orders } = useContext(OrdersContext)

  return (
    <div>
      <h2>Pedidos Recebidos</h2>
      {orders.length === 0 ? (
        <p>Nenhum pedido recebido ainda.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <strong>{order.name}</strong> - {order.phone} <br />
              Observações: {order.observations || 'Nenhuma'} <br />
              Itens:
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} - R$ {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
