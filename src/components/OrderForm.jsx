import React, { useState, useContext } from 'react'
import { OrdersContext } from '../context/OrdersContext'

export default function OrderForm({ onClose }) {
  const { addOrder } = useContext(OrdersContext)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    sweets: '',
    quantity: 1
  })

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addOrder(formData)
    onClose()
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Seu nome"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Endereço"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <input
        name="sweets"
        placeholder="Doce desejado"
        value={formData.sweets}
        onChange={handleChange}
        required
      />
      <input
        name="quantity"
        type="number"
        min="1"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <button type="submit">Enviar Pedido</button>
    </form>
  )
}
