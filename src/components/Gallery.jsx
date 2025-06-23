import React from 'react';

const doces = [
  { id: 1, nome: 'Brigadeiro', preco: 'R$ 3,00', imagem: 'url-da-imagem' },
  { id: 2, nome: 'Bolo de Chocolate', preco: 'R$ 15,00', imagem: 'url-da-imagem' },
  { id: 3, nome: 'Brownie', preco: 'R$ 5,00', imagem: 'url-da-imagem' },
];

export default function Gallery() {
  return (
    <section>
      <h2>Galeria de Doces</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {doces.map((doce) => (
          <div key={doce.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={doce.imagem} alt={doce.nome} width="150" />
            <h3>{doce.nome}</h3>
            <p>{doce.preco}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
