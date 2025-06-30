import React, { useState } from "react";

export default function OrderButton({
  user,
  doceId,
  doceNome,
  docePreco,
  doceImagemUrl,
  quantidade,
  carrinho,
  setCarrinho,
}) {
  const [added, setAdded] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  function handleClick() {
    if (!user || Object.keys(user).length === 0) {
      setShowLoginMsg(true);
      setTimeout(() => setShowLoginMsg(false), 3000);
      return;
    }

    setCarrinho((prevCarrinho) => {
      const existe = prevCarrinho.find((item) => item.id === doceId);
      if (existe) {
        return prevCarrinho.map((item) =>
          item.id === doceId
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      } else {
        return [
          ...prevCarrinho,
          {
            id: doceId,
            nome: doceNome,
            preco: docePreco,
            imagemUrl: doceImagemUrl,
            quantidade,
          },
        ];
      }
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ position: "relative" }}>
      <button onClick={handleClick}>Comprar</button>
      {added && (
        <div
          style={{
            position: "absolute",
            top: "-25px",
            right: "0",
            backgroundColor: "#4BB543",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
        >
          Adicionado ao carrinho!
        </div>
      )}
      {showLoginMsg && (
        <div
          style={{
            position: "absolute",
            top: "-25px",
            right: "0",
            backgroundColor: "#d9534f",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "0.9rem",
            fontWeight: "600",
          }}
        >
          É necessário estar logado!
        </div>
      )}
    </div>
  );
}
