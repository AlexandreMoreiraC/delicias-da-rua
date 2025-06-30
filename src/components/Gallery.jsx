import React, { useState } from "react";
import { Link } from "react-router-dom";
import OrderButton from "./OrderButton";
import "../app.css";

export default function Gallery({ doces = [], carrinho = [], setCarrinho, user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantidades, setQuantidades] = useState({});

  const destaqueDoces = doces.filter((doce) => doce.destaque);
  const docesAtuais = [...destaqueDoces, ...destaqueDoces];

  const filteredDoces = doces.filter((doce) =>
    doce.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="gallery-background">
      <div className="gallery-overlay"></div>

      <Link to="/pedido" className="carrinho-centralizado" aria-label="Carrinho de compras">
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

      <div className="search-container" style={{ margin: "20px", textAlign: "center" }}>
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
          }}
        />
      </div>

      <div className="gallery-grid gallery-content">
        {filteredDoces.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555", fontSize: "18px" }}>
            Nenhum produto encontrado.
          </p>
        ) : (
          filteredDoces.map((doce) => (
            <div key={doce.id} className="gallery-item">
              <img
                src={doce.imagemUrl}
                alt={doce.nome}
                onClick={() => openImage(doce.imagemUrl)}
                style={{ cursor: "pointer", width: "300px" }}
              />
              <div className="gallery-item-info">
                <h3>{doce.nome}</h3>
                <p className="descricao">{doce.descricao}</p>
                <p>
                  € {doce.preco.toFixed(2)}{" "}
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={quantidades[doce.id] || 1}
                    onChange={(e) => handleQuantidadeChange(doce.id, e.target.value)}
                    style={{
                      width: "50px",
                      marginLeft: "10px",
                      padding: "3px",
                      fontSize: "16px",
                    }}
                  />
                </p>
                <div className="order-button-wrapper">
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
          ))
        )}
      </div>

      {selectedImage && (
        <div className="lightbox-overlay" onClick={closeImage}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeImage}>
              🆇
            </button>
            <img src={selectedImage} alt="Imagem ampliada" style={{ width: "500px", height: "auto" }} />
          </div>
        </div>
      )}
    </div>
  );
}
