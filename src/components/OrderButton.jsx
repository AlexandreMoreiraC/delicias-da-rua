import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function OrderButton({ sweet, addToOrder }) {
  const navigate = useNavigate()

  function handleClick() {
    addToOrder(sweet)
    navigate('/order')
  }

  return (
    <button className="order-btn" onClick={handleClick}>
      Pedir
    </button>
  )
}
