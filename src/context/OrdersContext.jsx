import React, { createContext, useState } from 'react'

export const OrdersContext = createContext()

export function OrdersProvider({ children }) {
  const [order, setOrder] = useState([])
  const [orders, setOrders] = useState([])

  function addToOrder(sweet) {
    setOrder(prev => {
      if (prev.find(item => item.id === sweet.id)) return prev
      return [...prev, sweet]
    })
  }

  function clearOrder() {
    setOrder([])
  }

  function submitOrder(clientData) {
    const newOrder = {
      ...clientData,
      items: order,
      date: new Date().toISOString(),
    }
    setOrders(prev => [...prev, newOrder])
  }

  return (
    <OrdersContext.Provider
      value={{ order, orders, addToOrder, clearOrder, submitOrder }}
    >
      {children}
    </OrdersContext.Provider>
  )
}
