import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderButton from "./OrderButton";
import "../App.css";

export default function Gallery({ doces = [], carrinho = [], setCarrinho, user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantidades, setQuantidades] = useState({});
  const [favoritos, setFavoritos] = useState([]);
  const [filtro, setFiltro] = useState("favoritos");

  useEffect(() => {
    if (user) {
      const favs = JSON.parse(localStorage.getItem(`favoritos_${user.id}`)) || [];
      setFavoritos(favs);
    } else {
      setFavoritos([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`favoritos_${user.id}`, JSON.stringify(favoritos));
    }
  }, [favoritos, user]);

  const destaqueDoces = doces.filter((doce) => doce.destaque);
  const docesAtuais = [...destaqueDoces, ...destaqueDoces];

  let filteredDoces = doces.filter((doce) =>
    doce.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filtro === "favoritos") {
    filteredDoces = filteredDoces.sort((a, b) => {
      const aFav = favoritos.includes(a.id);
      const bFav = favoritos.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  } else if (filtro === "precoAsc") {
    filteredDoces = filteredDoces.sort((a, b) => a.preco - b.preco);
  } else if (filtro === "precoDesc") {
    filteredDoces = filteredDoces.sort((a, b) => b.preco - a.preco);
  } else if (filtro === "recentes") {
    filteredDoces = filteredDoces.sort(
      (a, b) => new Date(b.adicionadoEm) - new Date(a.adicionadoEm)
    );
  }

  function openImage(imagemUrl) {
    setSelectedImage(imagemUrl);
  }

  function closeImage() {
    setSelectedImage(null);
  }

  function handleQuantidadeChange(doceId, valor) {
    const novaQuantidade = Math.max(1, Math.min(99, Number(valor) || 1));
    setQuantidades((prev) => ({ ...prev, [doceId]: novaQuantidade }));
  }

  function totalItensCarrinho() {
    return carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  }

  function toggleFavorito(doceId) {
    if (!user) return;
    setFavoritos((prev) =>
      prev.includes(doceId)
        ? prev.filter((id) => id !== doceId)
        : [...prev, doceId]
    );
  }

  return (
    <div className="gallery-background">
      <div className="gallery-overlay"></div>

      <Link
        to="/pedido"
        className="carrinho-centralizado"
        aria-label="Carrinho de compras"
      >
        🛒
        {totalItensCarrinho() > 0 && (
          <div className="badge-quantidade">{totalItensCarrinho()}</div>
        )}
      </Link>

      <div className="carrossel-destaque">
        <h2 className="titulo-destaque">Novos sabores para provar e repetir!</h2>
        <div className="destaques-rolantes">
          <div className="destaques-animacao">
            {docesAtuais.map((doce, index) => (
              <div key={`${doce.id}-${index}`} className="destaque-item">
                <img src={doce.imagemUrl} alt={doce.nome} />
                <h3>{doce.nome}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ margin: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Qual delícia você procura hoje?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
            marginRight: "10px",
          }}
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
          aria-label="Filtro de doces"
        >
          <option value="favoritos">Favoritos</option>
          <option value="precoAsc">Preço Crescente</option>
          <option value="precoDesc">Preço Decrescente</option>
          <option value="recentes">Adicionados Recentes</option>
        </select>
      </div>

      <div className="gallery-grid gallery-content">
        {filteredDoces.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555", fontSize: "18px" }}>
            Nenhum produto encontrado.
          </p>
        ) : (
          filteredDoces.map((doce) => {
            const isFavorito = favoritos.includes(doce.id);
            return (
              <div key={doce.id} className="gallery-item">
                <img
                  src={doce.imagemUrl}
                  alt={doce.nome}
                  onClick={() => openImage(doce.imagemUrl)}
                  style={{ cursor: "pointer", width: "300px" }}
                />
                <div className="gallery-item-info">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{doce.nome}</h3>
                    {user && (
                      <button
                        onClick={() => toggleFavorito(doce.id)}
                        style={{
                          cursor: "pointer",
                          background: "none",
                          border: "none",
                          fontSize: "24px",
                          color: isFavorito ? "red" : "gray",
                          padding: 0,
                          marginLeft: "10px",
                        }}
                        aria-label={
                          isFavorito
                            ? "Remover dos favoritos"
                            : "Adicionar aos favoritos"
                        }
                      >
                        {isFavorito ? "❤️" : "🤍"}
                      </button>
                    )}
                  </div>
                  <p className="descricao">{doce.descricao}</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          lineHeight: 1,
                          verticalAlign: "middle",
                        }}
                      >
                        €
                      </span>{" "}
                      {doce.preco.toFixed(2)}
                    </p>

                    <input
                      type="number"
                      min="1"
                      max="99"
                      value={quantidades[doce.id] || 1}
                      onChange={(e) =>
                        handleQuantidadeChange(doce.id, e.target.value)
                      }
                      style={{
                        width: "50px",
                        padding: "3px",
                        fontSize: "16px",
                      }}
                    />
                   <div style={{ transform: "scale(0.85)", display: "inline-block" }}>
                     <OrderButton
                      user={user}
                      doceId={doce.id}
                       doceNome={doce.nome}
                        docePreco={doce.preco}
                         doceImagemUrl={doce.imagemUrl}
                         quantidade={quantidades[doce.id] || 1}
                         carrinho={carrinho}
                         setCarrinho={setCarrinho}
                       />
                      </div>
                    
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeImage}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeImage}>
              🆇
            </button>
            <img
              src={selectedImage}
              alt="Imagem ampliada"
              style={{ width: "500px", height: "auto" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
