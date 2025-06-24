import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { OrdersProvider } from './context/OrdersContext'
import Home from './pages/Home'
import About from './pages/About'
import Order from './pages/Order'
import Admin from './pages/Admin'
import './App.css';

export default function App() {
  return (
    <OrdersProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </OrdersProvider>
  )
}
