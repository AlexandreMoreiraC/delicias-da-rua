import { onSnapshot, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import About from "./pages/About";
import Order from "./pages/Order";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Footer from "./components/Footer";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import Perfil from "./pages/Perfil";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminRoute from "./Routes/AdminRoute";
import { UserProvider } from "./context/UserContext";
import LogoutButton from "./components/LogoutButton";
import { auth } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

import "./app.css";
import Gallery from "./components/Gallery";
import { FaUserCircle, FaShoppingCart, FaHome } from "react-icons/fa";
import { GiCakeSlice } from "react-icons/gi";

export default function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [doces, setDoces] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(collection(db, "usuarios"), where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "doces"), (snapshot) => {
      const docesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDoces(docesData);
    });
    return () => unsubscribe();
  }, []);

  function totalItensCarrinho() {
    return carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }

  return (
    <UserProvider>
      <Router>
        <nav>
          <Link to="/">
            <img src="/logo3.png" alt="Delícias da Rua Logo" className="nav-logo" />
          </Link>

          <div className="nav-name">
            {user && (
              <span
                className="welcome-text"
                style={{ cursor: "pointer" }}
                onClick={() => window.location.reload()}
              >
                Olá, {userData && userData.nome ? userData.nome : user.displayName ? user.displayName : ("@")[0]}
              </span>
            )}
          </div>

          <div className="nav-center">
            <Link to="/" className="link-home">
              <FaHome size={20} style={{ marginRight: "6px" }} />
              Início
            </Link>

            <Link to="/galeria" className="link-galeria">
              <GiCakeSlice size={20} style={{ marginRight: "6px" }} />
              Galeria de Doces
            </Link>

            <Link to="/pedido" className="link-carrinho">
              <FaShoppingCart size={18} style={{ marginRight: "6px" }} />
              Meu Carrinho ({totalItensCarrinho()})
            </Link>

            {user && (
              <Link to="/perfil" className="link-perfil">
                <FaUserCircle size={18} style={{ marginRight: "6px" }} />
                Meu Perfil
              </Link>
            )}
          </div>

          <div>{userData && userData.role === "admin" && <Link to="/admin" style={{ marginLeft: "12px" }}>Admin</Link>}</div>

          <div className="nav-right">
            {!user && <Link to="/login">Login/Registar-se</Link>}
            {user && <LogoutButton />}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/galeria"
            element={
              <Gallery
                doces={doces}
                carrinho={carrinho}
                setCarrinho={setCarrinho}
                user={user}
              />
            }
          />
          <Route
            path="/pedido"
            element={<Order carrinho={carrinho} setCarrinho={setCarrinho} />}
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/privacidade" element={<PoliticaPrivacidade />} />
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <Perfil />
              </PrivateRoute>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </UserProvider>
  );
}
