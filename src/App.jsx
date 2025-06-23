import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Order from './pages/Order';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <header className="header">
        <Link to="/" className="logo">Delícias da Rua</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/sobre">Sobre</Link>
          <Link to="/pedido" className="nav-button">Fazer Pedido</Link>
          <Link to="/admin">Admin</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/pedido" element={<Order />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
