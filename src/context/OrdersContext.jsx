import React, { createContext, useState, useEffect } from 'react'
import { auth, db } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const OrdersContext = createContext()

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!user) {
      setOrders([])
      return
    }

    const fetchOrders = async () => {
      const docRef = doc(db, 'carts', user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setOrders(docSnap.data().items || [])
      } else {
        setOrders([])
      }
    }

    fetchOrders()
  }, [user])

  useEffect(() => {
    if (!user) return
    const saveOrders = async () => {
      const docRef = doc(db, 'carts', user.uid)
      await setDoc(docRef, { items: orders })
    }
    saveOrders()
  }, [orders, user])

  function addOrder(order) {
    setOrders(prev => {
      const existingIndex = prev.findIndex(o => o.doceId === order.doceId)
      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex].quantidade += 1
        return updated
      }
      return [...prev, { id: Date.now(), quantidade: 1, ...order }]
    })
  }

  function removeOrder(id) {
    setOrders(prev => prev.filter(order => order.id !== id))
  }

  function updateQuantity(id, quantidade) {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        return { ...order, quantidade: quantidade < 1 ? 1 : quantidade }
      }
      return order
    }))
  }

  function clearOrders() {
    setOrders([])
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, removeOrder, updateQuantity, clearOrders, user, loading }}>
      {children}
    </OrdersContext.Provider>
  )
}
