import React from "react";

const Gallery = ({ doces }) => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {doces.map((doce) => (
        <div
          key={doce.id}
          style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}
        >
          <img src={doce.foto} alt={doce.nome} style={{ width: "100%" }} />
          <h3>{doce.nome}</h3>
          <p>{doce.descricao}</p>
          <p>Preço: R$ {doce.preco.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
