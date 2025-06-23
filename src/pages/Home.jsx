import React from "react";

const Home = () => {
  return (
    <section className="home">
      <div className="hero-text">
        <h2>Bem-vindo à Delícias da Rua</h2>
        <p>Os melhores doces caseiros, feitos com amor e ingredientes selecionados.</p>
        <a href="/order" className="btn-primary">Faça seu pedido</a>
      </div>
      <div className="gallery">
        <img src="https://images.unsplash.com/photo-1562440499-64f5f38fdaae?auto=format&fit=crop&w=800&q=80" alt="Brigadeiro" />
        <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80" alt="Bolo de Cenoura" />
        <img src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80" alt="Brownie" />
      </div>
    </section>
  );
};

export default Home;
