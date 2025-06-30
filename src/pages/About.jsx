import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const [visible, setVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setVisible(true);
      const timer2 = setTimeout(() => {
        setShowButton(true);
      }, 1800);
      return () => clearTimeout(timer2);
    }, 500);
    return () => clearTimeout(timer1);
  }, []);

  return (
    <div className="about-container">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="about-video"
        src="https://res.cloudinary.com/dliyfpqqu/video/upload/v1750861785/chocolate-inicio.jpg_oufym5.mp4"
        type="video/mp4"
      />
      <div className="about-overlay" />
      <div className={`about-content ${visible ? "fade-in" : ""}`}>
        <h2 className="about-title">Truki - Doces Artesanais Online</h2>
        <p className="about-text">
          A Truki nasceu para transformar momentos simples em experiências deliciosas. Com receitas artesanais e ingredientes cuidadosamente selecionados, oferecemos doces que despertam o prazer de saborear algo feito com carinho e atenção. Cada doce é pensado para levar até você uma explosão de sabor e alegria, tornando seu dia mais doce e especial.
        </p>
        {showButton && (
          <button
            className={`about-button ${visible ? "visible" : ""}`}
            onClick={() => navigate("/galeria")}
          >
            Ver Galeria de Doces
          </button>
        )}
      </div>
    </div>
  );
}
