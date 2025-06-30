import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-col">
          <h4>Conteúdo</h4>
          <ul>
            <Link to="/Perfil">Meu Perfil</Link>
            <li><Link to="/privacidade">Política de Privacidade</Link></li>
            <Link to="/">Quem Somos</Link>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Social</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>TikTok</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          TRUKI DOCES ARTESANAIS - Todos os direitos reservados. 2025
        </p>
      </div>
    </footer>
  );
}
