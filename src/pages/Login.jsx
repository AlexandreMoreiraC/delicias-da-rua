import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);

      const q = query(
        collection(db, "usuarios"),
        where("uid", "==", cred.user.uid)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("Usuário não encontrado no banco de dados.");
        return;
      }

      const userData = snapshot.docs[0].data();

      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Email ou senha inválidos.");
    }
  }

  return (
  <main className="login-page">
    <div className="login-image"></div>
    <div className="login-content">
      <div className={`login-container ${animate ? "animated-slide-in" : ""}`}>
        <h2>Entre na sua Conta</h2>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Entrar</button>
          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Ainda não tem uma conta?
            <br />
            <Link to="/cadastro">Registar-se</Link>
          </p>
        </form>
      </div>
    </div>
  </main>
);
}
