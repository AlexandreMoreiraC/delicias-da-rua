import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Order from "./pages/Order.jsx";
import Admin from "./pages/Admin.jsx";

const App = () => {
  return (
    <Router>
      <header>
        <h1>Delícias da Rua</h1>
        <nav>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>Nossa História</NavLink>
          <NavLink to="/order" className={({ isActive }) => isActive ? "active" : ""}>Faça seu Pedido</NavLink>
          <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/order" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <footer>
        <p>© 2025 Delícias da Rua - Todos os direitos reservados</p>
      </footer>
    </Router>
  );
};

export default App;
