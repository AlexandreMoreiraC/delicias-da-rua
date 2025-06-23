import React, { useState, useContext } from 'react'
import { OrdersContext } from '../context/OrdersContext'

export default function OrderForm() {
  const { order, clearOrder, submitOrder } = useContext(OrdersContext)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [observations, setObservations] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name || !phone || order.length === 0) {
      alert('Preencha seu nome, telefone e escolha pelo menos um doce.')
      return
    }
    submitOrder({ name, phone, observations })
    alert('Pedido enviado! Obrigado :)')
    clearOrder()
    setName('')
    setPhone('')
    setObservations('')
  }

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <label>
        Nome:
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Seu nome"
        />
      </label>

      <label>
        Telefone:
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          placeholder="(99) 99999-9999"
        />
      </label>

      <label>
        Observações:
        <textarea
          value={observations}
          onChange={e => setObservations(e.target.value)}
          placeholder="Alguma observação?"
          rows={3}
        />
      </label>

      <h3>Seu Pedido:</h3>
      <ul>
        {order.map(item => (
          <li key={item.id}>
            {item.name} - R$ {item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <button type="submit" className="submit-btn">
        Enviar Pedido
      </button>
    </form>
  )
}
